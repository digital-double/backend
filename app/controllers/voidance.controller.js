const { where } = require('sequelize');
const db = require('../models');
const { Voidance, VoidanceInvite } = db;
// Voidance Invite Controllers

// @middleware: isLoggedIn
exports.getAllVoidanceInvites = async (req, res, next) => {
  try {
    const voidanceInvites = await VoidanceInvite.findAll({
      where: { userId: req.user.id },
      include: [{
        model: User,
        attributes: ['userId']
      }]
    });

    return res.status(200).send({
      message: 'All voidance invites retrieved successfully',
      voidanceInvites
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
      include: [{
        model: User,
        attributes: ['userId']
      }]
    });

    if (!voidanceInvite) {
      return res.status(404).send({ message: 'Voidance invite not found' });
    }

    return res.status(200).send({
      message: 'Voidance invite retrieved successfully',
      voidanceInvite
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
      isCompanyInvite // boolean instead of string type
    } = req.body;
    
    // Validation based on invite source
    if (isCompanyInvite) {
      if (!companyId || !advertisementId) {
        return res.status(400).send({
          message: 'Company voidances require companyId and advertisementId'
        });
      }
    }

    // Base required fields
    if (!subject || !message || !campaignName) {
      return res.status(400).send({
        message: 'Subject, message, and campaignName are required'
      });
    }

    // Check for existing invite
    const existingInvite = await VoidanceInvite.findOne({
      where: {
        userId: req.user.id,
        ...(companyId && { companyId }),
        ...(advertisementId && { advertisementId }),
        campaignName
      },
      transaction: t
    });

    if (existingInvite) {
      await t.rollback();
      return res.status(409).send({ 
        message: 'Voidance invite already exists for this campaign' 
      });
    }

    // Create new invite
    const invite = await VoidanceInvite.create({
      userId: req.user.id,
      subject,
      message,
      CPC,
      campaignName,
      companyId: companyId || null,
      advertisementId: advertisementId || null,
      status: isCompanyInvite ? 'pending_user' : 'pending_company'
    }, { transaction: t });

    await t.commit();

    return res.status(201).send({
      message: 'Voidance invite created successfully',
      voidanceInvite: invite
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
        userId: req.user.id 
      }
    });

    if (!deleted) {
      return res.status(404).send({ message: 'Voidance invite not found' });
    }

    return res.status(200).send({ 
      message: 'Voidance invite deleted successfully' 
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
      return res.status(400).send({
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const voidanceInvite = await VoidanceInvite.findOne({
      where: { id },
      transaction: t
    });

    if (!voidanceInvite) {
      await t.rollback();
      return res.status(404).send({
        message: 'Voidance invite not found'
      });
    }

    // Check if user has permission to update
    const isCompany = req.user.role === 'company';
    const isTargetUser = voidanceInvite.userId === req.user.id;

    if (
      (voidanceInvite.status === 'pending_user' && !isTargetUser) ||
      (voidanceInvite.status === 'pending_company' && !isCompany)
    ) {
      await t.rollback();
      return res.status(403).send({
        message: 'Not authorized to update this invite status'
      });
    }

    await voidanceInvite.update({ status }, { transaction: t });

    // If accepted, create the actual voidance
    if (status === 'accepted') {
      await Voidance.create({
        userId: voidanceInvite.userId,
        companyId: voidanceInvite.companyId,
        advertisementId: voidanceInvite.advertisementId,
        campaignName: voidanceInvite.campaignName,
        CPC: voidanceInvite.CPC,
        uploadStatus: 'pending',
        // Voidance inviteId for user & company? // Neccessary at all?
        createdFormInvite: true,
        subject: voidanceInvite.subject,
        message: voidanceInvite.message
      }, { transaction: t });
    }

    await t.commit();

    return res.status(200).send({
      message: 'Voidance invite status updated successfully',
      voidanceInvite
    });
  } catch (err) {
    await t.rollback();
    return next(err);
  }
};

// Generated Voidance Controllers

// @middleware: isLoggedIn
exports.getAllGeneratedVoidances = async (req, res, next) => {
  try {
    const generatedVoidances = await Voidance.findAll({
      where: { userId: req.user.id }
    });

    return res.status(200).send({
      message: 'Generated voidances retrieved successfully',
      generatedVoidances
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
        userId: req.user.id
      }
    });

    if (!generatedVoidance) {
      return res.status(404).send({ message: 'Generated voidance not found' });
    }

    return res.status(200).send({
      message: 'Generated voidance retrieved successfully',
      generatedVoidance
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.createVoidance = async (req, res, next) => {
  try {
    const newGeneratedVoidance = await Voidance.create({
      ...req.body,
      userId: req.user.id
    });

    return res.status(201).send({
      message: 'Generated voidance created successfully',
      voidance: newGeneratedVoidance
    });
  } catch (err) {
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
        userId: req.user.id
      }
    });

    if (!deleted) {
      return res.status(404).send({ message: 'Generated voidance not found' });
    }

    return res.status(200).send({ 
      message: 'Generated voidance deleted successfully' 
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
          userId: req.user.id 
        } 
      }
    );

    if (!updated) {
      return res.status(404).send({ message: 'Generated voidance not found' });
    }

    return res.status(200).send({ 
      message: 'Generated voidance upload status updated successfully' 
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
          userId: req.user.id 
        } 
      }
    );

    if (!updated) {
      return res.status(404).send({ message: 'Generated voidance not found' });
    }

    return res.status(200).send({ 
      message: 'Generated voidance quality score updated successfully' 
    });
  } catch (err) {
    return next(err);
  }
};
