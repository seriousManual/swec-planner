const fs = require('fs');
const mkdirp = require('mkdirp');
const webpush = require('web-push');

const PRIVATE_KEYS_FILE = "vapid-keys.private.json";
const PUBLIC_KEY_DIR = "build/static/";
const PUBLIC_KEY_FILE = PUBLIC_KEY_DIR + "vapid-keys.public.json";

function writeKeysToFile(filenamePrivate, fileDirPublic, filenamePublic) {
  const keys = webpush.generateVAPIDKeys();

  fs.writeFileSync(filenamePrivate, JSON.stringify(keys));
  if (!fs.existsSync(fileDirPublic)) {
    mkdirp.sync(fileDirPublic);
  }
  fs.writeFileSync(filenamePublic, JSON.stringify({ publicKey: keys.publicKey }));

  console.log('Generated keys: ' + JSON.stringify(keys));
  console.log(`Wrote keys to ${filenamePrivate} and ${filenamePublic}.`);
}

if (fileExists(PRIVATE_KEYS_FILE)) {
  console.log(`'${PRIVATE_KEYS_FILE}' exists, won't re-generate keys.`);
  console.log('If you really want to use new keys, manually delete the file.');
  process.exit(0);
}

if (fileExists(PUBLIC_KEY_FILE)) {
  console.log(`'${PUBLIC_KEY_FILE}' exists, won't re-generate keys.`);
  console.log('If you really want to use new keys, manually delete the file.');
  process.exit(0);
}

function fileExists(filename) {
  try {
    fs.accessSync(filename, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

writeKeysToFile(PRIVATE_KEYS_FILE,PUBLIC_KEY_DIR, PUBLIC_KEY_FILE);
