const mongoose = require('mongoose');

const doorSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Door label
  location: { type: String }                    // Location (optional)
});

module.exports = mongoose.model('Door', doorSchema);
