const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({


    userName: {
        type: string,
        required: true, 
         trim: true
    },
    age: {
        type: Number
    },
    phoneno: {
       type: Number,
       required: true
    }
},
    { timestamps: true }


);

module.exports = mongoose.model("User", UserSchema)