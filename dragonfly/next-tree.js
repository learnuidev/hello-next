// const { listDirectoryNames } = require(".");

const { listDirectoryNames } = require(".");

listDirectoryNames()
  .then((pages) => {
    //   console.log("PAGES", pages);

    return Promise.all(
      pages?.map(async (page) => {
        const path = ``;
        const directories = await listDirectoryNames(page);
        // const subDirectories = await Promise.all(
        //   directories.map(async (dir) => {
        //     return {
        //       directory: dir,
        //       subDirectories: await listDirectoryNames(dir),
        //     };
        //   })
        // );
        return {
          page,
          directories,
        };
      })
    );
  })
  .then((dirs) => {
    console.log("DIRS", dirs);
  });

// listDirectoryNames("(auth)").then((pages) => {
//   console.log("PAGES", pages);
// });
