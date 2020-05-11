const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');

//Importing the model here 
const IssueModel = mongoose.model('Issue')

let getAllIssue = (req, res) => {
    IssueModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'issueController: getAllIssue()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Issues', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No Issue Found', 'issueController: getAllIssue()', 5)
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all issues

/**
 * function to get single issue.
 */
let viewByIssueId = (req, res) => {

    IssueModel.findOne({ 'issueId': req.params.issueId }, (err, result) => {

        if (err) {
            logger.error(err, 'issueController: viewByIssueId()', 5)
            let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Issue Found', 'issueController: viewByIssueId()', 5)
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}


/**
 * function to edit issue by admin.
 */
let editIssue = (req, res) => {

    // console.log('issueId',issueId);
    editIssue=req.body
    //console.log(req);
    //  console.log('title',req.body['title']);
     console.log('watchers->',req.body.watchers);

    console.log('édit Issue->',editIssue)
    IssueModel.findOneAndUpdate({ 'issueId': req.params.issueId }, {$set:editIssue}, { new: true }).exec((err, result) => {
        if (err) {
            logger.error(err, 'issueController: editIssue()', 5)
            let apiResponse = response.generate(true, 'Failed To Edit issue', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Issue Found', 'issueController: editIssue()', 5)
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}


let deleteIssue = (req, res) => {
    IssueModel.remove({ 'issueId': req.params.issueId }, (err, result) => {
        if (err) {
            logger.error(err, 'issueController: deleteIssue()', 5)
            let apiResponse = response.generate(true, 'Failed To Delete Issue', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Issue Found', 'issueController: deleteIssue()', 5)
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Issue is Deleted Successfully', 200, result)
            res.send(apiResponse)
        }
    })
}


let createIssue = (req, res) => {
    let issueId = shortid.generate()
    //console.log('issueId',issueId);
    let newIssue = new IssueModel({
        issueId: issueId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        reporter: req.body.reporter,
        assignee: req.body.assignee,
        watchers: req.body.watchers,
        created: time.now(),
    }) // end new issue model

    newIssue.save((err, result) => {
        if (err) {
            logger.error(err.message, 'issueController: createIssue', 10)
            let apiResponse = response.generate(true, 'Failed to create new Issue', 500, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
            res.send(apiResponse)   
        }        
    }) // end new issue save
}




module.exports = {
    getAllIssue: getAllIssue,
    createIssue: createIssue,
    viewByIssueId: viewByIssueId,
    editIssue: editIssue,
    deleteIssue: deleteIssue
}