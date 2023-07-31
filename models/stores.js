const mongoose = require('mongoose')

const storesschema = new mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String, required : true},
    address : {type : String, required : true},
    phone : {type : String}
},{ timestamps: true })

const Stores = mongoose.model('stores', storesschema)
module.exports = Stores