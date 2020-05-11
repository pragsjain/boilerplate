const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const appConfig = require("./../../config/appConfig")

//Importing the model here 
const CommentModel = mongoose.model('Comment')

let getAllComment = (req, res) => {
    CommentModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'commentController: getAllComment()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Comments', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No Comment Found', 'commentController: getAllComment()', 5)
                let apiResponse = response.generate(true, 'No Comment Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Comment Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all issues

let viewByIssueId = (req, res) => {
console.log('íssueId',req.params.issueId);
    CommentModel.find({ 'issueId': req.params.issueId }, (err, result) => {

        if (err) {
            logger.error(err, 'commentController: viewByIssueId()', 5)
            let apiResponse = response.generate(true, 'Failed To Find Comment Details', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Issue Found', 'commentController: viewByIssueId()', 5)
            let apiResponse = response.generate(true, 'No Comment Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Comment Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}

let deleteComment = (req, res) => {
    CommentModel.remove({ 'CommentId': req.params.CommentId }, (err, result) => {
        if (err) {
            logger.error(err, 'commentController: deleteComment()', 5)
            let apiResponse = response.generate(true, 'Failed To Delete Comment', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Comment Found', 'commentController: deleteComment()', 5)
            let apiResponse = response.generate(true, 'No Comment Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Comment is Deleted Successfully', 200, result)
            res.send(apiResponse)
        }
    })
}


let createComment = (req, res) => {
    let commentId = shortid.generate()
    console.log('commentId',commentId);
    
    let newComment = new CommentModel({
        commentId: commentId,
        issueId: req.body.issueId,
        userName: req.body.userName,
        userFullName: req.body.userFullName,
        message: req.body.message,
    }) // end new Comment model
    //console.log('newComment',newComment);
    newComment.save((err, result) => {
        if (err) {
            logger.error(err.message, 'commentController: createComment', 10)
            let apiResponse = response.generate(true, 'Failed to create new Comment', 500, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'All Comment Details Found', 200, result)
            res.send(apiResponse)   
        }        
    }) // end new Comment save
}




module.exports = {
    getAllComment: getAllComment,
    viewByIssueId: viewByIssueId,
    createComment: createComment,
    deleteComment: deleteComment
}