export function numberToWords(num: number, options?: { to?: string }): string {
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

  function convertCurrency(n: number): string {
    const integerPart: number = Math.floor(n);
    const fractionalPart: number = Math.round((n - integerPart) * 100);
    let result = convertToWords(integerPart) + ' dollars';
    if (fractionalPart > 0) {
      result += ' and ' + convertToWords(fractionalPart) + ' cents';
    }
    return result;
  }

  const numParts: string[] = num.toString().split('.');
  const integerPart: number = Math.floor(Math.abs(parseFloat(numParts[0])));
  const fractionalPart: string = numParts.length > 1 ? numParts[1] : '';

  const to = options?.to || 'number';

  let result: string;
  if (to === 'year') {
    result = convertYear(integerPart);
  } else if (to === 'currency') {
    result = convertCurrency(num);
  } else {
    result = convertToWords(integerPart);
    if (fractionalPart.length > 0) {
      result += ' ' + convertFractionalPart(fractionalPart);
    }
  }

  if (num < 0 && to !== 'year' && to !== 'currency') {
    result = 'negative ' + result;
  }

  return result;
}

// Example Usage:
console.log(numberToWords(1984, { to: 'year' })); // Output: "nineteen eighty four"
console.log(numberToWords(2023, { to: 'year' })); // Output: "twenty twenty three"
console.log(numberToWords(2000, { to: 'year' })); // Output: "two thousand"
console.log(numberToWords(1900, { to: 'year' })); // Output: "nineteen hundred"
console.log(numberToWords(1800, { to: 'year' })); // Output: "eighteen hundred"
console.log(numberToWords(2100, { to: 'year' })); // Output: "twenty one hundred"
console.log(numberToWords(705, { to: 'year' }));  // Output: "seven oh five"
console.log(numberToWords(785, { to: 'year' }));  // Output: "seven eighty five"

console.log(numberToWords(0)); // Output: "zero"
console.log(numberToWords(1234.56)); // Output: "one thousand two hundred thirty-four point five six"
console.log(numberToWords(-567)); // Output: "negative five hundred sixty seven"
console.log(numberToWords(1234.56, { to: 'currency' })); // Output: "one thousand two hundred thirty-four dollars and fifty-six cents"
console.log(numberToWords(1000, { to: 'currency' })); // Output: "one thousand dollars"
console.log(numberToWords(1000.75, { to: 'currency' })); // Output: "one thousand dollars and seventy-five cents"
