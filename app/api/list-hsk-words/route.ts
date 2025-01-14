const hskWordsUrl = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JHJXDHJ0DSEFJEX3N9GVFVPB.json`;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { level } = await req.json();

  const resp = await fetch(hskWordsUrl);

  const respJson = await resp.json();

  return Response.json(respJson);
}
