const db = require('../models');
const Voidance = db.Voidances;
const VoidanceInvite = db.VoidanceInvite;

// Voidance Invite Controllers

exports.getAllVoidanceInvites = async (req, res) => {
  try {
    const voidanceInvites = await VoidanceInvite.findAll();
    res.status(200).json(voidanceInvites);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving voidance invites', error: error.message });
  }
};

exports.getVoidanceInvite = async (req, res) => {
  try {
    const voidanceInvite = await VoidanceInvite.findByPk(req.params.id);
    if (voidanceInvite) {
      res.status(200).json(voidanceInvite);
    } else {
      res.status(404).json({ message: 'Voidance invite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving voidance invite', error: error.message });
  }
};

exports.createVoidanceInvite = async (req, res) => {
  try {
    const newVoidanceInvite = await VoidanceInvite.create(req.body);
    res.status(201).json(newVoidanceInvite);
  } catch (error) {
    res.status(500).json({ message: 'Error creating voidance invite', error: error.message });
  }
};

exports.updateVoidanceInvite = async (req, res) => {
  try {
    const updated = await VoidanceInvite.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.status(200).json({ message: 'Voidance invite updated successfully' });
    } else {
      res.status(404).json({ message: 'Voidance invite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating voidance invite', error: error.message });
  }
};

exports.deleteVoidanceInvite = async (req, res) => {
  try {
    const deleted = await VoidanceInvite.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Voidance invite deleted successfully' });
    } else {
      res.status(404).json({ message: 'Voidance invite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting voidance invite', error: error.message });
  }
};

exports.updateVoidanceInviteAcceptance = async (req, res) => {
  try {
    const updated = await VoidanceInvite.update(
      { acceptance: req.body.acceptance },
      { where: { id: req.params.id } }
    );
    if (updated[0] === 1) {
      res.status(200).json({ message: 'Voidance invite acceptance status updated successfully' });
    } else {
      res.status(404).json({ message: 'Voidance invite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating voidance invite acceptance status', error: error.message });
  }
};

// Generated Voidance Controllers

exports.getAllGeneratedVoidances = async (req, res) => {
  try {
    const generatedVoidances = await Voidance.findAll();
    res.status(200).json(generatedVoidances);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving generated voidances', error: error.message });
  }
};

exports.getGeneratedVoidance = async (req, res) => {
  try {
    const generatedVoidance = await Voidance.findByPk(req.params.id);
    if (generatedVoidance) {
      res.status(200).json(generatedVoidance);
    } else {
      res.status(404).json({ message: 'Generated voidance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving generated voidance', error: error.message });
  }
};

exports.createGeneratedVoidance = async (req, res) => {
  try {
    const newGeneratedVoidance = await Voidance.create(req.body);
    res.status(201).json(newGeneratedVoidance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating generated voidance', error: error.message });
  }
};

exports.updateGeneratedVoidance = async (req, res) => {
  try {
    const updated = await Voidance.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.status(200).json({ message: 'Generated voidance updated successfully' });
    } else {
      res.status(404).json({ message: 'Generated voidance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating generated voidance', error: error.message });
  }
};

exports.deleteGeneratedVoidance = async (req, res) => {
  try {
    const deleted = await Voidance.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Generated voidance deleted successfully' });
    } else {
      res.status(404).json({ message: 'Generated voidance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting generated voidance', error: error.message });
  }
};

exports.updateGeneratedVoidanceUploadStatus = async (req, res) => {
  try {
    const updated = await Voidance.update(
      { UploadStatus: req.body.UploadStatus },
      { where: { id: req.params.id } }
    );
    if (updated[0] === 1) {
      res.status(200).json({ message: 'Generated voidance upload status updated successfully' });
    } else {
      res.status(404).json({ message: 'Generated voidance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating generated voidance upload status', error: error.message });
  }
};

exports.updateGeneratedVoidanceQualityScore = async (req, res) => {
  try {
    const updated = await Voidance.update(
      { qualityScore: req.body.qualityScore },
      { where: { id: req.params.id } }
    );
    if (updated[0] === 1) {
      res.status(200).json({ message: 'Generated voidance quality score updated successfully' });
    } else {
      res.status(404).json({ message: 'Generated voidance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating generated voidance quality score', error: error.message });
  }
};

