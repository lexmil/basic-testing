// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

import { random } from 'lodash';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(50);
    const to = getBankAccount(100);
    expect(() => from.transfer(60, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(30);
    expect(account.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    const from = getBankAccount(200);
    const to = getBankAccount(100);
    from.transfer(50, to);
    expect(from.getBalance()).toBe(150);
    expect(to.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 42)
      .mockImplementationOnce(() => 1);

    const account = getBankAccount(0);
    const result = await account.fetchBalance();
    expect(result).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 75)
      .mockImplementationOnce(() => 1);

    const account = getBankAccount(10);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(75);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 33)
      .mockImplementationOnce(() => 0);

    const account = getBankAccount(10);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
