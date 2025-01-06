const db = require('../models');
const { Voidance, VoidanceInvite} = db;
const {generateAffiliateLink} = require('../util/linkGenerator')

require('dotenv').config();

// @middleware: isLoggedIn
exports.getAllVoidanceInvites = async (req, res, next) => {
  try {
    const voidanceInvites = await VoidanceInvite.findAll({
      where: { userID: req.user.id },
      attributes: {
        exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userID'], 
      },
    });

    return res.status(200).send({
      message: 'All voidance invites retrieved successfully',
      voidanceInvites,
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.postVoidanceInvite = async (req, res, next) => {
  const t = await db.sequelize.transaction();

  try {
    const {
      subject,
      message,
      CPC,
      campaignName,
      companyID,
      advertisementID,
    } = req.body;

    // Base required fields
    if (!subject || !message || !campaignName) {
      throw new StatusError('information missing', 400);
    }

    // Check for existing invite
    const existingInvite = await VoidanceInvite.findOne({
      where: {
        userID: req.user.id,
        ...(companyID && { companyID }),
        ...(advertisementID && { advertisementID }),
        campaignName,
      },
      transaction: t,
    });

    if (existingInvite) {
      await t.rollback();
      return res.status(409).send({
        message: 'Voidance invite already exists for this campaign',
      });
    }

    // Create new invite
    const invite = await VoidanceInvite.create(
      {
        userID: req.user.id,
        subject,
        message,
        CPC,
        campaignName,
        companyID: companyID || null,
        advertisementID: advertisementID || null,
        status: 'pending_user',
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).send({
      message: 'Voidance invite created successfully',
      voidanceInvite: invite,
    });
  } catch (err) {
    await t.rollback();
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.deleteVoidanceInvite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await VoidanceInvite.destroy({
      where: {
        id,
        userID: req.user.id,
      },
    });

    if (!deleted) {
      throw new StatusError('invite', 404);
    }

    return res.status(200).send({
      message: 'Voidance invite deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.voidanceUpdateStatus = async (req, res, next) => {
  const t = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['accepted', 'declined'];
    if (!validStatuses.includes(status)) {
      throw new StatusError('invalid status', 400);
    }

    const voidanceInvite = await VoidanceInvite.findOne({
      where: { id },
      transaction: t,
    });

    if (!voidanceInvite) {
      await t.rollback();
      throw new StatusError('invite', 404);
    }

    if (status === 'accepted') {
      await t.commit();

    return res.status(200).send({
      message: 'Voidance invite status updated successfully',
      voidanceInvite,
    });
    }
  } catch (err) {
    await t.rollback();
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.getAllVoidances = async (req, res, next) => {
  try {
    const voidances = await Voidance.findAll({
      where: { userID: req.user.id },
      attributes: {
        exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userID'], 
      },
    });

    return res.status(200).send({
      message: 'voidances retrieved successfully',
      voidances,
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.getVoidanceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const voidance = await Voidance.findOne({
      where: { id, userID: req.user.id, },
      attributes: {
        exclude: ['deletedAt', 'createdAt', 'updatedAt', 'userID'], 
      },
    });

    if (!voidance) {
      throw new StatusError('voidance', 404);
    }

    return res.status(200).send({
      message: 'Generated voidance retrieved successfully',
      voidance,
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.createVoidance = async (req, res, next) => {
  try {
    const { redirectTo, ...voidanceData } = req.body;

    if(!req.body.companyID || !req.body.userID || !req.body.advertisementID || !redirectTo){
      throw new StatusError("missing data", 400)
    }

    const voidance = await Voidance.create({
      ...voidanceData,
      userID: req.user.id,
    });

    const affiliateLink = await generateAffiliateLink(voidance.id, redirectTo);

    return res.status(201).send({
      message: 'Generated voidance created successfully',
      voidance: voidance,
      affiliateLink
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.deleteVoidance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Voidance.destroy({
      where: {
        id,
        userID: req.user.id,
      },
    });

    if (!deleted) {
      throw new StatusError('voidance', 404);
    }

    return res.status(200).send({
      message: 'voidance deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};



