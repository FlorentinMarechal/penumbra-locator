import { readFile } from 'node:fs/promises';
import fs from 'fs';
import pokemon from 'pokemon'
try {
 
    const filePath = new URL('./wildEncounters.txt', import.meta.url);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    // const splitContent = contents.split(/(Table|==========)/gm);
    const allPokemonFr = pokemon.all('fr');
    const allPokemonEn = pokemon.all();
    if(allPokemonEn < 500) console.log('Liste pokemon imcomplète');
  //   console.log(englishPokemonNames);
    console.log(`${allPokemonEn.length} pokemon trouvés`);
    let frenchContents = contents
    
    for (const englishPokemonName of allPokemonEn) {
        const pokemonId = pokemon.getId(englishPokemonName);
        // console.log(`${englishPokemonName} ID: `,pokemonId);
        const frenchPokemonName = pokemon.getName(pokemonId, 'fr');
        // console.log(`${pokemonId} Name: `,frenchPokemonName);
        frenchContents = frenchContents.replaceAll(englishPokemonName, frenchPokemonName)  
    }

    const unavailiblePokemon = [];

    const splitContent = frenchContents.split(/(Table|==========)/gm);

    for(const pokemonName of allPokemonFr) {
        const locationArray = [];
        if(frenchContents.includes(pokemonName)) {
            splitContent.forEach(element => {
                if (element.includes('Map')){
                  locationArray.push(element);
                }
                if (element.includes(pokemonName)){
                  locationArray.push(element);
                }
            })

            const text = locationArray.join("============\n");

            fs.writeFile(`./pokemon-location/${pokemonName}.txt`, text, function (err) {
                if (err) return console.log(err);
                console.log(`'${pokemonName}.txt' crée avec succès.`);
            });
        } else {
            unavailiblePokemon.push(pokemonName);  
        } 
    }

    fs.writeFile(`./pokemon-location/unavailible-wild-pokemon.txt`, unavailiblePokemon.join(", "), function (err) {
        if (err) return console.log(err);
        console.log(`'${pokemonName}.txt' crée avec succès.`);
    });

} catch (err) {
  console.error(err.message);
}
