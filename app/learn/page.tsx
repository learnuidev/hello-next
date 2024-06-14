import { NavBar } from "@/components/navbar";

const agenda = [
  {
    id: "getting-started",
    title: "01. Getting Started",
    tasks: [
      {
        id: "intro",
        title: "Welcome",
      },
      {
        id: "registration",
        title: "Registration",
      },
    ],
  },
  {
    id: "core-features",
    title: "02. Core Features",
    tasks: [
      {
        id: "search",
        title: "Search",
      },
      {
        id: "story",
        title: "Nomad Method",
      },
      {
        id: "discover",
        title: "Discover",
      },
      {
        id: "review",
        title: "Review",
      },
      {
        id: "timeline",
        title: "Timeline",
      },
      {
        id: "pinyin-next",
        title: "Pinyin Pro",
      },
      {
        id: "tracking",
        title: "Tracking",
      },
      {
        id: "analytics",
        title: "Analytics",
      },
      {
        id: "byod",
        title: "BYOD",
      },
    ],
  },
  {
    id: "multi-languages",
    title: "03. Languages (beta)",
    tasks: [
      {
        id: "mandarin",
        title: "Mandarin",
      },
      {
        id: "nepali",
        title: "Nepali",
      },
      {
        id: "romanian",
        title: "Romanian",
      },
      {
        id: "persian",
        title: "Persian",
      },
      {
        id: "arabic",
        title: "Arabic",
      },
      {
        id: "korean",
        title: "Korean",
      },
      {
        id: "japanese",
        title: "Japanese",
      },
      {
        id: "spanish",
        title: "Spanish",
      },
      {
        id: "italian",
        title: "Italian",
      },
      {
        id: "russian",
        title: "Russian",
      },
      {
        id: "hindi",
        title: "Hindi",
      },
      {
        id: "urdu",
        title: "Urdu",
      },
      {
        id: "malayalam",
        title: "Malayalam",
      },
      {
        id: "danish",
        title: "Danish",
      },
      {
        id: "norwegian",
        title: "Norwegian",
      },
    ],
  },
  {
    id: "ai",
    title: "04. Mandarino AI",
    tasks: [
      {
        id: "discover",
        title: "Discover",
      },
      {
        id: "grammar-analysis",
        title: "Grammar Analysis",
      },
      {
        id: "content-generation",
        title: "Content Generation",
      },
      {
        id: "summary",
        title: "Summary",
      },
    ],
  },

  {
    id: "settings",
    title: "05. Settings",
    tasks: [
      {
        id: "preferences",
        title: "Preferences",
      },
      {
        id: "reset-password",
        title: "Reset Password",
      },
      {
        id: "tracking",
        title: "Tracking",
      },
    ],
  },
  {
    id: "concepts",
    title: "06. Concepts",
    tasks: [
      {
        id: "components",
        title: "Components",
      },
      {
        id: "nomad-method",
        title: "Nomad Method",
      },
      {
        id: "why-not-srs",
        title: "SRS vs IRS 🌶️",
      },
    ],
  },
];

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
                        <div key={task.id} className="">
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
