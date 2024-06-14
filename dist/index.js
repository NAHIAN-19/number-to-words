"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToWords = void 0;
function numberToWords(num) {
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
    var numParts = num.toString().split('.');
    var integerPart = Math.floor(Math.abs(parseFloat(numParts[0])));
    var fractionalPart = numParts.length > 1 ? numParts[1] : '';
    var result = convertToWords(integerPart);
    if (fractionalPart.length > 0) {
        result += ' ' + convertFractionalPart(fractionalPart);
    }
    if (num < 0) {
        result = 'negative ' + result;
    }
    return result;
}
exports.numberToWords = numberToWords;
