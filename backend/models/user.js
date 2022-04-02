const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  login: { type: String, unique: true, require: true },
  password: { type: String, required: true }
});

module.exports = model('User', userSchema);