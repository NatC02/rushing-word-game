// If an option is missing, it will be given a default value

import WordSearch from '@blex41/word-search/dist/wordsearch.min.js';

const defaultOptions = {
  cols: 4,
  rows: 4,
  disabledDirections: ['N', 'W', 'NW', 'SW'],
  dictionary: ['Bus', 'Car', 'Taxi', 'day', 'sad', 'bad', 'red', 'palm', 'fish', 'toy', 'hands', 'chair'],
  maxWords: 20,
  backwardsProbability: 0.3,
  upperCase: true,
  diacritics: true,
};

// export async function generateWordSearchPuzzle(options = defaultOptions) {
//   // @ts-ignore
//   options.dictionary = await getWordsFromGSheet();
//   return new WordSearch(options);
// }

export function generateWordSearchPuzzle(options = defaultOptions) {
  return new WordSearch(options);
}