define({ "api": [
  {
    "group": "Comment",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/files/create",
    "title": "Create Comment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id for which comment is added (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Comment message. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userFullName",
            "description": "<p>Full Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Comment Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"commentId\": \"sXr8RNJo0\",\n        \"issueId\": \"rWm7i0ApM\",\n        \"userName\": \"lisa\",\n        \"userFullName\": \"lisa anchalia (lisa)\",\n        \"message\": \"hello !\",\n        \"_id\": \"5ea3285e5291094744d9a0a2\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/comments.js",
    "groupTitle": "Comment",
    "name": "GetApiV1FilesCreate"
  },
  {
    "group": "Comment",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/files/view/:issueId",
    "title": "Get Comments for an Issue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Comment Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n        \"_id\": \"5ea02f3b2b395d093cc9b380\",\n        \"commentId\": \"Z80cnYvi1\",\n        \"issueId\": \"rWm7i0ApM\",\n        \"userName\": \"gauri\",\n        \"userFullName\": \"Gaurav Dugar (gauri)\",\n        \"message\": \"hi\",\n        \"__v\": 0\n        },\n        {\n        \"_id\": \"5ea1cd403fd74d474c5b4782\",\n        \"commentId\": \"E1FKiyoZA\",\n        \"issueId\": \"rWm7i0ApM\",\n        \"userName\": \"prags\",\n        \"userFullName\": \"Pragati Dugar (prags)\",\n        \"message\": \"hey\",\n        \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/comments.js",
    "groupTitle": "Comment",
    "name": "GetApiV1FilesViewIssueid"
  },
  {
    "group": "File",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/files/create",
    "title": "Create File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id for which file is added (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": "<p>File Link. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userFullName",
            "description": "<p>Full Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "binary",
            "optional": false,
            "field": "file",
            "description": "<p>File to be attached (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All File Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"fileId\": \"oRtlB7vNT\",\n        \"issueId\": \"SkA3DZJlz\",\n        \"userName\": \"lisa\",\n        \"userFullName\": \"lisa anchalia (lisa)\",\n        \"url\": \"http://52.66.252.216:3000/uploads\\\\ideas.txt\",\n        \"file\": \"uploads\\\\ideas.txt\",\n        \"_id\": \"5ea326645291094744d9a0a1\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/file.js",
    "groupTitle": "File",
    "name": "GetApiV1FilesCreate"
  },
  {
    "group": "File",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/files/view/:fileId/delete",
    "title": "Delete File",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fileId",
            "description": "<p>File Id of file to be deleted (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"File is Deleted Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/file.js",
    "groupTitle": "File",
    "name": "GetApiV1FilesViewFileidDelete"
  },
  {
    "group": "File",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/files/view/:issueId",
    "title": "Get Files for an Issue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All File Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n        \"_id\": \"5ea02eed2b395d093cc9b37f\",\n        \"fileId\": \"TE3Ug7Z9R\",\n        \"issueId\": \"rWm7i0ApM\",\n        \"userName\": \"gauri\",\n        \"userFullName\": \"Gaurav Dugar (gauri)\",\n        \"url\": \"http://localhost:3000/uploads\\\\ideas.txt\",\n        \"file\": \"uploads\\\\ideas.txt\",\n        \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/file.js",
    "groupTitle": "File",
    "name": "GetApiV1FilesViewIssueid"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/all",
    "title": "Get all issues",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All Issue Details Found\",\n   \"status\": 200,\n   \"data\": [\n       {\n       \"issueId\": \"stjcwBEaq\",\n       \"created\": \"2020-04-22T11:25:03.000Z\",\n       \"watchers\": [\n           \"Gaurav Dugar (gauri)\"\n       ],\n       \"assignee\": \"Gaurav Dugar (gauri)\",\n       \"reporter\": \"Pragati Dugar (prags)\",\n       \"status\": \"In Progress\",\n       \"description\": \"<h1>sf<em><u> sdasdds d ds dd </u></em></h1>\",\n       \"title\": \"sfssada d  s d fd\"\n       },\n       {\n       \"issueId\": \"XKpilZuU7\",\n       \"created\": \"2020-04-22T11:36:59.000Z\",\n       \"watchers\": [],\n       \"assignee\": \"Pragati Dugar (prags)\",\n       \"reporter\": \"Pragati Dugar (prags)\",\n       \"status\": \"Done\",\n       \"description\": \"<h1><em><u>wdsed</u><span class=\\\"ql-cursor\\\">﻿</span></em></h1>\",\n       \"title\": \"wdw\"\n       }\n   ]\n   }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssuesAll"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/create",
    "title": "Create Issue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Issue Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"issueId\": \"Qj2dU-1MV\",\n        \"_id\": \"5ea325135291094744d9a0a0\",\n        \"created\": \"2020-04-24T17:42:43.000Z\",\n        \"watchers\": [],\n        \"assignee\": \"Pragati Dugar (prags)\",\n        \"reporter\": \"lisa anchalia (lisa)\",\n        \"status\": \"Open\",\n        \"description\": \"\",\n        \"title\": \"Socket Issue \"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssuesCreate"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/:issueId/edit",
    "title": "Edit Issue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Issue Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5ea029cd2b395d093cc9b377\",\n        \"issueId\": \"rWm7i0ApM\",\n        \"__v\": 0,\n        \"created\": \"2020-04-22T11:26:05.000Z\",\n        \"watchers\": [\n        \"Gaurav Dugar (gauri)\"\n        ],\n        \"assignee\": \"Gaurav Dugar (gauri)\",\n        \"reporter\": \"Pragati Dugar (prags)\",\n        \"status\": \"Not picked\",\n        \"description\": \"<p>Edited Description here</p>\",\n        \"title\": \"Edited Issue \"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssuesIssueidEdit"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/view/:issueId",
    "title": "Get Issue Detail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Issue Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5ea0298f2b395d093cc9b376\",\n        \"issueId\": \"stjcwBEaq\",\n        \"__v\": 0,\n        \"created\": \"2020-04-22T11:25:03.000Z\",\n        \"watchers\": [\n        \"Gaurav Dugar (gauri)\"\n        ],\n        \"assignee\": \"Gaurav Dugar (gauri)\",\n        \"reporter\": \"Pragati Dugar (prags)\",\n        \"status\": \"In Progress\",\n        \"description\": \"<h1>sf<em><u> some thing here </u></em></h1>\",\n        \"title\": \"sfssada d  s d fd\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssuesViewIssueid"
  },
  {
    "group": "Issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/view/:issueId/delete",
    "title": "Delete Issue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Issue is Deleted Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssuesViewIssueidDelete"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "User Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InpDSXVRbHEwWiIsImlhdCI6MTU4Nzc0NjU5NDUzMywiZXhwIjoxNTg3ODMyOTk0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoicHJhZ3MiLCJmdWxsTmFtZSI6IlByYWdhdGkgRHVnYXIgKHByYWdzKSIsImxhc3ROYW1lIjoiRHVnYXIiLCJmaXJzdE5hbWUiOiJQcmFnYXRpIiwidXNlcklkIjoiSkRxandTVy16In19.qE8iYfyelv15chdd-BLsefXX8DpfCijZdqYj3F51d2I\",\n        \"userId\": \"JDqjwSW-z\",\n        \"userDetails\": {\n        \"userName\": \"prags\",\n        \"fullName\": \"Pragati Dugar (prags)\",\n        \"lastName\": \"Dugar\",\n        \"firstName\": \"Pragati\",\n        \"userId\": \"JDqjwSW-z\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "myError",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"Wrong Password.Login Failed\",\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "User Sign Up.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdOn",
            "description": "<p>Date of the user creation. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5ea31ab35291094744d9a09c\",\n        \"createdOn\": \"2020-04-24T16:58:27.000Z\",\n        \"userName\": \"lisa\",\n        \"fullName\": \"lisa anchalia (lisa)\",\n        \"lastName\": \"anchalia\",\n        \"firstName\": \"lisa\",\n        \"userId\": \"6B9PLxgoK\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "object",
            "optional": false,
            "field": "myError",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"User Already Present With this userName\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "User",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/delete",
    "title": "User logout.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>auth-token of the user. (auth headers) (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkXVCJ9.eyJqd3RpZCI6Imk2ejAwUkJWcyIsImlhdCI6MTU4Nzc0ODA2MDA3MywiZXhwIjoxNTg3ODM0NDYwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJOYW1lIjoibGlzYSIsImZ1bGxOYW1lIjoibGlzYSBhbmNoYWxpYSAobGlzYSkiLCJsYXN0TmFtZSI6ImFuY2hhbGlhIiwiZmlyc3ROYW1lIjoibGlzYSIsInVzZXJJZCI6IjZCOVBMeGdvSyJ9fQ.iqXZDKNfG-kHZLVSPJLJpRWw7IBezEBtbKFrnYyOQPg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Auth is Deleted Successfully\",\n   \"status\": 200,\n   \"data\": {\n       \"n\": 1,\n       \"ok\": 1\n   }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersUseridDelete"
  }
] });
