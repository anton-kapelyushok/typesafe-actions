import { validateActionType } from './validation';

/** HELPERS */

const expectToThrowError = (cb: () => void, expectedMessage: string) => {
  try {
    cb();
    expect(false).toBeTruthy();
  } catch ({ message }) {
    expect(message).toEqual(expectedMessage);
  }
};

const expectNotToThrowError = (cb: () => void) => {
  try {
    cb();
  } catch (err) {
    expect(false).toBeTruthy();
  }
};

/** TESTS */

describe('utils.validateActionType', () => {
  it('throws an error when no action is given', () =>
    expectToThrowError(() => validateActionType(null), 'Argument 1 is empty'));

  const INVALID_TYPE =
    'Argument 1 is invalid, it should be of type: string | symbol';

  it('throws an error when number is given as an action type', () =>
    expectToThrowError(() => validateActionType(4), INVALID_TYPE));

  it('throws an error when object is given as an action type', () =>
    expectToThrowError(() => validateActionType({}), INVALID_TYPE));

  it('throws no error when symbol is given', () =>
    expectNotToThrowError(() => validateActionType('FOO' as 'FOO')));

  it('throws no error when string is given', () =>
    expectNotToThrowError(() => validateActionType('FOO' as string)));
});
