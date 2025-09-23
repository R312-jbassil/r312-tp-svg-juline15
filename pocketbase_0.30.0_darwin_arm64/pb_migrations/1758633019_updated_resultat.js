/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2811561467")

  // update collection data
  unmarshal({
    "name": "Svg"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2811561467")

  // update collection data
  unmarshal({
    "name": "resultat"
  }, collection)

  return app.save(collection)
})
