# TODO

1. Install dependencies.
2. Complete both excercises with best practices and taking performance into consideration.
3. All tests must pass.
4. Create a repository in your github with the solution.

# 1- Array map challenge

Complete in the most efficient way the functions customMap and customFilter in arrayMap.test.js.
You CAN NOT use filter and/or map within those functions.

# 2- Count positive bits

Given an integer, n, we want to know the following:

1. How many 1-bits are in its binary representation?
2. Let's say n's binary representation has k significant bits indexed from 1 to k. What are the respective positions (i.e., in ascending order) of each 1-bit?
3. The performance is really important in this challenge.

### Example

Complete countBids function in bitCounter.test.js (Obviously you can use helper functions if needed). It has one parameter: an integer, n. It must return an integer array with the following 1 + k values:

- The first index (0) must contain the total number of 1 bits in n's binary representation.
- The subsequent indices must contain the respective positions of the one-indexed 1-bits in n's binary representation.

### Output format

Return an array of integers where the first element is the total number of 1-bits in n's binary representation and the subsequent elements are the respective one-indexed locations of each 1-bit from most to least significant.

### Tips

The integer n = 137 converts to binary.

| 1   | 0   | 0   | 0   | 1   | 0   | 0   | 1   |
| --- | --- | --- | --- | --- | --- | --- | --- |

Reverse the binary representation.

| 1   | 0   | 0   | 1   | 0   | 0   | 0   | 1   |
| --- | --- | --- | --- | --- | --- | --- | --- |

Count number of positive bits: 3
Search the position: 0, 3, 7
Return [ 3, 0, 3, 7 ]

# 🔐 Cipher Sprint Challenge

Solución a un desafío de criptografía en tiempo real donde se reciben mensajes codificados que deben ser decodificados utilizando diferentes métodos de cifrado para avanzar al siguiente nivel.

## 📋 Descripción

Challenge técnico que consiste en resolver múltiples niveles de cifrado en cascada. Cada mensaje decodificado revela el camino al siguiente nivel, implementando diversos algoritmos de descifrado: Base64, rotación circular, intercambio de caracteres y sistemas hexadecimales personalizados.

## 🎯 Objetivo del Challenge

Decodificar mensajes cifrados usando diferentes técnicas criptográficas para avanzar a través de múltiples niveles hasta completar el desafío.

## 🛠️ Tecnologías

- **Runtime:** Node.js
- **HTTP Client:** Axios
- **Encoding:** Base64 (atob)
- **Lenguaje:** JavaScript (ES6)

## 🔓 Métodos de Cifrado Implementados

### 1. Nothing (Sin cifrado)
```javascript
// El mensaje viene en texto plano
decodedPath = encryptedPath;
```

### 2. Base64 Encoding
```javascript
// Decodificación estándar Base64
decodedPath = atob(encryptedPath);
```

### 3. Character Swap (Intercambio de pares)
```javascript
// Intercambia cada par de caracteres
// "abcd" → "badc"
decodedPath = encryptedPath.replace(/(.)(.)/g, '$2$1');
```

### 4. Circular Rotation (Rotación circular)
```javascript
// Rota la cadena N posiciones a izquierda/derecha
// "abcdef" rotado 2 a la derecha → "efabcd"
function circularlyRotate(str, rotation, direction) {
  const actualRotation = rotation % str.length;
  if (direction === 'right') {
    return str.slice(-actualRotation) + str.slice(0, -actualRotation);
  } else {
    return str.slice(actualRotation) + str.slice(0, actualRotation);
  }
}
```

### 5. Custom Hex Encoding (Hexadecimal personalizado)
```javascript
// Usa un set de caracteres hex personalizado
// Mapea caracteres custom → hex estándar → texto
function decodeCustomHex(encryptedPath, hexCharSet) {
  // 1. Crear mapeo de custom a estándar
  const customToStandardHexMap = {};
  const standardHexDigits = '0123456789abcdef';
  
  // 2. Convertir a hex estándar
  let standardHexString = '';
  for (let i = 0; i < encryptedPath.length; i++) {
    standardHexString += customToStandardHexMap[encryptedPath[i]];
  }
  
  // 3. Convertir hex a texto
  let decodedText = '';
  for (let i = 0; i < standardHexString.length; i += 2) {
    decodedText += String.fromCharCode(
      parseInt(standardHexString.slice(i, i + 2), 16)
    );
  }
  
  return decodedText;
}
```

