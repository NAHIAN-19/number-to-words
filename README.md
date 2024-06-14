# convert-number-to-words

[![npm version](https://badge.fury.io/js/convert-number-to-words.svg)](https://badge.fury.io/js/convert-number-to-words)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-blue.svg)](https://www.typescriptlang.org/)

`convert-number-to-words` is a utility to convert numbers to English words, including support for decimal points. This package is perfect for applications requiring number-to-text conversion, such as check-writing software, text-based games, or educational tools.

## Features

- Converts integers to English words.
- Supports decimal points.
- Handles negative numbers.
- Provides easy-to-use TypeScript definitions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package via npm:

````bash
npm install convert-number-to-words
Or using yarn:
yarn add convert-number-to-words

## Usage

Import and use the numberToWords function in your project:

```javascript
const { numberToWords } = require('convert-number-to-words');

console.log(numberToWords(123)); // Output: "one hundred twenty three"
console.log(numberToWords(-456.78)); // Output: "negative four hundred fifty six point seven eight"
console.log(numberToWords(0.123)); // Output: "zero point one two three"
````

```typescript
import { numberToWords } from 'convert-number-to-words';

console.log(numberToWords(123)); // Output: "one hundred twenty three"
console.log(numberToWords(-456.78)); // Output: "negative four hundred fifty six point seven eight"
console.log(numberToWords(0.123)); // Output: "zero point one two three"
```

## Examples

Here are some examples demonstrating the use of convert-number-to-words:

### Basic Usage

```typescript
import { numberToWords } from 'convert-number-to-words';

const num = 1234;
console.log(numberToWords(num)); // Output: "one thousand two hundred thirty four"
```

### Handling Decimals

```typescript
import { numberToWords } from 'convert-number-to-words';

const num = 45.67;
console.log(numberToWords(num)); // Output: "forty five point six seven"
```

### Negative Numbers

```typescript
import { numberToWords } from 'convert-number-to-words';

const num = -789;
console.log(numberToWords(num)); // Output: "negative seven hundred eighty nine"
```

## API

**`numberToWords(num: number): string`**

Converts a number to its English word representation.

- **Parameters:**
  - **`num`: `number`** - The number to convert.
  - **Returns: `string`** - The English word representation of the number.

## Examples

```typescript
import { numberToWords } from 'convert-number-to-words';

// Convert a positive number
console.log(numberToWords(456)); // Output: "four hundred fifty six"

// Convert a negative number
console.log(numberToWords(-789.12)); // Output: "negative seven hundred eighty nine point one two"

// Convert zero
console.log(numberToWords(0)); // Output: "zero"
```

## Contributing

Contributions are welcome! For feature requests and bug reports, please [submit an issue](https://github.com/say-m/convert-number-to-words/issues). If you would like to contribute code, please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- Mohammad Sayem - [Github](https://github.com/say-m)

## Acknowledgments

- Inspired by various number-to-words conversion libraries and open-source projects.