import { ContentsList } from "./components/contents-list";
import { listGridBankMediaContent } from "./modules/media/media.api";

export default async function InterviewPage() {
  const gridBankContents = await listGridBankMediaContent();

  return (
    <main>
      <ContentsList gridBankContents={gridBankContents || []} />
    </main>
  );
}
