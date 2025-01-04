const db = require('../models');
const { Voidance, VoidanceInvite, User,AffiliateLink } = db;
const crypto = require('crypto');

require('dotenv').config();

const generateAffiliateLink = async (voidanceID, redirectTo) => {
  try {
    const uniqueIdentifier = crypto.randomBytes(8).toString('hex'); // Generate a unique token
    const link = `${process.env.BASE_URL}/affiliate/${uniqueIdentifier}`;
    console.log(link)

    if(!voidanceID || !redirectTo) throw new StatusError("missing data", 400)

    const affiliateLink = await AffiliateLink.create({
      voidanceID,
      link,
      redirectTo,
    });

    return affiliateLink;
  } catch (error) {
    throw error;
  }
};

// @middleware: isLoggedIn
exports.getAllVoidanceInvites = async (req, res, next) => {
  try {
    const voidanceInvites = await VoidanceInvite.findAll({
      where: { userID: req.user.id },
      include: [
        {
          model: User,
          attributes: ['id', 'userName'],
        },
      ],
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
exports.getVoidanceInvite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const voidanceInvite = await VoidanceInvite.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'userName'],
        },
      ],
    });

    if (!voidanceInvite) {
      throw new StatusError('voidance', 404);
    }

    return res.status(200).send({
      message: 'Voidance invite retrieved successfully',
      voidanceInvite,
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.createVoidanceInvite = async (req, res, next) => {
  const t = await db.sequelize.transaction();

  try {
    const {
      subject,
      message,
      CPC,
      campaignName,
      companyId,
      advertisementId,
      isCompanyInvite, // boolean instead of string type
    } = req.body;

    // Validation based on invite source
    if (isCompanyInvite) {
      if (!companyId || !advertisementId) {
        throw new StatusError('id', 404);
      }
    }

    // Base required fields
    if (!subject || !message || !campaignName) {
      throw new StatusError('information missing', 400);
    }

    // Check for existing invite
    const existingInvite = await VoidanceInvite.findOne({
      where: {
        userID: req.user.id,
        ...(companyId && { companyId }),
        ...(advertisementId && { advertisementId }),
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
        companyId: companyId || null,
        advertisementId: advertisementId || null,
        status: isCompanyInvite ? 'pending_user' : 'pending_company',
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

    // Check if user has permission to update
    const isCompany = req.user.role === 'company';
    const isTargetUser = voidanceInvite.userID === req.user.id;

    if (
      (voidanceInvite.status === 'pending_user' && !isTargetUser) ||
      (voidanceInvite.status === 'pending_company' && !isCompany)
    ) {
      await t.rollback();
      throw new StatusError('User', 404);
    }

    await voidanceInvite.update({ status }, { transaction: t });

    // If accepted, create the actual voidance
    if (status === 'accepted') {
      await Voidance.create(
        {
          userID: voidanceInvite.userID,
          companyId: voidanceInvite.companyId,
          advertisementId: voidanceInvite.advertisementId,
          campaignName: voidanceInvite.campaignName,
          CPC: voidanceInvite.CPC,
          uploadStatus: 'pending',
          // Voidance inviteId for user & company? // Neccessary at all?
          createdFormInvite: true,
          subject: voidanceInvite.subject,
          message: voidanceInvite.message,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return res.status(200).send({
      message: 'Voidance invite status updated successfully',
      voidanceInvite,
    });
  } catch (err) {
    await t.rollback();
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.getAllGeneratedVoidances = async (req, res, next) => {
  try {
    const generatedVoidances = await Voidance.findAll({
      where: { userID: req.user.id },
    });

    return res.status(200).send({
      message: 'Generated voidances retrieved successfully',
      generatedVoidances,
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.getGeneratedVoidance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const generatedVoidance = await Voidance.findOne({
      where: {
        id,
        userID: req.user.id,
      },
    });

    if (!generatedVoidance) {
      throw new StatusError('voidance', 404);
    }

    return res.status(200).send({
      message: 'Generated voidance retrieved successfully',
      generatedVoidance,
    });
  } catch (err) {
    console.error(err)
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.createVoidance = async (req, res, next) => {
  try {
    const { redirectTo, ...voidanceData } = req.body;

    if(!req.body.companyID || !req.body.userID || !req.body.advertisementID){
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
    console.error(err)
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.deleteGeneratedVoidance = async (req, res, next) => {
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
      message: 'Generated voidance deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.updateGeneratedVoidanceUploadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { UploadStatus } = req.body;

    const [updated] = await Voidance.update(
      { UploadStatus },
      {
        where: {
          id,
          userID: req.user.id,
        },
      }
    );

    if (!updated) {
      throw new StatusError('voidance', 404);
    }

    return res.status(200).send({
      message: 'Generated voidance upload status updated successfully',
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.updateGeneratedVoidanceQualityScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { qualityScore } = req.body;

    const [updated] = await Voidance.update(
      { qualityScore },
      {
        where: {
          id,
          userID: req.user.id,
        },
      }
    );

    if (!updated) {
      throw new StatusError('voidance', 404);
    }

    return res.status(200).send({
      message: 'Generated voidance quality score updated successfully',
    });
  } catch (err) {
    return next(err);
  }
};
