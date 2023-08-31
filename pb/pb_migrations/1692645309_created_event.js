/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8c7ziwtxcvy11o1",
    "created": "2023-08-21 19:15:09.351Z",
    "updated": "2023-08-21 19:15:09.351Z",
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
  const collection = dao.findCollectionByNameOrId("8c7ziwtxcvy11o1");

  return dao.deleteCollection(collection);
})
