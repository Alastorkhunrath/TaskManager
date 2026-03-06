/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n16b1iiborqngsa")

  collection.listRule = "@request.auth.id = ''"
  collection.viewRule = "@request.auth.id = ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n16b1iiborqngsa")

  collection.listRule = "@request.auth.id = 'lhvp0zwou31hr9q'"
  collection.viewRule = "@request.auth.id = 'lhvp0zwou31hr9q'"

  return dao.saveCollection(collection)
})
