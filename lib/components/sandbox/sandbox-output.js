"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOutputStream$ = createOutputStream$;

var _rxjs = require("rxjs");

var _ramda = require("ramda");

var _sandboxUtils = require("./sandbox-utils");

const MAX_TIME = 100;
const toVTStream = (0, _ramda.curry)(function _toVTStream(scheduler, data) {
  const marbleStreams$ = new _rxjs.Observable(observer => {
    data.marbles.forEach(item => scheduler.schedule(() => observer.next(item), item.time));
  });
  return marbleStreams$.takeUntil(_rxjs.Observable.timer(data.end.time + 1, scheduler));
});

function outputStreamToMarbles$(scheduler, stream) {
  const subject$ = new _rxjs.ReplaySubject(1);
  const stop$ = new _rxjs.Subject();
  let endTime;
  stream.observeOn(scheduler).timestamp(scheduler).map(({
    value,
    timestamp
  }) => {
    const marble = typeof value !== 'object' ? {
      content: value,
      id: (0, _sandboxUtils.calculateNotificationContentHash)(value)
    } : value;
    return (0, _ramda.assoc)('time', timestamp / MAX_TIME * 100, marble);
  }).takeUntil(stop$).reduce((a, b) => a.concat(b), []).map(items => items.map((item, i) => (0, _ramda.merge)(item, {
    itemId: i
  }))).subscribe(items => subject$.next(items), undefined, () => endTime = scheduler.now());
  scheduler.flush();
  stop$.next();
  return subject$.asObservable().map(marbles => ({
    marbles,
    end: {
      time: endTime
    }
  }));
}

function createOutputStream$(example$, inputStores$) {
  return inputStores$.debounceTime(0).withLatestFrom(example$).map(([inputStores, example]) => {
    const vtScheduler = new _rxjs.VirtualTimeScheduler(undefined, MAX_TIME);
    const inputStreams = inputStores.map(toVTStream(vtScheduler));
    const outputStream = example.apply(inputStreams, vtScheduler) // add 0.01 or else things at exactly MAX_TIME will cut off
    .takeUntil(_rxjs.Observable.timer(MAX_TIME + 0.01, vtScheduler));
    return outputStreamToMarbles$(vtScheduler, outputStream);
  }).mergeAll().publishReplay(1).refCount();
}