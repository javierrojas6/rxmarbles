"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sandbox = Sandbox;

var _dom = require("@cycle/dom");

var _rxjs = require("rxjs");

var _ramda = require("ramda");

var _collection = require("../../collection");

var _data = require("../../data");

var _styles = require("../../styles");

var _utils = require("../../styles/utils");

var _timeline = require("../timeline");

var _sandboxOutput = require("./sandbox-output");

var _sandboxInput = require("./sandbox-input");

var _operatorLabel = require("./operator-label");

;
const sandboxStyle = (0, _utils.merge)(_styles.bgWhite, _utils.elevation1, {
  borderRadius: '2px'
});

function Sandbox({
  DOM,
  store
}) {
  const example$ = store.pluck('route').skip(1) // blank first route
  .distinctUntilChanged().map(exampleKey => _data.examples[exampleKey]).publishReplay(1).refCount();
  const inputStores$ = example$.switchMap(example => store.pluck('inputs').filter(_ramda.identity) // bug: For some reason inputDataList$ emits old value after
  // route change. Skip it.
  .skip(1).startWith((0, _sandboxInput.inputsToTimelines)(example.inputs))).publishReplay(1).refCount();
  const outputStore$ = (0, _sandboxOutput.createOutputStream$)(example$, inputStores$);
  const outputTimelineSources$ = {
    DOM,
    marbles: outputStore$.pluck('marbles'),
    end: outputStore$.pluck('end'),
    interactive: _rxjs.Observable.of(false)
  };

  const inputTimelines$ = _collection.Collection.gather(_timeline.Timeline, {
    DOM
  }, inputStores$, 'id').publishReplay(1).refCount();

  const outputTimeline = (0, _timeline.Timeline)(outputTimelineSources$);

  const inputDOMs$ = _collection.Collection.pluck(inputTimelines$, (0, _ramda.prop)('DOM'));

  const inputDataList$ = _collection.Collection.pluck(inputTimelines$, (0, _ramda.prop)('data')).filter(_ramda.length).debounceTime(0).withLatestFrom(inputStores$, _ramda.zip).map((0, _ramda.map)((0, _ramda.apply)((0, _ramda.flip)(_ramda.merge))));

  const vtree$ = _rxjs.Observable.combineLatest(inputDOMs$, outputTimeline.DOM, example$).map(([inputsDOMs, outputDOM, example]) => (0, _dom.div)({
    style: sandboxStyle
  }, [...inputsDOMs, (0, _operatorLabel.renderOperatorBox)(example.label), outputDOM]));

  return {
    DOM: vtree$,
    data: inputDataList$.map(inputs => ({
      inputs
    }))
  };
}
//# sourceMappingURL=sandbox.js.map