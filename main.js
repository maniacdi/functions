const axios = require('axios');
const atob = require('atob');

const email = 'magaldi6@gmail.com';
const baseUrl = 'https://ciphersprint.pulley.com';

//Get initial challenge data
async function fetchInitialChallenge() {
  try {
    console.time('Fetch Initial Challenge');
    const response = await axios.get(`${baseUrl}/${email}`);
    console.timeEnd('Fetch Initial Challenge');
    return response.data;
  } catch (error) {
    console.error('Error fetching initial challenge:', error.message);
    throw error;
  }
}

//Decode the challenge data based on the method
function decodePath(encryptedPath, method) {
  console.time('Decoding time');
  let decodedPath;

  switch (method) {
    case 'nothing':
      decodedPath = encryptedPath;
      break;
    case 'encoded as base64':
      decodedPath = atob(encryptedPath);
      break;
    case 'swapped every pair of characters':
      decodedPath = encryptedPath.replace(/(.)(.)/g, '$2$1');
      break;
    case method.match(/^circularly rotated (left|right) by \d+$/)?.input:
      const [direction, rotation] = method
        .match(/^circularly rotated (left|right) by (\d+)$/)
        .slice(1);
      decodedPath = circularlyRotate(
        encryptedPath,
        parseInt(rotation, 10),
        direction
      );
      break;
    case method.startsWith('encoded it with custom hex character set'):
      const hexCharSet = method.split('custom hex character set ')[1];
      decodedPath = decodeCustomHex(encryptedPath, hexCharSet);
      break;
    default:
      console.error('Unknown encryption method:', method);
      decodedPath = null;
  }

  console.timeEnd('Decoding time');
  return decodedPath;
}

//Decodes a string from a string encoding using the given Hex set
function decodeCustomHex(encryptedPath, hexCharSet) {
  if (hexCharSet.length !== 16) {
    throw new Error('Invalid hex character set length');
  }

  const customToStandardHexMap = {};
  const standardHexDigits = '0123456789abcdef';

  for (let i = 0; i < hexCharSet.length; i++) {
    customToStandardHexMap[hexCharSet[i]] = standardHexDigits[i];
  }

  let standardHexString = '';
  for (let i = 0; i < encryptedPath.length; i++) {
    const mappedChar = customToStandardHexMap[encryptedPath[i]];
    if (mappedChar) {
      standardHexString += mappedChar;
    } else {
      console.error(`Unmapped character detected: ${encryptedPath[i]}`);
      return null;
    }
  }

  let decodedText = '';
  for (let i = 0; i < standardHexString.length; i += 2) {
    decodedText += String.fromCharCode(
      parseInt(standardHexString.slice(i, i + 2), 16)
    );
  }

  return decodedText;
}

// Rotate a string
function circularlyRotate(str, rotation, direction) {
  const length = str.length;
  if (length === 0) return str;

  const actualRotation = rotation % length;
  if (direction === 'right') {
    return str.slice(-actualRotation) + str.slice(0, -actualRotation);
  } else {
    return str.slice(actualRotation) + str.slice(0, actualRotation);
  }
}

//Get the next level
async function fetchNextChallenge(encryptedPath, method) {
  try {
    const decodedPath = decodePath(encryptedPath.split('task_')[1], method);
    if (!decodedPath) {
      throw new Error('Failed to decode path');
    }
    const path = `task_${decodedPath.trim()}`;
    const response = await axios.get(`${baseUrl}/${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching next challenge:', error.message);
    return null;
  }
}

async function main() {
  try {
    const initialChallenge = await fetchInitialChallenge();
    console.log('Initial challenge received:', initialChallenge);

    let currentChallenge = initialChallenge;

    while (currentChallenge) {
      console.time('Processing Challenge');
      const nextChallenge = await fetchNextChallenge(
        currentChallenge.encrypted_path,
        currentChallenge.encryption_method
      );
      console.timeEnd('Processing Challenge');
      console.log('Next challenge received:', nextChallenge);

      if (!nextChallenge || !nextChallenge.encrypted_path) {
        console.log('No more challenges. Process complete.');
        break;
      }

      currentChallenge = nextChallenge;
    }
  } catch (error) {
    console.error('Failed to complete the challenge process:', error.message);
  }
}

main();
