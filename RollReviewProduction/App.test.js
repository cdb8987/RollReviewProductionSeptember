import * as functions from './Functions/FAKEfunctions'

console.log(functions.sampleTestFunction())

test('sample test', () => {
  expect(functions.sampleTestFunction()).toBe('the sky is blue');
});

test('sort array working', ()=>{expect(String(functions.sortArr(['d', 'b', 'c', 'a']))).toBe(String(['a', 'b', 'c', 'd']))} )