/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useListForYou } from "./use-list-for-you";

export const DuForYou = () => {
  const { data: section } = useListForYou();

  return (
    <div key={"For you"}>
      <h2 className="text-2xl font-semibold text-gray-300"> {section.title}</h2>

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
        {section?.items?.map((item) => {
          return (
            <div
              key={JSON.stringify(item)}
              className="block col-span-3 lg:col-span-2"
            >
              <Link href={`/du/${item?.path}`} className="block">
                <img
                  className="object-cover rounded-xl w-full"
                  src={item?.large_image_url}
                  alt={item?.title}
                />
              </Link>

              <p className="mt-2 truncate">
                {" "}
                <span>{item?.title}</span>
              </p>
              <p className="font-light text-gray-400 text-sm capitalize">
                {" "}
                <span>{item?.levels?.[0] || item?.level}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
