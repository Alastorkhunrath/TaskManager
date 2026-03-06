/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n16b1iiborqngsa")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abb0vagd",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "low",
        "medium",
        "high"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n16b1iiborqngsa")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abb0vagd",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "low",
        "middle",
        "high"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
