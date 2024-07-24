const axios = require('axios');
const atob = require('atob'); // Para decodificar base64

// Reemplaza con tu correo electrónico
const email = 'magaldi6@gmail.com';
const baseUrl = 'https://ciphersprint.pulley.com';

async function fetchInitialChallenge() {
  try {
    const response = await axios.get(`${baseUrl}/${email}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching initial challenge:',
      error.response ? error.response.status : error.message
    );
    throw error;
  }
}

function decodePath(encryptedPath, method) {
  if (method === 'nothing') {
    return encryptedPath;
  } else if (method === 'encoded as base64') {
    return atob(encryptedPath);
  } else if (method === 'swapped every pair of characters') {
    let decoded = '';
    for (let i = 0; i < encryptedPath.length; i += 2) {
      if (i + 1 < encryptedPath.length) {
        decoded += encryptedPath[i + 1] + encryptedPath[i];
      } else {
        decoded += encryptedPath[i]; // Odd length string
      }
    }
    return decoded;
  } else if (method.startsWith('circularly rotated left by')) {
    const rotation = parseInt(
      method.split('circularly rotated left by ')[1],
      10
    );
    return circularlyRotate(encryptedPath, rotation, 'left');
  } else if (method.startsWith('circularly rotated right by')) {
    const rotation = parseInt(
      method.split('circularly rotated right by ')[1],
      10
    );
    return circularlyRotate(encryptedPath, rotation, 'right');
  } else if (method.startsWith('encoded it with custom hex character set')) {
    const hexCharSet = method.split('custom hex character set ')[1];
    return decodeCustomHex(encryptedPath, hexCharSet);
  } else {
    throw new Error('Unknown encryption method');
  }
}

function decodeCustomHex(encryptedPath, hexCharSet) {
  if (hexCharSet.length !== 16) {
    throw new Error('Invalid hex character set length');
  }

  // Crear un mapa de caracteres personalizados a caracteres hexadecimales estándar
  const customToStandardHexMap = {};
  const standardHexDigits = '0123456789abcdef';

  for (let i = 0; i < hexCharSet.length; i++) {
    customToStandardHexMap[hexCharSet[i]] = standardHexDigits[i];
  }

  // Convertir la cadena codificada usando el mapa de conversión
  let standardHexString = '';
  for (let i = 0; i < encryptedPath.length; i++) {
    standardHexString += customToStandardHexMap[encryptedPath[i]] || '?';
  }

  // Convertir la cadena hexadecimal estándar a texto
  let decodedText = '';
  for (let i = 0; i < standardHexString.length; i += 2) {
    decodedText += String.fromCharCode(
      parseInt(standardHexString.slice(i, i + 2), 16)
    );
  }

  return decodedText;
}

function circularlyRotate(str, rotation, direction) {
  const length = str.length;
  if (length === 0) return str;
  const actualRotation = rotation % length; // Normalize rotation
  if (direction === 'left') {
    return str.slice(actualRotation) + str.slice(0, actualRotation);
  } else if (direction === 'right') {
    return str.slice(-actualRotation) + str.slice(0, -actualRotation);
  }
}

async function fetchNextChallenge(encryptedPath, method) {
  try {
    const decodedPath = decodePath(encryptedPath.split('k_')[1], method);
    const path = `task_${decodedPath.trim()}`;
    console.log('Fetching path:', path); // Log the path being fetched

    const response = await axios.get(`${baseUrl}/${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching next challenge:');
  }
}

async function main() {
  try {
    const initialChallenge = await fetchInitialChallenge();
    console.log('Initial challenge received:', initialChallenge);

    let currentChallenge = initialChallenge;

    while (currentChallenge) {
      const nextChallenge = await fetchNextChallenge(
        currentChallenge.encrypted_path,
        currentChallenge.encryption_method
      );
      console.log('Next challenge received:', nextChallenge);

      if (!nextChallenge?.encrypted_path) {
        console.log('No more challenges. Process complete.');
        break;
      }

      currentChallenge = nextChallenge;
    }
  } catch (error) {
    console.error('Failed to complete the challenge process');
  }
}

main();
