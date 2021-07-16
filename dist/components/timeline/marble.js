"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Marble = Marble;

var _dom = require("@cycle/dom");

var _isolate = require("@cycle/isolate");

var _isolate2 = _interopRequireDefault(_isolate);

var _rxjs = require("rxjs");

var _ramda = require("ramda");

var _utils = require("../../styles/utils");

var _styles = require("../../styles");

var _timelineConstants = require("./timeline-constants");

var _timelineItem = require("./timeline-item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ELEMENT_CLASS = 'marble';
const POSSIBLE_COLORS = [_styles.COLORS.blue, _styles.COLORS.green, _styles.COLORS.yellow, _styles.COLORS.red];

function view(sources, value$, isHighlighted$) {
  return _rxjs.Observable.combineLatest(sources.id, sources.content, value$, isHighlighted$).map(([id, content, value, isHighlighted]) => _dom.svg.g({
    attrs: {
      class: ELEMENT_CLASS,
      transform: `translate(${value}, 5)`
    },
    style: {
      cursor: isHighlighted ? 'ew-resize' : 'default'
    }
  }, [_dom.svg.circle({
    attrs: {
      r: _timelineConstants.MARBLE_SIZE
    },
    style: (0, _ramda.merge)({
      fill: POSSIBLE_COLORS[id % POSSIBLE_COLORS.length],
      stroke: 'black',
      strokeWidth: _timelineConstants.STROKE_WIDTH
    }, isHighlighted ? _utils.dropshadow : {})
  }), _dom.svg.text({
    attrs: {
      'text-anchor': 'middle',
      y: '0.8'
    },
    style: (0, _styles.merge)({
      fontSize: '2.5px'
    }, _styles.fontBase, _styles.userSelectNone)
  }, [`${content}`])]));
}

function OriginalMarble(sources) {
  const {
    DOM,
    time
  } = (0, _timelineItem.timelineItem)(ELEMENT_CLASS, view, sources);

  const data$ = _rxjs.Observable.combineLatest(time, sources.id).map(([time, id]) => ({
    time,
    id
  }));

  return {
    DOM,
    data: data$
  };
}

function Marble(sources) {
  return (0, _isolate2.default)(OriginalMarble)(sources);
}
//# sourceMappingURL=marble.js.map