import { alphabet } from '../helpers/alphabet';

export function boggleGameLetters() {
  let boggleGameLetters = [];
  for (let i = 0; i < 16; i++) {
    boggleGameLetters.push(alphabet[Math.floor(Math.random() * 25 + 1)]);
  }

  return boggleGameLetters;
}