/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-08-18 20:46:21.483Z",
      "updated": "2023-08-18 20:46:21.483Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "protected": false
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "3ocs0vqi777lti5",
      "created": "2023-08-20 02:41:16.588Z",
      "updated": "2023-08-24 00:08:22.132Z",
      "name": "media",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "xgqbv0w3",
          "name": "tmdb_id",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "ypuunawz",
          "name": "metadata",
          "type": "json",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "ust490jv",
          "name": "type",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "movie"
            ]
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_VA5xV0V` ON `media` (\n  `tmdb_id`,\n  `type`\n)"
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "n8antxznh6lbum4",
      "created": "2023-08-20 14:07:14.925Z",
      "updated": "2023-08-24 00:24:05.269Z",
      "name": "user_media",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "af8ysdoa",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "zqjeuwt3",
          "name": "media",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "3ocs0vqi777lti5",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "hbq7x4he",
          "name": "watches",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "ybdvjveb",
          "name": "intent",
          "type": "select",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "want",
              "dont"
            ]
          }
        },
        {
          "system": false,
          "id": "bwt39r2r",
          "name": "rating",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": 0,
            "max": 5,
            "noDecimal": false
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_GLZvSpq` ON `user_media` (\n  `user`,\n  `media`\n)"
      ],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": "@request.auth.id != \"\" && user.id ?= @request.auth.id",
      "updateRule": "@request.auth.id != \"\" && user.id ?= @request.auth.id",
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "8c7ziwtxcvy11o1",
      "created": "2023-08-21 19:15:09.351Z",
      "updated": "2023-08-28 22:00:49.052Z",
      "name": "event",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "4shrkyzz",
          "name": "datetime",
          "type": "date",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "vidyvpvy",
          "name": "watching",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "3ocs0vqi777lti5",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "h53vmiby",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "jplzsfbs",
          "name": "attended",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        }
      ],
      "indexes": [],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "8afagkn6l0frsop",
      "created": "2023-09-01 00:11:17.811Z",
      "updated": "2023-09-16 00:10:40.721Z",
      "name": "suggestion",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "gjy5esdw",
          "name": "media",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "3ocs0vqi777lti5",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "ed8i3nxc",
          "name": "user",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "rbvi5mo2",
          "name": "active",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [],
      "listRule": "@request.auth.id != \"\"",
      "viewRule": "@request.auth.id != \"\"",
      "createRule": "@request.auth.id != \"\" && @request.data.active = true",
      "updateRule": "@request.auth.id != \"\" && active = true",
      "deleteRule": "",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
