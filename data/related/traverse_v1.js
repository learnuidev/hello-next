// const level50 = require('./level-0-50.json')
import fs from "fs";

Promise.all(
  Array(1)
    .fill(1)
    .map((x, i) => [i * 50, (i + 1) * 50])
    .map((item) => {
      const res = fs.readFileSync(
        `/Users/vishalgautam/projects/hello-next/traverse/level-${item[0]}-${item[1]}.json`,
        (data) => {
          console.log("data", data);
        }
      );

      const json = JSON.parse(res);

      //   console.log("RES", json);

      return json;
    })
).then((res) => {
  const allHits = res
    .map((json) => json.map((item) => item?.result?.hits?.hits))
    .flat()
    .flat();
  const ids = res.map((json) =>
    json.map((item) => item?.result?.hits?.hits?.map((hit) => hit?._id))
  );

//   console.log("ALL HITS", allHits);
  const uniqueIds = [...new Set(ids.flat()?.flat())];

  const uniqueItems = uniqueIds?.map((id) => {
    return allHits?.find((hit) => hit?._id === id);
  });


  fs.writeFile(`traverse/unique.json`, JSON.stringify(uniqueItems), () => {
    console.log("SUCCESS");
    // return items;
  });

  // console.log("UNIQUE ITEMS", uniqueItems?.length);
  console.log("RES", uniqueIds);
});
