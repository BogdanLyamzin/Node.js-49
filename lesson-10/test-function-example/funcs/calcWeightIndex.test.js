/*
1. Given weight in kg and height in metr and return weight / (height * height) fixed 2.
2. If given invalid arguments, throw error with correct message.

90, 1.9 => 24.93
1.9, 90 => error 'weight first argument and height - second argument'
90 => error 'weight and height required'
 => error 'weight and height required'
"90", 1.9 - error 'weight and height must be number'
*/

const calcWeightIndex = require("./calcWeightIndex");

describe("test calcWeightIndex function", ()=> {
    test("90, 1.9 => 24.93", ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);
        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    return this.result === value;
                }
            }
        }
        */
    })

    test("1.9, 90 => error 'weight first argument and height - second argument'", ()=> {
        expect(() => calcWeightIndex(1.9, 90)).toThrow('weight first argument and height - second argument')
    })

    test(" => error 'weight and height required'", ()=> {
        expect(() => calcWeightIndex()).toThrow('weight and height required')
    })

    it("'90', 1.9 - error 'weight and height must be number'", ()=> {
        expect(() => calcWeightIndex('90', 1.9)).toThrow('weight and height must be number')
    })
})