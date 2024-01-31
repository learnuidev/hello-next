// import Image from 'next/image'
"use client";

import { useGetHtmlTextQuery } from "@/domain/asset/resource.queries";

export default function Map() {
  // const { data } = useGetHtmlTextQuery({
  //   url: "https://thetricontinental.org/wenhua-zongheng-2023-4-third-wave-of-socialism/",
  //   selector: ".container",
  //   ai: true,
  //   // selector: ".single-post--title",
  // });
  const { data } = useGetHtmlTextQuery({
    url: "https://news.cqnews.net/1/detail/1195025550803832832/web/content_1195025550803832832.htm",
    selector: "#wrapper",
    ai: true,
  });
  return (
    <main className="">
      <h2>Response</h2>

      {/* <div>
        <code>
          <pre>
            {JSON.stringify(data?.data?.completion?.split("\n"), null, 2)}
          </pre>
        </code>
      </div> */}
    </main>
  );
}
