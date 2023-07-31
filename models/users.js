const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstname :{type : String, required : true},
    lastname : {type: String, required : true},
    phone : {type: String, required : true},
    // collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
