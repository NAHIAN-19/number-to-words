"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToWords = void 0;
function numberToWords(num, options) {
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
    function convertCurrency(n) {
        var integerPart = Math.floor(n);
        var fractionalPart = Math.round((n - integerPart) * 100);
        var result = convertToWords(integerPart) + ' dollars';
        if (fractionalPart > 0) {
            result += ' and ' + convertToWords(fractionalPart) + ' cents';
        }
        return result;
    }
    var numParts = num.toString().split('.');
    var integerPart = Math.floor(Math.abs(parseFloat(numParts[0])));
    var fractionalPart = numParts.length > 1 ? numParts[1] : '';
    var to = (options === null || options === void 0 ? void 0 : options.to) || 'number';
    var result;
    if (to === 'year') {
        result = convertYear(integerPart);
    }
    else if (to === 'currency') {
        result = convertCurrency(num);
    }
    else {
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
exports.numberToWords = numberToWords;
// Example Usage:
console.log(numberToWords(1984, { to: 'year' })); // Output: "nineteen eighty four"
console.log(numberToWords(2023, { to: 'year' })); // Output: "twenty twenty three"
console.log(numberToWords(2000, { to: 'year' })); // Output: "two thousand"
console.log(numberToWords(1900, { to: 'year' })); // Output: "nineteen hundred"
console.log(numberToWords(1800, { to: 'year' })); // Output: "eighteen hundred"
console.log(numberToWords(2100, { to: 'year' })); // Output: "twenty one hundred"
console.log(numberToWords(705, { to: 'year' })); // Output: "seven oh five"
console.log(numberToWords(785, { to: 'year' })); // Output: "seven eighty five"
console.log(numberToWords(0)); // Output: "zero"
console.log(numberToWords(1234.56)); // Output: "one thousand two hundred thirty-four point five six"
console.log(numberToWords(-567)); // Output: "negative five hundred sixty seven"
console.log(numberToWords(1234.56, { to: 'currency' })); // Output: "one thousand two hundred thirty-four dollars and fifty-six cents"
console.log(numberToWords(1000, { to: 'currency' })); // Output: "one thousand dollars"
console.log(numberToWords(1000.75, { to: 'currency' })); // Output: "one thousand dollars and seventy-five cents"
