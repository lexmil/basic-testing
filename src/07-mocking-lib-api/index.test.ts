// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    getMock = jest.fn().mockResolvedValue({ data: { message: 'success' } });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as unknown as AxiosInstance);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/todos/1');
    jest.runAllTimers();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const promise = throttledGetDataFromApi('/todos/42');
    jest.runAllTimers();
    await promise;

    expect(getMock).toHaveBeenCalledWith('/todos/42');
  });

  test('should return response data', async () => {
    const promise = throttledGetDataFromApi('/todos/99');
    jest.runAllTimers();

    const result = await promise;
    expect(result).toEqual({ message: 'success' });
  });
});
