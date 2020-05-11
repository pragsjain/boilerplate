'use strict'
  
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ResettokenSchema = new Schema({
//userId: { type: mongoose.Schema.Types.ObjectId, required: true },
userId: { type: String, required: true },
resettoken: { type: String, required: true },
createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

mongoose.model('PasswordResetToken', ResettokenSchema);
