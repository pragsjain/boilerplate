// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let FileSchema =new Schema({
    fileId: String,
    issueId: String,
    userName: String,
    userFullName: String,
    url: String,
    file: String,
})

mongoose.model('File', FileSchema);