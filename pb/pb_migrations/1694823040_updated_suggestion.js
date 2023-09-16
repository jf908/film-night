/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8afagkn6l0frsop")

  collection.createRule = "@request.auth.id != \"\" && @request.data.active = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8afagkn6l0frsop")

  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
