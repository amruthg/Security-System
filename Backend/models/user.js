const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  faceEmbedding: { type: [Number], required: true }, // Example: face recognition features
//   createdAt: { type: Date, default: Date.now }
},{
    timestamps:true
});

module.exports = mongoose.model('User', userSchema);
