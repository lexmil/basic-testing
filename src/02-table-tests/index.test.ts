// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  // Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Subtract
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  // Divide
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  // Multiply
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  // Exponentiate
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

const invalidTestCases = [
  { a: '1', b: 2, action: Action.Add }, // a not a number
  { a: 1, b: null, action: Action.Multiply }, // b not a number
  { a: 1, b: 2, action: '%' }, // invalid action
  { a: {}, b: [], action: Action.Subtract }, // a and b invalid
  { a: 2, b: 3, action: undefined }, // missing action
];

describe('simpleCalculator', () => {
  describe('simpleCalculator — valid inputs', () => {
    test.each(testCases)(
      'calculates $a $action $b = $expected',
      ({ a, b, action, expected }) => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      },
    );
  });

  describe('simpleCalculator — invalid inputs', () => {
    test.each(invalidTestCases)(
      'returns null for invalid input: %o',
      (input) => {
        expect(simpleCalculator(input)).toBeNull();
      },
    );
  });
});
