export async function getWordsFromGSheet() {
  try {
    const res = await fetch(
      'https://docs.google.com/spreadsheets/d/15Yx_Twtfzl1ai78tFizQ5gL7JaOiIPXCZp9Jq1AlcWs/gviz/tq?tqx=out:json&gid=0'
    );
    let data = await res.text();
    data = JSON.parse(data.slice(47, -2)).table.rows.map((item) => item.c[0].v);
    return data;
  } catch (error) {
    console.error(error);
  }
}
