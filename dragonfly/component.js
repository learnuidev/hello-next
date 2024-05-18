const fs = require("fs").promises;
const path = require("path");
const z = require("zod").z;

const { listDirectoryNames } = require(".");
const { componentParser1 } = require("./component-parser-1");

const listTsxComponents = (name, options) => {
  return listDirectoryNames(name, options).then((pages) => {
    // console.log("PAGES", pages);
    return pages?.filter((page) => page?.includes(".tsx"));
  });
};

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

// listHooksComponents("nmm", {
//   directoriesOnly: false,
// }).then((pages) => {
//   console.log("Hooks", pages);
// });

const getComponent = ({ name, directoryPath }, options) => {
  const pathName = path.resolve(
    `../hello-next/app/${directoryPath}/${name?.includes("ts" || "js") ? name : `${name}.tsx`}`
  );

  const start = Date.now();

  return fs
    .readFile(pathName)
    .then((schemaBuffer) => {
      // console.log("SCHEMA BUFFER", schemaBuffer);
      //   console.log("SCHEMA BUFFER", schemaBuffer.toJSON());
      // console.log("SCHEMA BUFFER", schemaBuffer.toString());
      const componentJson = schemaBuffer.toString();

      const finish = Date.now();

      return {
        name,
        directoryPath,
        component: componentJson,
        createdAt: Date.now(),
        opsTime: finish - start,
      };
    })
    .catch((err) => {
      const finish = Date.now();

      return {
        message: `Component: ${name} does not exist in ${directoryPath}`,
        name,
        directoryPath,
        createdAt: Date.now(),
        opsTime: finish - start,
      };
    });

  // return listDirectoryNames(componentDirectoryPath, options).then()
};

getComponent({
  name: "no-lesson-view.tsx",
  directoryPath: "nmm",
}).then((resp) => {
  if (resp.component) {
    console.log("COMP", componentParser1(resp));
  }
});
