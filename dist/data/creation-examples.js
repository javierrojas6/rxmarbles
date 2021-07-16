"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.creationExamples = undefined;

var _rxjs = require("rxjs");

const creationExamples = exports.creationExamples = {
  // Incomplete
  from: {
    label: 'Observable.from([10, 20, 30]).delayWhen(x => timer(x))',
    inputs: [],
    apply: function (inputs, scheduler) {
      return _rxjs.Observable.from([10, 20, 30]).delayWhen(x => _rxjs.Observable.timer(x, scheduler));
    }
  },
  interval: {
    label: 'Observable.interval(10)',
    inputs: [],
    apply: function (inputs, scheduler) {
      return _rxjs.Observable.interval(10, scheduler);
    }
  },
  of: {
    label: 'Observable.of(1)',
    inputs: [],
    apply: function () {
      return _rxjs.Observable.of(1);
    }
  },
  timer: {
    label: 'Observable.timer(30, 10)',
    inputs: [],
    apply: function (inputs, scheduler) {
      return _rxjs.Observable.timer(30, 10, scheduler);
    }
  }
};
//# sourceMappingURL=creation-examples.js.map