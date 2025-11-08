const URL = "https://pokeapi.co/api/v2/pokemon/pikachu";

async function getPokemonData() {
  const res = await fetch(URL);

  if (res.ok === false) {
    console.error("에러입니다.", res.status);
    return;
  }

  console.log(res.headers.get("content-type"));
  return await res.json();
}

async function printPokemonInfo() {
  const getPokemonInfo = await getPokemonData();

  console.log("pokemon name = ", getPokemonInfo.name);
  console.log("status = ", (end = " "));
  getPokemonInfo.stats.forEach((ability) => {
    console.log(ability.stat.name);
  });
}

printPokemonInfo();
