import { ContentsList } from "./components/contents-list";
import { listGridBankMediaContent } from "./modules/media/media.api";

export default async function InterviewPage() {
  const gridBankContents = await listGridBankMediaContent();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="p-4">
        <h1 className="font-light text-2xl">Grid Bank</h1>
      </header>

      <main>
        <ContentsList gridBankContents={gridBankContents || []} />
      </main>
    </div>
  );
}
