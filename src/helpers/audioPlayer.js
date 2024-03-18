import { Howl } from 'howler';

let letters = new Howl({
  src: [
    new URL('../assets/alphabet-pronunciation-british.mp3', import.meta.url)
      .href,
  ],
  sprite: {
    A: [1000, 700],
    B: [1800, 600],
    C: [2600, 600],
    D: [3400, 600],
    E: [4200, 600],
    F: [5400, 400],
    G: [6100, 600],
    H: [7000, 500],
    I: [7700, 600],
    J: [8500, 600],
    K: [9700, 600],
    L: [10400, 600],
    M: [11100, 600],
    N: [11900, 600],
    O: [12500, 600],
    P: [13700, 600],
    Q: [14500, 600],
    R: [15200, 600],
    S: [16000, 400],
    T: [16900, 500],
    U: [18050, 600],
    V: [18800, 600],
    W: [19650, 600],
    X: [20950, 600],
    Y: [21700, 600],
    Z: [22500, 600],
  },
});

let keyPressSounds = new Howl({
  src: [
    new URL(
      '../assets/enter-button-mechanical-keyboard-14388.mp3',
      import.meta.url
    ).href,
  ],
  sprite: {
    A: [1000, 400],
  },
});

let jingle1 = new Howl({
  src: [new URL('../assets/jingle1.mp3', import.meta.url).href],
});

let jingle2 = new Howl({
  src: [new URL('../assets/jingle2.mp3', import.meta.url).href],
});

let jingle3 = new Howl({
  src: [new URL('../assets/jingle3.mp3', import.meta.url).href],
});

export function playLetter(letter) {
  letters.play(letter);
}

export function playJingle1() {
  jingle1.play();
}

export function playJingle2() {
  jingle2.play();
}
export function playJingle3() {
  jingle3.play();
}

export function playWord(url) {
  let word = new Howl({
    src: [url],
  });
  word.play();
}

export function findWordAudioUrl(wordsList, word) {
  return wordsList.find((item) => item.word === word).audio;
}

export function playKeyPressSound() {
  keyPressSounds.play('A');
}
// Shoot the laser!