# Jest call arg

Jest call arg is a set of utility functions to call callbacks passed to mocked functions. This is handy for testing code that deals with mocked functions that take callbacks. It is partly inspired by sinon's callArg fucntionality.

### Installation

`npm install jest-call-arg --save-dev`

### Usage

Import in the test file you want to use it:

CommonJS:

```js
const { callArg, callArgWith } = require('jest-call-arg');
```

ES6 Modules

```js
import { callArg, callArgWith } from 'jest-call-arg';
```

### `callArg(mockFn, [position=0])`

Calls the callback argument at the given position (default is 0);

```js
const mockFn = jest.fn();
const callback = jest.fn();

mockFn('test', callback);

callArg(mockFn, 1);

expect(callback).toHaveBeenCalled(); // Passes
```

### `callArgWith(mockFn, [position=0], [arg1, arg2, ...])`

Same as `callArg` but with optional arguments to pass to the callback.

```js
const mockFn = jest.fn();
const callback = jest.fn();

mockFn(callback);

callArgWith(mockFn, 0, 'Hello world');

expect(callback).toHaveBeenCalledWith('Hello world'); // Passes
```

### `callArgOnWith(mockFn, [position=0], context, [arg1, arg2, ...])`

Same as `callArgWith` but with the ability to override the `this` context for the callback.

### `callEventHandler(mockFn, [eventName])`

When the argument at position 0 matches the event name, calls the callback argument at position 1.

```js
const mockedElement = { addEventListener: jest.fn() };
const callback = jest.fn();

mockedElement.addEventListener('click', callback);
mockedElement.addEventListener('change', callback);

callEventHandler(mockedElement.addEventListener, 'click');

expect(callback).toHaveBeenCalledTimes(1); // Passes
```

### `callEventHandlerWith(mockFn, [eventName], [arg1, arg2, ....])`

Same as `callEventHandler`  but then with the ability to pass arguments to the callback.
