const fs = require("fs").promises;
const path = require("path");
const z = require("zod").z;

// Attempt 1
// __dirname: gives the directory until dragonfly
// const pathName = __dirname + "../.dragonfly/schema.json";
// console.log("PATH NAME", pathName);

// Attempt 2
// var pathName = path.resolve("../.dragonfly/schema.json");
// console.log("PATH NAME", pathName);

// Attempt 3
// var pathName = path.resolve("../hello-next/.dragonfly/schema.json");

const dragonflySchema = z.object({
  appType: z.string(),
  nextVersion: z.string(),
});

// type ISchema = z.infer<typeof dragonflySchema>;

const schemaPath = path.resolve("../hello-next/.dragonfly/schema.json");
function loadSchema() {
  return fs.readFile(schemaPath).then((schemaBuffer) => {
    // console.log("SCHEMA BUFFER", schemaBuffer);
    //   console.log("SCHEMA BUFFER", schemaBuffer.toJSON());
    // console.log("SCHEMA BUFFER", schemaBuffer.toString());
    const schemaJson = JSON.parse(schemaBuffer.toString());

    return dragonflySchema.parse(schemaJson);
  });
}

// loadSchema().then((schema) => {
//   console.log("MY SCHEMA", schema);
// });

async function listDirectoryNames(name, options = { directoriesOnly: true }) {
  const filterDirectoriesOnly = (pages) => {
    return pages?.filter((pageName) => {
      if (options.directoriesOnly) {
        return !pageName.includes(".");
      }

      return true;
    });
  };
  if (name) {
    const pathName = path.resolve(`../hello-next/app/${name}`);
    const children = await fs.readdir(pathName);
    return filterDirectoriesOnly(children);
  }

  const pathName = path.resolve(`../hello-next/app`);
  const children = await fs.readdir(pathName);
  return filterDirectoriesOnly(children);

  //   return [
  //     {
  //       id: "home-page",
  //       path: "/",
  //     },
  //   ];
}

// listDirectoryNames().then((pages) => {
//   console.log("PAGES", pages);
// });

// listDirectoryNames("(auth)").then((pages) => {
//   console.log("PAGES", pages);
// });
// listDirectoryNames("nmm", {
//   directoriesOnly: false,
// }).then((pages) => {
//   console.log("PAGES", pages);
// });

// const listTsxComponents = (name, options) => {
//   return listDirectoryNames(name, options).then((pages) => {
//     // console.log("PAGES", pages);
//     return pages?.filter((page) => page?.includes(".tsx"));
//   });
// };

// listTsxComponents("nmm", {
//   directoriesOnly: false,
// }).then((pages) => {
//   console.log("PAGES", pages);
// });

const listHooksComponents = (name, options) => {
  return listDirectoryNames(name, options).then((pages) => {
    // console.log("PAGES", pages);
    return pages?.filter((page) => page?.slice(0, 5)?.includes("use"));
  });
};

listHooksComponents("nmm", {
  directoriesOnly: false,
}).then((pages) => {
  console.log("Hooks", pages);
});
