const db = require('../models');
const { Voidance, VoidanceInvite } = db;
// Voidance Invite Controllers

// @middleware: isLoggedIn
exports.getAllVoidanceInvites = (req, res, next) => {
  VoidanceInvite.findAll()
    .then((voidanceInvites) => {
      res.status(200).send({
        message: 'Voidance invites retrieved successfully',
        voidanceInvites
      });
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.getVoidanceInvite = (req, res, next) => {
  VoidanceInvite.findByPk(req.params.id)
    .then((voidanceInvite) => {
      if (voidanceInvite) {
        res.status(200).send({
          message: 'Voidance invite retrieved successfully',
          voidanceInvite
        });
      } else {
        res.status(404).send({ message: 'Voidance invite not found' });
      }
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.createVoidanceInvite = (req, res, next) => {
  VoidanceInvite.create(req.body)
    .then((newVoidanceInvite) => {
      res.status(201).send({
        message: 'Voidance invite created successfully',
        voidanceInvite: newVoidanceInvite
      });
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.updateVoidanceInvite = (req, res, next) => {
  VoidanceInvite.update(req.body, {
    where: { id: req.params.id }
  })
    .then(([updated]) => {
      if (updated === 1) {
        res.status(200).send({ message: 'Voidance invite updated successfully' });
      } else {
        res.status(404).send({ message: 'Voidance invite not found' });
      }
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.deleteVoidanceInvite = (req, res, next) => {
  VoidanceInvite.destroy({
    where: { id: req.params.id }
  })
    .then((deleted) => {
      if (deleted) {
        res.status(200).send({ message: 'Voidance invite deleted successfully' });
      } else {
        res.status(404).send({ message: 'Voidance invite not found' });
      }
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.updateVoidanceInviteAcceptance = (req, res, next) => {
  VoidanceInvite.update(
    { acceptance: req.body.acceptance },
    { where: { id: req.params.id } }
  )
    .then(([updated]) => {
      if (updated === 1) {
        res.status(200).send({ message: 'Voidance invite acceptance status updated successfully' });
      } else {
        res.status(404).send({ message: 'Voidance invite not found' });
      }
    })
    .catch((err) => next(err));
};

// Generated Voidance Controllers

// @middleware: isLoggedIn
exports.getAllGeneratedVoidances = (req, res, next) => {
  Voidance.findAll()
    .then((generatedVoidances) => {
      res.status(200).send({
        message: 'Generated voidances retrieved successfully',
        generatedVoidances
      });
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn  
exports.getGeneratedVoidance = (req, res, next) => {
  Voidance.findByPk(req.params.id)
    .then((generatedVoidance) => {
    if (generatedVoidance) {
        res.status(200).send({
          message: 'Generated voidance retrieved successfully',
          generatedVoidance
        });
      } else {
        res.status(404).send({ message: 'Generated voidance not found' });
      }
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.createGeneratedVoidance = (req, res, next) => {
  Voidance.create(req.body)
    .then((newGeneratedVoidance) => {
      res.status(201).send({
        message: 'Generated voidance created successfully',
        voidance: newGeneratedVoidance
      });
    })
    .catch((err) => next(err)); 
};

// @middleware: isLoggedIn
exports.updateGeneratedVoidance = (req, res, next) => {
  Voidance.update(req.body, {
    where: { id: req.params.id }
  })
    .then(([updated]) => {
      if (updated === 1) {
        res.status(200).send({ message: 'Generated voidance updated successfully' });
      } else {
        res.status(404).send({ message: 'Generated voidance not found' });
      }
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.deleteGeneratedVoidance = (req, res, next) => {
  Voidance.destroy({
    where: { id: req.params.id }
  })
    .then((deleted) => {
      if (deleted) {
        res.status(200).send({ message: 'Generated voidance deleted successfully' });
      } else {
        res.status(404).send({ message: 'Generated voidance not found' });
      }
    })
    .catch((err) => next(err));
};

// @middleware: isLoggedIn
exports.updateGeneratedVoidanceUploadStatus = (req, res, next) => {
  Voidance.update(
    { UploadStatus: req.body.UploadStatus },
    { where: { id: req.params.id } }
  )
    .then(([updated]) => {
      if (updated === 1) {
        res.status(200).send({ message: 'Generated voidance upload status updated successfully' });
      } else {
        res.status(404).send({ message: 'Generated voidance not found' });
      }
    })
    .catch((err) => next(err));
};


// @middleware: isLoggedIn
exports.updateGeneratedVoidanceQualityScore = (req, res, next) => {
  Voidance.update(
    { qualityScore: req.body.qualityScore },
    { where: { id: req.params.id } }
  )
    .then(([updated]) => {
      if (updated === 1) {
        res.status(200).send({ message: 'Generated voidance quality score updated successfully' });
      } else {
        res.status(404).send({ message: 'Generated voidance not found' });
      }
    })
    .catch((err) => next(err));
};