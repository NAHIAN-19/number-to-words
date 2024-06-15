"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToWords = void 0;
function numberToWords(num, to) {
    if (to === void 0) { to = 'number'; }
    function convertBelowThousand(n) {
        var belowTwenty = [
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
        var tens = [
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
        if (n < 20)
            return belowTwenty[n];
        if (n < 100)
            return (tens[Math.floor(n / 10)] +
                (n % 10 !== 0 ? ' ' + belowTwenty[n % 10] : ''));
        return (belowTwenty[Math.floor(n / 100)] +
            ' hundred' +
            (n % 100 !== 0 ? ' ' + convertBelowThousand(n % 100) : ''));
    }
    function convertToWords(n) {
        if (n === 0)
            return 'zero';
        if (n < 0)
            return 'negative ' + convertToWords(-n);
        var thousands = [
            '',
            'thousand',
            'million',
            'billion',
            'trillion',
        ];
        var word = '';
        var i = 0;
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
    function convertFractionalPart(fracStr) {
        if (fracStr.length === 0)
            return '';
        var fractionalWord = 'point';
        for (var _i = 0, fracStr_1 = fracStr; _i < fracStr_1.length; _i++) {
            var digit = fracStr_1[_i];
            fractionalWord += ' ' + convertToWords(parseInt(digit));
        }
        return fractionalWord;
    }
    function convertYear(n) {
        if (n % 1000 === 0) {
            return convertToWords(n);
        }
        else if (n < 1000) {
            var hundreds = Math.floor(n / 100);
            var remainder = n % 100;
            if (remainder === 0) {
                return convertBelowThousand(hundreds) + ' hundred';
            }
            else if (remainder < 10) {
                return convertBelowThousand(hundreds) + ' oh ' + convertBelowThousand(remainder);
            }
            else {
                return convertBelowThousand(hundreds) + ' ' + convertBelowThousand(remainder);
            }
        }
        var firstTwoDigits = Math.floor(n / 100);
        var lastTwoDigits = n % 100;
        if (lastTwoDigits === 0) {
            return convertBelowThousand(firstTwoDigits) + ' hundred';
        }
        return convertBelowThousand(firstTwoDigits) + ' ' + convertBelowThousand(lastTwoDigits);
    }
    var numParts = num.toString().split('.');
    var integerPart = Math.floor(Math.abs(parseFloat(numParts[0])));
    var fractionalPart = numParts.length > 1 ? numParts[1] : '';
    var result;
    if (to === 'year') {
        result = convertYear(integerPart);
    }
    else {
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
exports.numberToWords = numberToWords;
// Example Usage:
console.log(numberToWords(1984, 'year')); // Output: "nineteen eighty four"
console.log(numberToWords(2023, 'year')); // Output: "twenty twenty three"
console.log(numberToWords(2000, 'year')); // Output: "two thousand"
console.log(numberToWords(1900, 'year')); // Output: "nineteen hundred"
console.log(numberToWords(1800, 'year')); // Output: "eighteen hundred"
console.log(numberToWords(2100, 'year')); // Output: "twenty one hundred"
console.log(numberToWords(705, 'year')); // Output: "seven oh five"
console.log(numberToWords(785, 'year')); // Output: "seven eighty five"
console.log(numberToWords(0)); // Output: "zero"
console.log(numberToWords(1234.56)); // Output: "one thousand two hundred thirty-four point five six"
console.log(numberToWords(-567)); // Output: "negative five hundred sixty seven"
