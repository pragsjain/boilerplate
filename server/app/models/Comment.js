// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let CommentSchema =new Schema({
    commentId: String,
    issueId: String,
    userName: String,
    userFullName: String,
    message: String,
})

mongoose.model('Comment', CommentSchema);