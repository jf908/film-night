/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ocs0vqi777lti5")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_VA5xV0V` ON `media` (\n  `tmdb_id`,\n  `type`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ocs0vqi777lti5")

  collection.indexes = []

  return dao.saveCollection(collection)
})
