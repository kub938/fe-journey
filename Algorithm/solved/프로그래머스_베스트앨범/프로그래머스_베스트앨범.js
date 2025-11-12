function solution(genres, plays) {
  let n = genres.length;
  let answer = [];
  let mapGenres = new Map();
  let setGenres = new Set(genres);
  let maxPlays = [];

  setGenres.forEach((genre) => {
    mapGenres.set(genre, []);
  });

  for (let i = 0; i < n; i++) {
    mapGenres.get(genres[i]).push([plays[i], i]);
  }

  setGenres.forEach((genre) => {
    let sumPlays = 0;
    mapGenres.get(genre).forEach((genreData) => {
      const value = genreData[0];
      sumPlays += value;
    });
    maxPlays.push([genre, sumPlays]);
  });

  maxPlays.sort((a, b) => b[1] - a[1]);

  for (const [key, value] of mapGenres.entries()) {
    mapGenres.set(
      key,
      value.sort((a, b) => b[0] - a[0])
    );
  }

  maxPlays.forEach((maxPlay) => {
    const genre = maxPlay[0];

    for (let i = 0; i < 2; i++) {
      if (mapGenres.get(genre).length <= i) {
        break;
      }
      answer.push(mapGenres.get(genre)[i][1]);
    }
  });

  return answer;
}
