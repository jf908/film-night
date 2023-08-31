/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8antxznh6lbum4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybdvjveb",
    "name": "intent",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8antxznh6lbum4")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
