'use strict';

/**
 * @param {Function}  mockFn
 * @param {number}    [position=0]
 */
function callArg(mockFn, position) {
  _callCallback('callArg', mockFn, position, this);
}

/**
 * @param {Function}  mockFn
 * @param {number}    [position=0]
 * @param {*}         [...args]
 */
function callArgWith(mockFn, position = 0, ...args) {
  _callCallback({
    utilName: 'callArgWith',
    mockFn,
    position,
    context: this,
    args
  });
}

/**
 * @param {Function}  mockFn
 * @param {number}    [position=0]
 * @param {*}         context
 * @param {*}         [...args]
 */
function callArgOnWith(mockFn, position = 0, context, ...args) {
  _callCallback({
    utilName: 'callArgOnWith',
    mockFn,
    position,
    context,
    args
  });
}

/**
 * @param {Function}  mockFn
 * @param {string}    eventName
 */
function callEventHandler(mockFn, eventName) {
  _callCallback({
    utilName: 'callEventHandler',
    mockFn,
    eventName,
    position: 1,
    context: this
  });
}

/**
 * @param {Function}  mockFn
 * @param {string}    eventName
 * @param {*}         [...args]
 */
function callEventHandlerWith(mockFn, eventName, ...args) {
  _callCallback({
    utilName: 'callEventHandler',
    mockFn,
    eventName,
    position: 1,
    args,
    context: this
  });
}

/**
 * @param {Object}    data
 * @property {string}    utilName
 * @property {Function}  mockFn
 * @property {number}    [position=0]
 * @property {*}         context
 * @property {Array}     [args]
 * @property {string}    [eventName]
 */
function _callCallback({
  utilName,
  mockFn,
  position = 0,
  context,
  args = [],
  eventName
}) {
  if (!jest.isMockFunction(mockFn)) {
    throw new Error(`${utilName}(): The provided mockFn is not a function mocked by Jest.`);
  }

  mockFn.mock.calls.forEach((call) => {
    if (eventName && eventName !== call[0]) {
      return;
    }

    const callback = call[position];

    if (typeof callback !== 'function') {
      throw new TypeError(`${utilName}(): Expected argument at position ${position} to be of type Function.`);
    }

    callback.call(context, ...args);
  });
}

module.exports = {
  callArg,
  callArgWith,
  callArgOnWith,
  callEventHandler,
  callEventHandlerWith
};
