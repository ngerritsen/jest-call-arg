const {
  callArg,
  callArgWith,
  callArgOnWith,
  callEventHandler,
  callEventHandlerWith
} = require('./index');

let callback, fn;

beforeEach(() => {
  callback = jest.fn();
  fn = jest.fn();
});

describe('callArg()', () => {
  test('Calls the callback arguments.', () => {
    fn(callback);
    fn(callback);

    callArg(fn);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('Calls the callback argument at the specified position.', () => {
    fn('Some data', callback);

    callArg(fn, 1);

    expect(callback).toHaveBeenCalled();
  });

  test('Throws when the argument is not a callback.', () => {
    fn('x');

    expect(() => {
      callArg(fn);
    }).toThrow('callArg(): Expected argument at position 0 to be of type Function.');
  });

  test('Throws when the mockFn is not an actual Jest mock function.', () => {
    const regularFn = function () {};

    expect(() => {
      callArg(regularFn);
    }).toThrow('The provided mockFn is not a function mocked by Jest.');
  });
});

describe('callArgWith()', () => {
  test('Calls the callback argument with the provided arguments.', () => {
    fn(callback);

    callArgWith(fn, 0, 'a', 'b');

    expect(callback).toBeCalledWith('a', 'b');
  });
});

describe('callArgOnWith()', () => {
  test('Calls the callback argument with the provided context.', () => {
    let context = null;
    const testContext = {};

    function callback() {
      context = this;
    }

    fn(callback);

    callArgOnWith(fn, 0, testContext);

    expect(context).toBe(testContext);
  });
});

describe('callEventHandler()', () => {
  test('When the eventName matches, calls the callback at position 1.', () => {
    const mockedElement = { addEventListener: jest.fn() };
    const callback = jest.fn();

    mockedElement.addEventListener('click', callback);
    mockedElement.addEventListener('change', callback);

    callEventHandler(mockedElement.addEventListener, 'click');

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('callEventHandlerWith()', () => {
  test('When the eventName matches, calls the callback at position 1 with the provided arguments.', () => {
    const mockedElement = { addEventListener: jest.fn() };
    const callback = jest.fn();

    mockedElement.addEventListener('click', callback);
    mockedElement.addEventListener('change', callback);

    callEventHandlerWith(mockedElement.addEventListener, 'click', 1, 2);

    expect(callback).toHaveBeenCalledWith(1, 2);
  });
});