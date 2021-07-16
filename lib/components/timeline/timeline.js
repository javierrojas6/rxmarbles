"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = Timeline;

var _dom = require("@cycle/dom");

var _isolate = require("@cycle/isolate");

var _isolate2 = _interopRequireDefault(_isolate);

var _rxjs = require("rxjs");

var _ramda = require("ramda");

var _collection = require("../../collection");

var _styles = require("../../styles");

var _timelineConstants = require("./timeline-constants");

var _marble = require("./marble");

var _endMarker = require("./end-marker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const timelineStyle = {
  padding: `${_styles.DIMENS.spaceSmall} ${_styles.DIMENS.spaceMedium}`
};

function sortMarbleDoms$(marbles$) {
  const doms$ = _collection.Collection.pluck(marbles$, (0, _ramda.prop)('DOM'));

  const dataList$ = _collection.Collection.pluck(marbles$, (0, _ramda.prop)('data'));

  return _rxjs.Observable.combineLatest(doms$, dataList$, _ramda.zip).map((0, _ramda.sortBy)((0, _ramda.path)([1, 'time']))).map((0, _ramda.map)((0, _ramda.prop)(0)));
}

function OriginalTimeline(sources) {
  const {
    DOM,
    marbles: marblesState$,
    end: end$,
    interactive: interactive$
  } = sources;
  const marblesProps$ = end$.map(end => ({
    minTime: 0,
    maxTime: end.time
  }));

  const endMarkerProps$ = _rxjs.Observable.combineLatest(marblesState$, end$).map(([marbles, end]) => {
    const maxMarbleTime = marbles.map((0, _ramda.prop)('time')).reduce(_ramda.max, 0);
    return {
      isTall: end.time <= maxMarbleTime + _timelineConstants.MARBLE_SIZE,
      minTime: maxMarbleTime,
      maxTime: 100
    };
  });

  const marblesSources = {
    DOM,
    props: marblesProps$,
    isDraggable: interactive$
  };
  const endMarkerSources = {
    DOM,
    props: endMarkerProps$,
    time: end$.pluck('time'),
    isDraggable: interactive$
  };

  const marbles$ = _collection.Collection.gather(_marble.Marble, marblesSources, marblesState$, 'itemId');

  const marbleDOMs$ = sortMarbleDoms$(marbles$);
  const endMarker = (0, _endMarker.EndMarker)(endMarkerSources);

  const vtree$ = _rxjs.Observable.combineLatest(marbleDOMs$, endMarker.DOM).map(([marbleDOMs, endMarkerDOM]) => (0, _dom.div)({
    style: timelineStyle
  }, [(0, _dom.svg)({
    attrs: {
      viewBox: '0 0 7 10'
    },
    style: {
      width: '48px',
      height: '68px',
      overflow: 'visible'
    }
  }, [_dom.svg.line({
    attrs: {
      x1: '0',
      y1: '5',
      x2: '112',
      y2: '5'
    },
    style: {
      stroke: 'black',
      strokeWidth: `${_timelineConstants.STROKE_WIDTH}`
    }
  }), _dom.svg.polygon({
    attrs: {
      points: '111.7,6.1 111.7,3.9 114,5'
    }
  })]), (0, _dom.svg)({
    attrs: {
      viewBox: '0 0 100 10'
    },
    style: {
      width: '680px',
      height: '68px',
      overflow: 'visible'
    }
  }, [endMarkerDOM, ...marbleDOMs])]));

  const marbleData$ = _collection.Collection.pluck(marbles$, (0, _ramda.prop)('data')).debounceTime(0).withLatestFrom(marblesState$, _ramda.zip).map((0, _ramda.map)((0, _ramda.apply)((0, _ramda.flip)(_ramda.merge))));

  const data$ = _rxjs.Observable.combineLatest(marbleData$, endMarker.time).map(([marbles, endMarkerTime]) => ({
    marbles,
    end: {
      time: endMarkerTime
    }
  }));

  return {
    DOM: vtree$,
    data: data$
  };
}

function Timeline(sources) {
  return (0, _isolate2.default)(OriginalTimeline)(sources);
}