/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8afagkn6l0frsop",
    "created": "2023-09-01 00:11:17.811Z",
    "updated": "2023-09-01 00:11:17.811Z",
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
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8afagkn6l0frsop");

  return dao.deleteCollection(collection);
})
