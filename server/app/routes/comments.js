
const commentController = require("./../../app/controllers/commentController");
const appConfig = require("./../../config/appConfig")

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/comments`;

    // defining routes.
    app.get(baseUrl+'/all',commentController.getAllComment);

    app.get(baseUrl+'/view/:issueId',commentController.viewByIssueId);

    app.post(baseUrl+'/:commentId/delete',commentController.deleteComment);

    app.post(baseUrl+'/create',commentController.createComment);

    /**
     * @apiGroup Comment
     * @apiVersion  1.0.0
     * @api {get} /api/v1/files/view/:issueId Get Comments for an Issue
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
            "message": "All Comment Details Found",
            "status": 200,
            "data": [
                {
                "_id": "5ea02f3b2b395d093cc9b380",
                "commentId": "Z80cnYvi1",
                "issueId": "rWm7i0ApM",
                "userName": "gauri",
                "userFullName": "Gaurav Dugar (gauri)",
                "message": "hi",
                "__v": 0
                },
                {
                "_id": "5ea1cd403fd74d474c5b4782",
                "commentId": "E1FKiyoZA",
                "issueId": "rWm7i0ApM",
                "userName": "prags",
                "userFullName": "Pragati Dugar (prags)",
                "message": "hey",
                "__v": 0
                }
            ]
        }
    */


     /**
     * @apiGroup Comment
     * @apiVersion  1.0.0
     * @api {get} /api/v1/files/create Create Comment
     *
     * @apiHeader  {string} Authorization auth-token of the user. (auth headers) (required)
     * 
     * @apiHeaderExample  {json} Request-Example:
         {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg"
         }
     *
     * @apiParam {string} issueId Issue Id for which comment is added (body params) (required)
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} message Comment message. (body params) 
     * @apiParam {string} userFullName Full Name of the user. (body params) (required)
     * @apiParam {string} userName User Name of the user. (body params) (required)
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All Comment Details Found",
            "status": 200,
            "data": {
                "__v": 0,
                "commentId": "sXr8RNJo0",
                "issueId": "rWm7i0ApM",
                "userName": "lisa",
                "userFullName": "lisa anchalia (lisa)",
                "message": "hello !",
                "_id": "5ea3285e5291094744d9a0a2"
            }
        }
    */
    

}// end setRouter function 

module.exports = {
    setRouter: setRouter
}