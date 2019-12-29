const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['admin','user'], required: true },
    status: { type: Boolean, default: true, required: true }
});

module.exports = mongoose.model('User', userSchema, 'user');
