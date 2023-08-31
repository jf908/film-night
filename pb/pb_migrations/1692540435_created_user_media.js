/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "n8antxznh6lbum4",
    "created": "2023-08-20 14:07:14.925Z",
    "updated": "2023-08-20 14:07:14.925Z",
    "name": "user_media",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hbq7x4he",
        "name": "watches",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ybdvjveb",
        "name": "intention",
        "type": "select",
        "required": false,
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
        "unique": false,
        "options": {
          "min": 0,
          "max": 5
        }
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
  const collection = dao.findCollectionByNameOrId("n8antxznh6lbum4");

  return dao.deleteCollection(collection);
})
