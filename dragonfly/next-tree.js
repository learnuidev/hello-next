// const { listDirectoryNames } = require(".");

const { listDirectoryNames } = require(".");

listDirectoryNames()
  .then((pages) => {
    //   console.log("PAGES", pages);

    return Promise.all(
      pages?.map(async (page) => {
        const path = `../hello-next/app/${page}`;
        const directories = await listDirectoryNames(page);
        const subDirectories = await Promise.all(
          directories.map(async (dir) => {
            const subDir = await listDirectoryNames(`${page}/${dir}`);
            return {
              directory: dir,
              subDirectories: await Promise.all(
                subDir.map(async (subDir) => {
                  const subSubDir = await listDirectoryNames(
                    `${page}/${dir}/${subDir}`
                  );

                  return {
                    directory: dir,
                    subDirectories: subSubDir,
                  };
                })
              ),
            };
          })
        );
        return {
          page,
          directories: subDirectories,
        };
      })
    );
  })
  .then((dirs) => {
    console.log("DIRS", JSON.stringify(dirs, null, 2));
  });

// listDirectoryNames("(auth)").then((pages) => {
//   console.log("PAGES", pages);
// });
