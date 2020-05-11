
const fileController = require("./../../app/controllers/fileController");
const appConfig = require("./../../config/appConfig")
const auth =require("./../middlewares/auth")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //in end call callback ,pass error and path you want to strore file
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

//now pass above to multer
const upload = multer({ storage:storage,limits: {
    fileSize: 1024 * 1024 * 10
} });

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/files`;

    // defining routes.
    app.get(baseUrl+'/all',auth.isAuthenticated,fileController.getAllFile);

    app.get(baseUrl+'/view/:issueId',auth.isAuthenticated,fileController.viewByIssueId);

    app.post(baseUrl+'/:fileId/delete',auth.isAuthenticated,fileController.deleteFile);

    app.post(baseUrl+'/create',auth.isAuthenticated,upload.single('file'),fileController.createFile);
    
    
    /**
     * @apiGroup File
     * @apiVersion  1.0.0
     * @api {get} /api/v1/files/view/:issueId Get Files for an Issue
     *
     * @apiHeader  {string} Authorization auth-token of the user. (auth headers) (required)
     * 
     * @apiHeaderExample  {json} Request-Example:
         {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg"
         }
     *
     * @apiParam {string} issueId Issue Id. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All File Details Found",
            "status": 200,
            "data": [
                {
                "_id": "5ea02eed2b395d093cc9b37f",
                "fileId": "TE3Ug7Z9R",
                "issueId": "rWm7i0ApM",
                "userName": "gauri",
                "userFullName": "Gaurav Dugar (gauri)",
                "url": "http://localhost:3000/uploads\\ideas.txt",
                "file": "uploads\\ideas.txt",
                "__v": 0
                }
            ]
        }
    */

     /**
     * @apiGroup File
     * @apiVersion  1.0.0
     * @api {get} /api/v1/files/view/:fileId/delete Delete File 
     *
     * @apiHeader  {string} Authorization auth-token of the user. (auth headers) (required)
     * 
     * @apiHeaderExample  {json} Request-Example:
         {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg"
         }
     *
     * @apiParam {string} fileId File Id of file to be deleted (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "File is Deleted Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "ok": 1
            }
        }
    */

     /**
     * @apiGroup File
     * @apiVersion  1.0.0
     * @api {get} /api/v1/files/create Create File
     *
     * @apiHeader  {string} Authorization auth-token of the user. (auth headers) (required)
     * 
     * @apiHeaderExample  {json} Request-Example:
         {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg"
         }
     *
     * @apiParam {string} issueId Issue Id for which file is added (body params) (required)
     * @apiParam {string} url File Link. (body params) (required)
     * @apiParam {string} userFullName Full Name of the user. (body params) (required)
     * @apiParam {string} userName User Name of the user. (body params) (required)
     *  @apiParam {binary} file File to be attached (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All File Details Found",
            "status": 200,
            "data": {
                "__v": 0,
                "fileId": "oRtlB7vNT",
                "issueId": "SkA3DZJlz",
                "userName": "lisa",
                "userFullName": "lisa anchalia (lisa)",
                "url": "http://52.66.252.216:3001/uploads\\ideas.txt",
                "file": "uploads\\ideas.txt",
                "_id": "5ea326645291094744d9a0a1"
            }
        }
    */
    


}// end setRouter function 

module.exports = {
    setRouter: setRouter
}