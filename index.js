import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./wildEncounters.txt', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  const splitContent = contents.split('==========')
  console.log(splitContent.length);

  const pokemon = "Pikipek";
  const locationArray = [];
  splitContent.forEach(element => {
    if (element.includes(pokemon)){
      locationArray.push(element);
    }
  })
  locationArray.forEach(element => {
    console.log(element.toString());
  });
} catch (err) {
  console.error(err.message);
}