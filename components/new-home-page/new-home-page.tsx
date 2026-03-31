import { topicsList } from "@/domain/topic/topic.constants";
import { SearchBar } from "../search-bar";

export function NewHomePage() {
  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <SearchBar />
      <h1>New Main Page</h1>

      <main>
        <section>
          {topicsList.map((topic) => {
            return <button key={topic.title}> {topic.title} </button>;
          })}
        </section>
      </main>
    </div>
  );
}
