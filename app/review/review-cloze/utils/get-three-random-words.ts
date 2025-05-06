export function getThreeRandomWords(words: any) {
  // Create a shallow copy and shuffle it
  const shuffled = words?.slice()?.sort(() => 0.5 - Math.random());
  // Return the first three elements
  return shuffled?.slice(0, 3) || [];
}
