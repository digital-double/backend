const db = require('../models');
const { Voidance, VoidanceInvite } = db;
// Voidance Invite Controllers

// @middleware: isLoggedIn
exports.getAllVoidanceInvites = async (req, res, next) => {
  try {
    const voidanceInvites = await VoidanceInvite.findAll(
      // { where: { userID: req.user.id }}
    );

    return res.status(200).send({
      message: 'Voidance invites retrieved successfully',
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
      where: { 
        id,
        userID: req.user.id 
      }
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
  try {
    const newVoidanceInvite = await VoidanceInvite.create({
      ...req.body,
      userID: req.user.id
    });

    return res.status(201).send({
      message: 'Voidance invite created successfully',
      voidanceInvite: newVoidanceInvite
    });
  } catch (err) {
    return next(err);
  }
};

// @middleware: isLoggedIn
exports.deleteVoidanceInvite = (req, res, next) => {
  const { id } = req.params;

  VoidanceInvite.destroy({
    where: { 
      id,
      userID: req.user.id 
    }
  })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).send({ message: 'Voidance invite not found' });
      }
      return res.status(200).send({ 
        message: 'Voidance invite deleted successfully' 
      });
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.voidanceUpdateStatus = (req, res, next) => {
  const { id } = req.params;
  const { acceptance } = req.body;

  VoidanceInvite.update(
    { acceptance },
    { 
      where: { 
        id,
        userID: req.user.id 
      } 
    }
  )
    .then(([updated]) => {
      if (!updated) {
        return res.status(404).send({ message: 'Voidance invite not found' });
      }
      return res.status(200).send({ 
        message: 'Voidance invite acceptance status updated successfully' 
      });
    })
    .catch((err) => next(err));
};

// Generated Voidance Controllers

// @middleware: isLoggedIn
exports.getAllGeneratedVoidances = async (req, res, next) => {
  try {
    const generatedVoidances = await Voidance.findAll({
      where: { userID: req.user.id }
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
        userID: req.user.id
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
      userID: req.user.id
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
        userID: req.user.id
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
          userID: req.user.id 
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
          userID: req.user.id 
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
