export const GenUI = ({ query, answer }: { query: string; answer: string }) => {
  return (
    <div>
      <h2>{query}</h2>
      <p>{answer}</p>
    </div>
  );
};
