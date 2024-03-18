export const WORDS_BANK = {
  animals: [
    {
      word: 'MOUSE',
      img: new URL('../assets/words/mouse.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio/Animals-0001.mp3', import.meta.url)
        .href,
    },
    {
      word: 'CAT',
      img: new URL('../assets/words/cat.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio/Animals-0002.mp3', import.meta.url)
        .href,
    },
    {
      word: 'HORSE',
      img: new URL('../assets/words/horse.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio/Animals-0003.mp3', import.meta.url)
        .href,
    },
    {
      word: 'CHICKEN',
      img: new URL('../assets/words/chicken.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio/Animals-0004.mp3', import.meta.url)
        .href,
    },
    {
      word: 'RABBIT',
      img: new URL('../assets/words/rabbit.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio//Animals-0005.mp3', import.meta.url)
        .href,
    },
    {
      word: 'PIG',
      img: new URL('../assets/words/pig.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio//Animals-0006.mp3', import.meta.url)
        .href,
    },
    {
      word: 'DOG',
      img: new URL('../assets/words/dog.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio//Animals-0007.mp3', import.meta.url)
        .href,
    },
    {
      word: 'INSECT',
      img: new URL('../assets/words/insect.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio//Animals-0008.mp3', import.meta.url)
        .href,
    },
    {
      word: 'COW',
      img: new URL('../assets/words/cow.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio//Animals-0009.mp3', import.meta.url)
        .href,
    },
    {
      word: 'BIRD',
      img: new URL('../assets/words/bird.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio//Animals-0010.mp3', import.meta.url)
        .href,
    },
    {
      word: 'GOAT',
      img: new URL('../assets/words/goat.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio/Animals-0011.mp3', import.meta.url)
        .href,
    },
    {
      word: 'SHEEP',
      img: new URL('../assets/words/sheep.jpg', import.meta.url).href,
      audio: new URL('../assets/words-audio/Animals-0012.mp3', import.meta.url)
        .href,
    },
  ],
  football: [
    {
      word: 'STADIUM',
      img: new URL('../assets/words/stadium.png', import.meta.url).href,
    },
    {
      word: 'TEAM',
      img: new URL('../assets/words/team.png', import.meta.url).href,
    },
    {
      word: 'FIELD',
      img: new URL('../assets/words/field.jpg', import.meta.url).href,
    },
    {
      word: 'NET',
      img: new URL('../assets/words/net.png', import.meta.url).href,
    },
    {
      word: 'GOALKEEPER',
      img: new URL('../assets/words/goalkeeper.png', import.meta.url).href,
    },
  ],
  restaurant: [
    {
      word: 'waitress',
    },
    {
      word: 'glass',
    },
    {
      word: 'menu',
    },
    {
      word: 'cup',
    },
    {
      word: 'knife',
    },
    {
      word: 'plate',
    },
    {
      word: 'chef',
    },
    {
      word: 'meal',
    },
    {
      word: 'waiter',
    },
    {
      word: 'fork',
    },
    {
      word: 'bill',
    },
    {
      word: 'spoon',
    },
  ],
};

export const WORDS_LIST = WORDS_BANK.animals;

export const BOGGLE_GAME_DEFAULT_OPTIONS = {
  cols: 4,
  rows: 4,
  disabledDirections: ['N', 'W', 'NW', 'SW'],
  // dictionary: ['Bus', 'Car', 'Taxi', 'day', 'sad', 'bad', 'red'],
  dictionary: [...WORDS_LIST.map((animal) => animal.word)],
  maxWords: 20,
  backwardsProbability: 0.3,
  upperCase: true,
  diacritics: true,
};

export const COUNT_DOWN = 16;
