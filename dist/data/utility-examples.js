"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utilityExamples = undefined;

var _rxjs = require("rxjs");

var _ramda = require("ramda");

/* t = time, c = content */
const utilityExamples = exports.utilityExamples = {
  delay: {
    label: 'delay(20)',
    inputs: [[{
      t: 10,
      c: '1'
    }, {
      t: 20,
      c: '2'
    }, {
      t: 70,
      c: '1'
    }]],
    apply: (inputs, scheduler) => inputs[0].map((0, _ramda.prop)('content')).delay(20, scheduler)
  },
  delayWhen: {
    label: 'delayWhen(x => Observable.timer(20 * x))',
    inputs: [[{
      t: 0,
      c: 1
    }, {
      t: 10,
      c: 2
    }, {
      t: 20,
      c: 1
    }]],
    apply: function (inputs, scheduler) {
      return inputs[0].delayWhen(({
        content
      }) => _rxjs.Observable.timer(Number(content) * 20, 1000, scheduler));
    }
  }
};
//# sourceMappingURL=utility-examples.js.map