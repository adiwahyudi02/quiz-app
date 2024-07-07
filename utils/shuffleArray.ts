/**
 * Shuffles an array.
 *
 * @template T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = array.slice(); // Create a copy of the array to shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
