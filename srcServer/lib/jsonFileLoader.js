const fs = require('fs');

const stripComments = require('strip-json-comments');

async function loadJsonFile(filePath){
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      
      try {
        data = stripComments(data);
        data = JSON.parse(data);        
        console.log('successfully file reloaded');
        resolve(data);
      }
      catch (e) {
        reject(e);
      }
    });
  });
}

module.exports.loadJsonFile = loadJsonFile;