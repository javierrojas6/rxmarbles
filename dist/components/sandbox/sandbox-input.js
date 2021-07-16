"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputsToTimelines = inputsToTimelines;

var _ramda = require("ramda");

var _sandboxUtils = require("./sandbox-utils");

function inputToMarbles(stream) {
  return stream.map(({
    t: time,
    c: content
  }, index) => ({
    id: (0, _sandboxUtils.calculateNotificationHash)({
      time,
      content
    }),
    time,
    content,
    itemId: index
  }));
}

function getInput(input) {
  const lastInput = (0, _ramda.last)(input);
  return typeof lastInput === 'number' ? input.slice(0, -1) : input;
}

function getTime(input) {
  const lastInput = (0, _ramda.last)(input);
  return typeof lastInput === 'number' ? lastInput : 100;
}

function inputsToTimelines(inputs) {
  return inputs.map((input, index) => ({
    id: index,
    marbles: inputToMarbles(getInput(input)),
    end: {
      time: getTime(input)
    },
    interactive: true
  }));
}
//# sourceMappingURL=sandbox-input.js.map