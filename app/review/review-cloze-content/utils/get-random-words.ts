export function getRandomWords(words: any, options?: number) {
  // Create a shallow copy and shuffle it
  const shuffled = words?.slice()?.sort(() => 0.5 - Math.random());
  // Return the first three elements
  return options ? shuffled?.slice(0, options) || [] : shuffled;
}
