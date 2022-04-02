const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = model('Contact', contactSchema);