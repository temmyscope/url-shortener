import { generateShortCode, getRandomIntFromRange } from '../../src/utils/helpers';


describe('get Random Int From Range', () => {
    it('should resolve with integer between the range of values given to the function', async () => {
        const response: number = getRandomIntFromRange(5, 8);
        expect(response).toBeGreaterThanOrEqual(5);
        expect(response).toBeLessThanOrEqual(8);
        
        expect([5, 6, 7, 8]).toContain(response);
    });
});

describe('generate Short Code', () => {
    it('should resolve with string of length between the range of numbers given', async () => {
        const response = generateShortCode(5, 8);
        let strLength: number = response.length;
        //check to make sure string length is between the range of 5-8
        expect([5,6,7,8]).toContain(strLength);
    });
});
