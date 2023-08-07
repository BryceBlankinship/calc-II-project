/**
 * @author Bryce Blankinship
 * github.com/BryceBlankinship
 * 
 * Using math.js to parse user-input expressions and replace "x" where necessary, then evaluate them
 * 
 * View the full project at https://github.com/BryceBlankinship/calc-II-project
 */

const math = require('mathjs');
const parser = math.parser();

/** 
 * @params (all methods)
 * fx = the function to integrate
 * a = the lower limit
 * b = the upper limit
 * n = precision (how many times we will perform the calculation)
 */

function calculateMidpoint(fx, a, b, n) {
    const deltaX = (b - a) / n;

    let area = 0;
    for (let i = a; i < b; i += deltaX) {
        parser.set('x', (i + (i + deltaX)) / 2);
        area += parser.evaluate(fx);
    }

    return area * deltaX;
}

function calculateTrapezoid(fx, a, b, n) {
    const deltaX = (b - a) / n;

    let area = 0;
    for (let i = a; i <= b; i += deltaX) {
        parser.set('x', i);

        if (i == a || i == b) {
            // first and last are just f(x)
            area += parser.evaluate(fx);
        } else {
            // everything in between is 2*f(x)
            area += (2 * parser.evaluate(fx));
        }
    }

    return area * (deltaX / 2);
}

function calculateSimpson(fx, a, b, n) {
    const deltaX = (b - a) / n;

    let area = 0;
    let count = 0;
    for (let i = a; i <= b; i += deltaX) {
        parser.set('x', i);

        /** 
         * Since i isn't the index of the sequence,
         * I have to use a counter and check if thats even
         * theres probably a better way but i've already spent too much time on this :|
         */

        if (i == a || i == b) {
            // first and last are just f(x)
            area += parser.evaluate(fx);
        } else if (count % 2 == 1) {
            // modulus checks if number is even, if it is then its times 4
            area += (4 * parser.evaluate(fx));
        } else {
            // otherwise it must be odd (and not first), so times 2
            area += (2 * parser.evaluate(fx))
        }

        count++;
    }

    return area * (deltaX / 3);
}

module.exports = {
    calculateMidpoint,
    calculateTrapezoid,
    calculateSimpson
}