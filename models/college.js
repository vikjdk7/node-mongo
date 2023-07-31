const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    establishdate : {type:Date, default: Date.now},
    founder : {type : String, required : true},
    courses: [String] // Array of courses offered by the college
}, { timestamps: true });

const Colleges = mongoose.model('Colleges', collegeSchema);

module.exports = Colleges;


