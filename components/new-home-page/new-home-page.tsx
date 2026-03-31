import { SearchBar } from "../search-bar";
import { TopicsList } from "./components/topics-list";
import { SeriesList } from "./components/series-list";

export function NewHomePage() {
  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <SearchBar />

      <main className="mt-2">
        <TopicsList />
        <SeriesList />
      </main>
    </div>
  );
}
