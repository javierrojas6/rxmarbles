"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndMarker = EndMarker;

var _dom = require("@cycle/dom");

var _isolate = require("@cycle/isolate");

var _isolate2 = _interopRequireDefault(_isolate);

var _rxjs = require("rxjs");

var _timelineConstants = require("./timeline-constants");

var _timelineItem = require("./timeline-item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ELEMENT_CLASS = 'end-marker';
const baseHeight = 1.8;
const tallHeight = 3.2;

function view(sources, value$) {
  return _rxjs.Observable.combineLatest(sources.props, value$).map(([{
    isTall
  }, value]) => {
    const height = isTall ? tallHeight : baseHeight;
    return _dom.svg.line({
      attrs: {
        class: ELEMENT_CLASS,
        x1: value,
        x2: value,
        y1: 5 - height,
        y2: 5 + height
      },
      style: {
        stroke: 'black',
        strokeWidth: _timelineConstants.STROKE_WIDTH,
        cursor: 'ew-resize'
      }
    });
  });
}

function OriginalEndMarker(sources) {
  return (0, _timelineItem.timelineItem)(ELEMENT_CLASS, view, sources);
}

function EndMarker(sources) {
  return (0, _isolate2.default)(OriginalEndMarker)(sources);
}
//# sourceMappingURL=end-marker.js.map