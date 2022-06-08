import add from '../example';

describe('add function', () => {
    it('adds up two integers', () => {
        expect(add(1, 2)).toEqual(3);
    });
});