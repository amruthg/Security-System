const mongoose = require('mongoose');
// const User = require('./user');
// const door = require('./doors');


const doorAccessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Door', required: true },
  pin: { type: String, required: true },      // Store hashed PIN, never plaintext
  isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
},{
timestamps: true});

module.exports = mongoose.model('DoorAccess', doorAccessSchema);
