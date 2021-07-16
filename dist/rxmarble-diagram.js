"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawDiagram = undefined;

var _dom = require("@cycle/dom");

var _rxjsRun = require("@cycle/rxjs-run");

var _rxjs = require("rxjs");

var _of = require("rxjs/observable/of");

var _ramda = require("ramda");

var _collection = require("./collection");

var _styles = require("./styles");

var _utils = require("./styles/utils");

var _timeline = require("./components/timeline");

var _sandboxOutput = require("./components/sandbox/sandbox-output");

var _sandboxInput = require("./components/sandbox/sandbox-input");

var _operatorLabel = require("./components/sandbox/operator-label");

const sandboxStyle = (0, _utils.merge)(_styles.bgWhite, _utils.elevation1, {
  borderRadius: "2px"
});

const main = (operator, isInteractive) => sources => render(sources, operator, isInteractive);

const dummyDriver = initialValue => value => value.remember().startWith(initialValue);
/**
 * simpler render function
 */


const render = ({
  DOM,
  store
}, operator, isInteractive = true) => {
  // operator process
  const operatorObs = (0, _of.of)(operator);
  const timelineInputs = operatorObs.switchMap(example => store.pluck("inputs").filter(_ramda.identity) // bug: For some reason inputDataList$ emits old value after
  // route change. Skip it.
  .skip(1).startWith((0, _sandboxInput.inputsToTimelines)(example.inputs))).publishReplay(1).refCount();

  const inputTimelines = _collection.Collection.gather(_timeline.Timeline, {
    DOM
  }, timelineInputs, "id").publishReplay(1).refCount();

  const inputDOMs = _collection.Collection.pluck(inputTimelines, (0, _ramda.prop)("DOM"));

  const inputDataList = _collection.Collection.pluck(inputTimelines, (0, _ramda.prop)("data")).filter(_ramda.length).debounceTime(0).withLatestFrom(timelineInputs, _ramda.zip).map((0, _ramda.map)((0, _ramda.apply)((0, _ramda.flip)(_ramda.merge))));

  const outputTimeline = (0, _sandboxOutput.createOutputStream$)(operatorObs, inputDataList); // rendering process

  const outputTimelineSources = {
    DOM,
    marbles: outputTimeline.pluck("marbles"),
    end: outputTimeline.pluck("end"),
    interactive: _rxjs.Observable.of(isInteractive)
  };
  const outputTimeline2 = (0, _timeline.Timeline)(outputTimelineSources);

  const renderedDOM = _rxjs.Observable.combineLatest(inputDOMs, outputTimeline2.DOM).map(([inputsDOMs, outputDOM]) => (0, _dom.div)({
    style: sandboxStyle
  }, [...inputsDOMs, (0, _operatorLabel.renderOperatorBox)(operator.label), outputDOM]));

  return {
    DOM: renderedDOM,
    data: inputDataList.map(inputs => ({
      inputs
    }))
  };
};

const drawDiagram = exports.drawDiagram = (DomElement, operator, isInteractive = true) => {
  (0, _rxjsRun.run)(main(operator, isInteractive), {
    DOM: (0, _dom.makeDOMDriver)(DomElement),
    store: dummyDriver({})
  });
  return DomElement;
};
//# sourceMappingURL=rxmarble-diagram.js.map