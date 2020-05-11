const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const passwordLib = require('./../libs/generatePasswordLib');
const token = require('../libs/tokenLib');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const PasswordResetTokenModel = mongoose.model('PasswordResetToken')

let getAllUser = (req, res) => {
    UserModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'userController: getAllUser()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Users', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No User Found', 'userController: getAllUser()', 5)
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all Users

let getAllAuth = (req, res) => {
    AuthModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'userController: getAllAuth()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Auth', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No Auth Found', 'userController: getAllAuth()', 5)
                let apiResponse = response.generate(true, 'No Auth Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Auth Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

let getAllPasswordResetToken = (req, res) => {
    PasswordResetTokenModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'userController: getAllPasswordResetToken()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Auth', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No Auth Found', 'userController: getAllPasswordResetToken()', 5)
                let apiResponse = response.generate(true, 'No Auth Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All PasswordResetToken Found', 200, result)
                res.send(apiResponse)
            }
        })
}

// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email && req.body.userName) {
                if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'Email / User Name is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ $or: [{ 'email': req.body.email }, { 'userName': req.body.userName }] })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let fullName = req.body.firstName + ' ' + req.body.lastName + ' (' + req.body.email.toLowerCase() + ')'
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            fullName: fullName,
                            email: req.body.email.toLowerCase(),
                            userName: req.body.userName.toLowerCase(),
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email / User Name', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function

    let createUserSocialSignup = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'email': req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let fullName = req.body.firstName + ' ' + req.body.lastName + ' (' + req.body.email.toLowerCase() + ')'
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            fullName: fullName,
                            email: req.body.email.toLowerCase(),
                            userName: req.body.email.toLowerCase(),
                            password: passwordLib.hashpassword('randomPassword'),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to login through social app', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    }
                    else {
                        let retrievedUserDetailsObj = retrievedUserDetails.toObject();
                        resolve(retrievedUserDetailsObj)
                    }
                })
        })
    }// end create user function

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails.userId, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveAuthToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            let newAuth = new AuthModel({
                userId: userDetails.userId,
                authToken: userDetails.token,
                tokenSecret: 'IssueTrackingAppSecret',
                tokenGenerationTime: time.now()
            })
            newAuth.save((err, newAuth) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: saveAuthToken', 10)
                    let apiResponse = response.generate(true, 'Failed to create new Auth', 500, null)
                    reject(apiResponse)
                } else {
                    //console.log(newAuth)
                    resolve(userDetails)
                }
            })
        })
    }

    console.log('sso->',req.body.socialSignup);

    if (!req.body.socialSignup) {
        validateUserInput(req, res)
            .then(createUser)
            .then((resolve) => {
                delete resolve.password
                let apiResponse = response.generate(false, 'User created', 200, resolve)
                res.send(apiResponse)
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            })
    }
    else {
        createUserSocialSignup(req, res)
        .then(generateToken)
        .then(saveAuthToken)
            .then((resolve) => {
                delete resolve.userDetails
                let apiResponse = response.generate(false, 'Login Successful with social app', 200, resolve)
                res.send(apiResponse)
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            })

    }


}// end user signup function 


// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.emailOruserName) {
                //console.log("req body email is there");
                //console.log(req.body);
                UserModel.findOne({ $or: [{ 'email': req.body.emailOruserName }, { 'userName': req.body.emailOruserName }] }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User with this Email / User Name.Please Try Again !', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'Wrong Credentials.Please Try Again !', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"Email / User Name" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails.userId, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveAuthToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            let newAuth = new AuthModel({
                userId: userDetails.userId,
                authToken: userDetails.token,
                tokenSecret: 'IssueTrackingAppSecret',
                tokenGenerationTime: time.now()
            })
            newAuth.save((err, newAuth) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: saveAuthToken', 10)
                    let apiResponse = response.generate(true, 'Failed to create new Auth', 500, null)
                    reject(apiResponse)
                } else {
                    //console.log(newAuth)
                    resolve(userDetails)
                }
            })
        })
    }


    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveAuthToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}

let logout = (req, res) => {
    let AuthRemove = () => {
        return new Promise((resolve, reject) => {
            AuthModel.remove({ 'userId': req.params.userId }, (err, result) => {
                if (err) {
                    logger.error(err, 'userController: logout()', 5)
                    let apiResponse = response.generate(true, 'Failed To Delete Auth', 500, null)
                    reject(apiResponse)
                } else if (result == undefined || result == null || result == '') {
                    logger.error('No Auth Found', 'userController: logout()', 5)
                    let apiResponse = response.generate(true, 'No Auth Found', 404, null)
                    resolve(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Auth is Deleted Successfully', 200, result)
                    resolve(apiResponse)
                }
            })
        })
    }
    AuthRemove(req, res)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })

} // end of the logout function.

