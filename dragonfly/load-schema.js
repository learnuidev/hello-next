const fs = require("fs").promises;
const path = require("path");
const { loadSchema } = require(".");
const z = require("zod").z;

// const dragonflySchema = z.object({
//   appType: z.string(),
//   nextVersion: z.string(),
// });

// const schemaPath = path.resolve("../hello-next/.dragonfly/schema.json");
// function loadSchema() {
//   return fs.readFile(schemaPath).then((schemaBuffer) => {
//     const schemaJson = JSON.parse(schemaBuffer.toString());

//     return dragonflySchema.parse(schemaJson);
//   });
// }

// module.exports.loadSchema = loadSchema;

loadSchema().then((schema) => {
  console.log("MY SCHEMA", schema);
});
