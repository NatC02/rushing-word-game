export async function sendWordToDictionaryAPI(word) {
  try {
    return (
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    ).json();
  } catch (error) {
    console.error(error);
  }
}
