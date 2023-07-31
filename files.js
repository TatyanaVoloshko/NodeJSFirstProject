const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (fileName, content) => {
  const file = { fileName, content };
  const validatedData = dataValidator(file);
  // console.log(validatedData.error.details[0]);
  if (validatedData.error) {
    console.log(
      chalk.red(
        `please specify ${validatedData.error.details[0].path} parametr`
      )
    );
    return;
  }
  if (!checkExtension(fileName).isPresent) {
    console.log(
      chalk.red(
        `sorry, this application dosen't support '${
          checkExtension(fileName).extension
        }' extension`
      )
    );
    return;
  }
  const filesPath = path.join(__dirname, './files', fileName)
  try {
    await fs.writeFile(filesPath, content, 'utf-8');
    console.log(chalk.green('file was created succesfully'))
  } catch (error) {
    console.log (error);
  }
};

async function getFiles () {
const folderPath = path.join(__dirname, 'files');
const dataPath = await fs.readdir(folderPath);

if (!dataPath.length) {
    console.log(chalk.red("No file in this folder"));
    return;
}
console.log(dataPath);

}

async function getInfo(fileName) {
    const folderPath = path.join(__dirname, 'files');
    const folderData = await fs.readdir(folderPath);

    if(!folderData.includes(fileName)) {
        console.log(chalk.red("No file with this name"));
        return;
    }
    const filePath = path.join(__dirname, 'files', fileName);
    const content = await fs.readFile(filePath, "utf-8");
    const ext = path.extname(fileName).slice(1);
    
    const name = path.basename(fileName, ext);

    console.log ({ name, ext, content});
}

module.exports = { 
    createFile,
    getFiles,
getInfo };
