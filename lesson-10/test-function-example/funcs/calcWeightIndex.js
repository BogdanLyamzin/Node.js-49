const calcWeightIndex = (weight, height) => {
    if(weight === undefined || height === undefined) {
        throw new Error('weight and height required')
    }

    if(typeof weight !== "number" || typeof height !== "number") {
        throw new Error('weight and height must be number')
    }

    if(height > weight) {
        throw new Error('weight first argument and height - second argument')
    }

    const result = weight / (height ** 2);

    return Number(result.toFixed(2));
}

module.exports = calcWeightIndex;