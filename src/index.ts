export function numberToWords(num: number, to: string = 'number'): string {
  function convertBelowThousand(n: number): string {
    const belowTwenty: string[] = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const tens: string[] = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];

    if (n < 20) return belowTwenty[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? ' ' + belowTwenty[n % 10] : '')
      );
    return (
      belowTwenty[Math.floor(n / 100)] +
      ' hundred' +
      (n % 100 !== 0 ? ' ' + convertBelowThousand(n % 100) : '')
    );
  }

  function convertToWords(n: number): string {
    if (n === 0) return 'zero';
    if (n < 0) return 'negative ' + convertToWords(-n);

    const thousands: string[] = [
      '',
      'thousand',
      'million',
      'billion',
      'trillion',
    ];
    let word: string = '';
    let i: number = 0;

    while (n > 0) {
      if (n % 1000 !== 0) {
        word =
          convertBelowThousand(n % 1000) +
          (thousands[i] ? ' ' + thousands[i] : '') +
          ' ' +
          word;
      }
      n = Math.floor(n / 1000);
      i++;
    }

    return word.trim();
  }

  function convertFractionalPart(fracStr: string): string {
    if (fracStr.length === 0) return '';
    let fractionalWord: string = 'point';
    for (const digit of fracStr) {
      fractionalWord += ' ' + convertToWords(parseInt(digit));
    }
    return fractionalWord;
  }

  function convertYear(n: number): string {
    if(n % 1000 === 0) {
      return convertToWords(n);
    }
    else if (n < 1000) {
      const hundreds = Math.floor(n / 100);
      const remainder = n % 100;
      if (remainder === 0) {
        return convertBelowThousand(hundreds) + ' hundred';
      } else if (remainder < 10) {
        return convertBelowThousand(hundreds) + ' oh ' + convertBelowThousand(remainder);
      } else {
        return convertBelowThousand(hundreds) + ' ' + convertBelowThousand(remainder);
      }
    }
    const firstTwoDigits = Math.floor(n / 100);
    const lastTwoDigits = n % 100;
    if (lastTwoDigits === 0) {
      return convertBelowThousand(firstTwoDigits) + ' hundred';
    }
    return convertBelowThousand(firstTwoDigits) + ' ' + convertBelowThousand(lastTwoDigits);
  }

  const numParts: string[] = num.toString().split('.');
  const integerPart: number = Math.floor(Math.abs(parseFloat(numParts[0])));
  const fractionalPart: string = numParts.length > 1 ? numParts[1] : '';

  let result: string;
  if (to === 'year') {
    result = convertYear(integerPart);
  } else {
    result = convertToWords(integerPart);
    if (fractionalPart.length > 0) {
      result += ' ' + convertFractionalPart(fractionalPart);
    }
  }

  if (num < 0 && to !== 'year') {
    result = 'negative ' + result;
  }

  return result;
}

// Example Usage:
console.log(numberToWords(1984, 'year')); // Output: "nineteen eighty four"
console.log(numberToWords(2023, 'year')); // Output: "twenty twenty three"
console.log(numberToWords(2000, 'year')); // Output: "two thousand"
console.log(numberToWords(1900, 'year')); // Output: "nineteen hundred"
console.log(numberToWords(1800, 'year')); // Output: "eighteen hundred"
console.log(numberToWords(2100, 'year')); // Output: "twenty one hundred"
console.log(numberToWords(705, 'year'));  // Output: "seven oh five"
console.log(numberToWords(785, 'year'));  // Output: "seven eighty five"

console.log(numberToWords(0)); // Output: "zero"
console.log(numberToWords(1234.56)); // Output: "one thousand two hundred thirty-four point five six"
console.log(numberToWords(-567)); // Output: "negative five hundred sixty seven"
