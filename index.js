import { readFile } from 'node:fs/promises';
import fs from 'fs'
try {
  const filePath = new URL('./wildEncounters.txt', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  const splitContent = contents.split(/(Table|==========)/gm)
  console.log(splitContent.length < 1 ? `Valide, ${splitContent.length} élements.` : `Invalide`);
  const locationArray = [];
  const pokemon = "Abra";

  splitContent.forEach(element => {
    if (element.includes('Map')){
      locationArray.push(element);
    }
    if (element.includes(pokemon)){
      
      locationArray.push(element);
    }
  })
  fs.writeFile(`${pokemon}.txt`, `${locationArray.toString()}`, function (err) {
    if (err) return console.log(err);
    console.log(`${pokemon}.txt: `, `${locationArray.toString()}`);
  });
} catch (err) {
  console.error(err.message);
}
