/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8c7ziwtxcvy11o1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jplzsfbs",
    "name": "attended",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8c7ziwtxcvy11o1")

  // remove
  collection.schema.removeField("jplzsfbs")

  return dao.saveCollection(collection)
})
