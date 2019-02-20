import RESTClient from './RESTClient';
import authService from './authService';

authService.setUser({});

describe('RESTClient', () => {
  it('rejects the wrong HTTP types', () => {
    const promise = RESTClient.sendQuery('a', 'ADF');
    expect(promise).rejects.toEqual(new Error('Unsupported type'));
  });

  it('shall fetch data', () => {
    const spyedFetchedData = jest.spyOn(RESTClient, 'fetchData');
    RESTClient.sendQuery('a', 'GET');
    expect(spyedFetchedData).toHaveBeenCalled();
    spyedFetchedData.mockRestore();
  });
});
