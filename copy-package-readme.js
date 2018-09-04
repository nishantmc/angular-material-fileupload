// Need to delete unwanted files

const fs = require('fs');
let resizable = fs.readFileSync('package.json').toString();
fs.writeFileSync('dist/package.json', resizable);

resizable = fs.readFileSync('README.md').toString();
fs.writeFileSync('dist/README.md', resizable);

const packageJson = JSON.parse(fs.readFileSync('./dist/package.json').toString());
delete packageJson.devDependencies;
delete packageJson.scripts;
fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
