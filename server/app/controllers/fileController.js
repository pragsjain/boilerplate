const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const appConfig = require("./../../config/appConfig")

//Importing the model here 
const FileModel = mongoose.model('File')

let getAllFile = (req, res) => {
    FileModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'fileController: getAllFile()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Files', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No File Found', 'fileController: getAllFile()', 5)
                let apiResponse = response.generate(true, 'No File Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All File Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all issues

let viewByIssueId = (req, res) => {
console.log('íssueId',req.params.issueId);
    FileModel.find({ 'issueId': req.params.issueId }, (err, result) => {

        if (err) {
            logger.error(err, 'fileController: viewByIssueId()', 5)
            let apiResponse = response.generate(true, 'Failed To Find File Details', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Issue Found', 'fileController: viewByIssueId()', 5)
            let apiResponse = response.generate(true, 'No File Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All File Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}

let deleteFile = (req, res) => {
    FileModel.remove({ 'fileId': req.params.fileId }, (err, result) => {
        if (err) {
            logger.error(err, 'fileController: deleteFile()', 5)
            let apiResponse = response.generate(true, 'Failed To Delete File', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No File Found', 'fileController: deleteFile()', 5)
            let apiResponse = response.generate(true, 'No File Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'File is Deleted Successfully', 200, result)
            res.send(apiResponse)
        }
    })
}


let createFile = (req, res) => {
    let fileId = shortid.generate()
    console.log('fileId',fileId);
    console.log(req.file);
    url=appConfig.url+req.file.path;
    let newFile = new FileModel({
        fileId: fileId,
        issueId: req.body.issueId,
        userName: req.body.userName,
        userFullName: req.body.userFullName,
        message: req.body.message,
        url: url,
        file: req.file.path
    }) // end new File model
    console.log('newFile',newFile);
    newFile.save((err, result) => {
        if (err) {
            logger.error(err.message, 'fileController: createFile', 10)
            let apiResponse = response.generate(true, 'Failed to create new File', 500, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'All File Details Found', 200, result)
            res.send(apiResponse)   
        }        
    }) // end new File save
}




module.exports = {
    getAllFile: getAllFile,
    viewByIssueId: viewByIssueId,
    createFile: createFile,
    deleteFile: deleteFile
}