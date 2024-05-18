const fs = require("fs").promises;
const path = require("path");

// async function listDirectoryNames(name, options = { directoriesOnly: true }) {
//   const filterDirectoriesOnly = (pages) => {
//     return pages?.filter((pageName) => {
//       if (options.directoriesOnly) {
//         return !pageName.includes(".");
//       }

//       return true;
//     });
//   };
//   if (name) {
//     const pathName = path.resolve(`../hello-next/app/${name}`);
//     const children = await fs.readdir(pathName);
//     return filterDirectoriesOnly(children);
//   }

//   const pathName = path.resolve(`../hello-next/app`);
//   const children = await fs.readdir(pathName);
//   return filterDirectoriesOnly(children);
// }

// module.exports.listDirectoryNames = listDirectoryNames;

listDirectoryNames().then((pages) => {
  console.log("PAGES", pages);
});

// listDirectoryNames("(auth)").then((pages) => {
//   console.log("PAGES", pages);
// });
// listDirectoryNames("nmm", {
//   directoriesOnly: false,
// }).then((pages) => {
//   console.log("PAGES", pages);
// });