let resetPassword = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log(req.body);
                UserModel.findOne({ 'email': req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: resetPassword()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User with this Email / User Name.Please Try Again !', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: resetPassword()', 7)
                        let apiResponse = response.generate(true, 'No user found matching this Email ', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: resetPassword()', 10)
                        resolve(userDetails)
                    }
                });
            } else {
                let apiResponse = response.generate(true, '"Email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let sendEmail = (userDetails) => {
        var resettoken = new PasswordResetTokenModel({ userId: userDetails.userId, resettoken: crypto.randomBytes(16).toString('hex') });
        //console.log('resetToken->',resettoken);
        resettoken.save(function (err, newresetTokenObj) {
            if (err) {
                console.log('err', err);
                let apiResponse = response.generate(true, err.message, 500, null)
                reject(apiResponse)
            }
            PasswordResetTokenModel.find({ userId: userDetails.userId, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'atestmail2020@gmail.com',
                    pass: 'atestmail'
                },
                secure: true,
                requireTLS: false,
                tls: {
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                to: userDetails.email,
                from: 'atestmail2020@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            transporter.sendMail(mailOptions, (err, info) => {
                console.log('err', err);
                console.log('info', info);
            })
        })
    }

    //find user with given email,generate a token and create an entry with userid and token,
    //remove other entries of user with any other token and send email with  that token

    findUser(req, res)
        .then(sendEmail)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Reset Password successfully.', 200, null)
            res.send(apiResponse);
        })
        .catch((err) => {
            let apiResponse = response.generate(true, 'Reset password failed.', 404, null)
            res.send(apiResponse)
        })

}

let validPasswordToken = (req, res) => {
    let tokenVerification = () => {
        return new Promise((resolve, reject) => {
            if (!req.body.resettoken) {
                let apiResponse = response.generate(true, 'Token is required', 500, null)
                res.send(apiResponse);
            }
            PasswordResetTokenModel.findOne({ resettoken: req.body.resettoken }, (err, userDetails) => {
                if (err) {
                    //console.log(err)
                    logger.error('Failed To Retrieve User Data', 'userController: validPasswordToken()', 10)
                    let apiResponse = response.generate(true, 'Failed To Find User', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    logger.error('No User Found', 'userController: validPasswordToken()', 7)
                    let apiResponse = response.generate(true, 'Invalid URL', 404, null)
                    res.send(apiResponse)
                } else {
                    logger.info('User Found', 'userController: validPasswordToken()', 10)
                    UserModel.findOneAndUpdate({ userId: userDetails.userId })
                        .then(() => {
                            let apiResponse = response.generate(false, 'Token verified successfully.', 404, null)
                            res.send(apiResponse)
                        }).catch((err) => {
                            let apiResponse = response.generate(true, 'Token verification failed.', 404, null)
                            res.send(apiResponse)
                        });
                }
            });
        })
    }

    tokenVerification(req, res)

}

let newPassword = (req, res) => {
    let findToken = () => {
        return new Promise((resolve, reject) => {
            PasswordResetTokenModel.findOne({ resettoken: req.body.resettoken }, (err, userToken, next) => {
                if (err) {
                    console.log(err)
                    logger.error('Failed To Retrieve password Token Data', 'userController: newPassword()', 10)
                    let apiResponse = response.generate(true, 'Failed To Find User', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userToken)) {
                    logger.error('No User Found', 'userController: findUser()', 7)
                    let apiResponse = response.generate(true, 'Token has expired', 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('User Found', 'userController: findUser()', 10)
                    resolve(userToken)
                }
            });
        })
    }

    let resetPassword = (retrievedUserToken) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: retrievedUserToken.userId }, function (err, userDetails, next) {
                if (err) {
                    console.log(err)
                    logger.error('Failed To Retrieve User Data', 'userController: newPassword()', 10)
                    let apiResponse = response.generate(true, 'Failed To Find User', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    logger.error('No User Found', 'userController: newPassword()', 7)
                    let apiResponse = response.generate(true, 'User does not exist', 404, null)
                    reject(apiResponse)
                } else {
                    console.log('else',req.body.newPassword);
                        userDetails.password = passwordLib.hashpassword(req.body.newPassword),
                        userDetails.save(function (err,user) {
                            if (err) {
                                let apiResponse = response.generate(true, 'Password can not reset.', 404, null)
                                reject(apiResponse)
                            } else {
                                console.log('user',user);
                                resolve(true);
                            }
                        });
                }
            })
        })
    }

    let removeUser = () => {
        console.log('here');
        return new Promise((resolve, reject) => {
            PasswordResetTokenModel.remove({ resettoken: req.body.resettoken }, (err, result) => {
                if (err) {
                    logger.error(err, 'userController: newPassword()', 5)
                    let apiResponse = response.generate(true, 'Failed To user token', 500, null)
                    reject(apiResponse)
                } else if (result == undefined || result == null || result == '') {
                    logger.error('No Auth Found', 'userController: newPassword()', 5)
                    let apiResponse = response.generate(true, 'No Token Found to be removed', 404, null)
                    resolve(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Password reset successfully', 200, result)
                    resolve(apiResponse)
                }
            })
        })
    }

    findToken(req, res)
        .then(resetPassword)
        .then(removeUser)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            res.send(err)
        })
}


module.exports = {
    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    getAllUser: getAllUser,
    getAllAuth: getAllAuth,
    getAllPasswordResetToken:getAllPasswordResetToken,
    resetPassword: resetPassword,
    validPasswordToken: validPasswordToken,
    newPassword: newPassword
}// end exports