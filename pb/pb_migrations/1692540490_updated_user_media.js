/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8antxznh6lbum4")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_GLZvSpq` ON `user_media` (\n  `user`,\n  `media`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "af8ysdoa",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zqjeuwt3",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n8antxznh6lbum4")

  collection.indexes = []

  // remove
  collection.schema.removeField("af8ysdoa")

  // remove
  collection.schema.removeField("zqjeuwt3")

  return dao.saveCollection(collection)
})
