import { generate } from 'randomized-string';

function getRandomIntFromRange(min: number, max: number) { 
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

const generateShortCode = (minLength: number, maxLength: number) => {
    let length: number = getRandomIntFromRange(minLength, maxLength);

    return generate({
        charset: "hex", lowerCaseOnly: false, length, symbolsOnly: false
    });
}

export { generateShortCode, getRandomIntFromRange }