import { NavBar } from "@/components/navbar";
import { agenda } from "@/data/agenda";
import { cn } from "@/lib/utils";

export default function LearnMandarino() {
  return (
    <main>
      <NavBar />

      <section className="px-4 md:px-12 my-32 grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-8">
          <div className="grid md:grid-cols-5 lg:grid-cols-8 grid-cols-2 gap-8">
            {agenda?.map((lesson) => {
              return (
                <div key={lesson.id} className="col-span-2">
                  <p className="text-gray-400 font-light text-sm">
                    {lesson?.title}
                  </p>

                  <div className="mx-4 my-4">
                    {lesson?.tasks?.map((task) => {
                      return (
                        <div
                          key={task.id}
                          className={cn(
                            lesson?.id !== "multi-languages"
                              ? "text-white"
                              : lesson?.id === "multi-languages" &&
                                  ["Mandarin", "Nepali", "Romanian"]?.includes(
                                    task?.title
                                  )
                                ? "text-white"
                                : "text-gray-800"
                          )}
                        >
                          <p>{task?.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2"></div>
      </section>
    </main>
  );
}
