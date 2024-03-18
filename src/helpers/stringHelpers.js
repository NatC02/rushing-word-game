// If an option is missing, it will be given a default value
import WordSearch from '@blex41/word-search/dist/wordsearch.min.js';

export function generateWordSearchPuzzle(options) {
  return new WordSearch(options);
}