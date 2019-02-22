import filterAction from './filterActions';
import SET_FILTER from '../constants/filterConstants';

const dispatch = jest.fn(data => data);

describe('fliterAction', () => {
  it('should call the filter action successfully with the correct payload', () => {
    const func = filterAction();
    const action = func(dispatch);

    expect(action.type).toEqual(SET_FILTER);
    expect(dispatch).toHaveBeenCalled();
  });
});
