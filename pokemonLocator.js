import { readFile } from 'node:fs/promises';
import fs from 'fs';
import pokemon from 'pokemon'
try {
  const filePath = new URL('./wildEncounters.txt', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  const splitContent = contents.split(/(Table|==========)/gm)
  console.log(splitContent.length > 1 ? `Valide, ${splitContent.length} élements.` : `Invalide`);
  const locationArray = [];
  const chosedPokemon = "Étourmi";
  const pokemonId = pokemon.getId(chosedPokemon, 'fr');
  console.log(pokemonId ? `ID du pokemon: ${pokemonId}` : `ID introuvale`);
  const englishPokemonName = pokemon.getName(pokemonId)
  console.log(englishPokemonName ? `Nom anglais: ${englishPokemonName}` : `Erreur de traduction`);
  splitContent.forEach(element => {
    if (element.includes('Map')){
      locationArray.push(element);
    }
    if (element.includes(englishPokemonName)){
      locationArray.push(element);
    }
  })
  fs.writeFile(`${chosedPokemon}-${englishPokemonName}.txt`, `${locationArray.toString()}`, function (err) {
    if (err) return console.log(err);
    console.log(`'${chosedPokemon}-${englishPokemonName}.txt' crée avec succès.`);
  });
} catch (err) {
  console.error(err.message);
}
