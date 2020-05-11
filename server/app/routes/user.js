const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth =require("./../middlewares/auth")

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.
    app.get(`${baseUrl}+/all`,userController.getAllUser);

    app.post(`${baseUrl}/login`, userController.loginFunction);

    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    // delete auth token by userId on logout
    app.post(`${baseUrl}/:userId/delete`,userController.logout);

    //to get all auth tokens
    app.get(`${baseUrl}/auth/all`,userController.getAllAuth);
    app.get(`${baseUrl}/password/all`,userController.getAllPasswordResetToken);

    app.post(`${baseUrl}/req-reset-password`, userController.resetPassword);
    app.post(`${baseUrl}/new-password`, userController.newPassword);
    app.post(`${baseUrl}/valid-password-token`, userController.validPasswordToken);

    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login User Login.
     *
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InpDSXVRbHEwWiIsImlhdCI6MTU4Nzc0NjU5NDUzMywiZXhwIjoxNTg3ODMyOTk0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoicHJhZ3MiLCJmdWxsTmFtZSI6IlByYWdhdGkgRHVnYXIgKHByYWdzKSIsImxhc3ROYW1lIjoiRHVnYXIiLCJmaXJzdE5hbWUiOiJQcmFnYXRpIiwidXNlcklkIjoiSkRxandTVy16In19.qE8iYfyelv15chdd-BLsefXX8DpfCijZdqYj3F51d2I",
                "userId": "JDqjwSW-z",
                "userDetails": {
                "userName": "prags",
                "fullName": "Pragati Dugar (prags)",
                "lastName": "Dugar",
                "firstName": "Pragati",
                "userId": "JDqjwSW-z"
                }
            }
        }
     *
     * @apiError {object} myError shows error status, message, http status code, result.
     *    
     * @apiErrorExample {object} Error-Response:
        {
            "error": true,
            "message": "Wrong Password.Login Failed",
            "status": 400,
            "data": null
        }
    */


     /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup User Sign Up.
     *
     * @apiParam {string} createdOn Date of the user creation. (body params) (required)
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastName Last Name of the user. (body params) 
     * @apiParam {string} password Password of the user. (body params) (required)
     * @apiParam {string} userName User Name of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5ea31ab35291094744d9a09c",
                "createdOn": "2020-04-24T16:58:27.000Z",
                "userName": "lisa",
                "fullName": "lisa anchalia (lisa)",
                "lastName": "anchalia",
                "firstName": "lisa",
                "userId": "6B9PLxgoK"
            }
        }
     *
     * @apiError {object} myError shows error status, message, http status code, result.
     *    
     * @apiErrorExample {object} Error-Response:
        {
            "error": true,
            "message": "User Already Present With this userName",
            "status": 403,
            "data": null
        }
    */
         

    /**
     * @apiGroup User
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:userId/delete User logout.
     *
     * @apiHeader  {string} Authorization auth-token of the user. (auth headers) (required)
     * 
     * @apiHeaderExample  {json} Request-Example:
         {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg"
         }
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Auth is Deleted Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1
            }
         }
    */

}

module.exports = {
    setRouter: setRouter
}
