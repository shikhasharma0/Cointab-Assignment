const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId
const loginSchema = mongoose.Schema({
    userId: { 
    type: objectId,
    ref: "User"
},
    email: {
        type: String, required: true,
        unique: true,
        lowercase: { require: true }
    },
    password: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "24h"
    }
});
limitSchema.index({ createdAt: 1 }, { expireAfterSeconds: "24h" })

module.exports = mongoose.model('Login', loginSchema);