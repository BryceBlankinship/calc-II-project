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

}

function calculateSimpson(fx, a, b, n) {

}

module.exports = {
    calculateMidpoint,
    calculateTrapezoid,
    calculateSimpson
}