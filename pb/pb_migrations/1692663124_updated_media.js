/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ocs0vqi777lti5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ust490jv",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "movie"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ocs0vqi777lti5")

  // remove
  collection.schema.removeField("ust490jv")

  return dao.saveCollection(collection)
})
