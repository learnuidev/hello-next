export async function tavilySearch({
  query = "basic",
  maxResults = 10,
  searchDepth,
}: {
  query: string;
  maxResults: number;
  searchDepth: "basic" | "advanced";
}): Promise<any> {
  const apiKey = process.env.TAVILY_API_KEY;
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: maxResults < 5 ? 5 : maxResults,
      search_depth: searchDepth,
      include_images: true,
      include_answers: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
