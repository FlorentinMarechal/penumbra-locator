import { readFile } from 'node:fs/promises';
import fs from 'fs';
import pokemon from 'pokemon'
try {
  const filePath = new URL('./wildEncounters.txt', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  const englishPokemonNames = pokemon.all();
  if(englishPokemonNames < 500) console.log('Liste pokemon imcomplète');
//   console.log(englishPokemonNames);
  console.log(`${englishPokemonNames.length} pokemon trouvés`);
  let frenchContents = contents;
 
  for (const englishPokemonName of englishPokemonNames) {
    const pokemonId = pokemon.getId(englishPokemonName);
    // console.log(`${englishPokemonName} ID: `,pokemonId);
    const frenchPokemonName = pokemon.getName(pokemonId, 'fr');
    // console.log(`${pokemonId} Name: `,frenchPokemonName);
    frenchContents = frenchContents.replaceAll(englishPokemonName, frenchPokemonName)  
  }

//   console.log(frenchContents);
  fs.writeFile(`penumbra-moon-location-fr.txt`, `${frenchContents}`, function (err) {
    if (err) return console.log(err);
    console.log(`'penumbra-moon-location-fr.txt' crée avec succès.`);
  });

} catch (err) {
  console.error(err.message);
}