## 🚀 Uso

```bash
# Instalar dependencias
npm install

# Ejecutar el challenge
node index.js
```

## 📊 Flujo del Programa

```
1. Fetch inicial → Obtener primer desafío
   ↓
2. Decodificar mensaje usando método especificado
   ↓
3. Usar path decodificado para siguiente request
   ↓
4. Repetir hasta completar todos los niveles
   ↓
5. Mostrar mensaje final de éxito
```

## 📡 API Endpoints

### Obtener Challenge Inicial
```http
GET https://ciphersprint.pulley.com/{email}
```

### Obtener Siguiente Nivel
```http
GET https://ciphersprint.pulley.com/task_{decodedPath}
```

### Respuesta del API
```json
{
  "encrypted_path": "dGFza19uZXh0X2xldmVs",
  "encryption_method": "encoded as base64"
}
```

## 🎮 Ejemplo de Ejecución

```bash
$ node index.js

Fetch Initial Challenge: 45.234ms
Initial challenge received: {
  encrypted_path: 'task_abc123',
  encryption_method: 'nothing'
}

Decoding time: 0.123ms
Processing Challenge: 152.456ms
Next challenge received: {
  encrypted_path: 'dGFza19kZWY0NTY=',
  encryption_method: 'encoded as base64'
}

Decoding time: 0.234ms
Processing Challenge: 145.789ms
Next challenge received: {
  encrypted_path: 'tkas_hgi879',
  encryption_method: 'swapped every pair of characters'
}

...

No more challenges. Process complete.
```

## ⚡ Optimizaciones

- **Timing logs:** Medición de rendimiento en cada paso
- **Error handling:** Manejo robusto de errores de red y decodificación
- **Validaciones:** Verificación de longitud en hex sets y rotaciones
- **Modular design:** Cada método de cifrado en función separada

## 🧩 Estructura del Código

```javascript
main()
  ├── fetchInitialChallenge()    // Request inicial
  │
  └── while (hasMoreChallenges)
        ├── decodePath()          // Selector de método
        │   ├── nothing()
        │   ├── decodeBase64()
        │   ├── swapCharacters()
        │   ├── circularlyRotate()
        │   └── decodeCustomHex()
        │
        └── fetchNextChallenge()  // Request siguiente nivel
```

## 🔍 Debugging

El código incluye logs detallados:

```javascript
console.time('Fetch Initial Challenge');
console.timeEnd('Fetch Initial Challenge');

console.time('Decoding time');
console.timeEnd('Decoding time');

console.time('Processing Challenge');
console.timeEnd('Processing Challenge');
```

## 🎯 Estado del Desafío

**Progreso:** Parcialmente completado

**Métodos implementados:**
- ✅ Nothing
- ✅ Base64 encoding
- ✅ Character swap
- ✅ Circular rotation (left/right)
- ✅ Custom hex character set

**Pendiente:**
- Completar todos los niveles del challenge
- Posibles métodos adicionales no documentados

## 🚧 Mejoras Futuras

- [ ] Completar todos los niveles
- [ ] Agregar más métodos de cifrado
- [ ] Implementar retry logic para fallos de red
- [ ] Cache de niveles completados
- [ ] Modo verbose para debugging
- [ ] Tests unitarios para cada método

## 💡 Aprendizajes

Este challenge ayudó a comprender:
- Diferentes técnicas de cifrado clásicas
- Manipulación de strings en JavaScript
- Codificación Base64 y Hexadecimal
- Algoritmos de rotación y transposición
- Manejo de APIs asíncronas con async/await

## 👤 Autor

**Javier García Magaldi**
- GitHub: [@maniacdi](https://github.com/maniacdi)
- Portfolio: [magaldidev.com](https://magaldidev.com)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Challenge en progreso** - Trabajo continuo en resolver niveles adicionales
