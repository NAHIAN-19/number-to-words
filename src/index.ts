export function numberToWords(num: number): string {
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

  const numParts: string[] = num.toString().split('.');
  const integerPart: number = Math.floor(Math.abs(parseFloat(numParts[0])));
  const fractionalPart: string = numParts.length > 1 ? numParts[1] : '';

  let result: string = convertToWords(integerPart);
  if (fractionalPart.length > 0) {
    result += ' ' + convertFractionalPart(fractionalPart);
  }

  if (num < 0) {
    result = 'negative ' + result;
  }

  return result;
}
