"use strict";

var _zip = require("rxjs/observable/zip");

var _rxmarbleDiagram = require("./rxmarble-diagram");

// const drawDiagram = require('./rxmarble-diagram');
console.log('drawDiagram: ', _rxmarbleDiagram.drawDiagram);
const operator = {
  label: "Mi Op",
  inputs: [[{
    t: 0,
    c: 1
  }, {
    t: 20,
    c: 2
  }, {
    t: 65,
    c: 3
  }, {
    t: 75,
    c: 4
  }, {
    t: 92,
    c: 5
  }], [{
    t: 10,
    c: "A"
  }, {
    t: 25,
    c: "B"
  }, {
    t: 50,
    c: "C"
  }, {
    t: 57,
    c: "D"
  }, {
    t: 58,
    c: "E"
  }]],
  apply: inputs => (0, _zip.zip)(inputs[0], inputs[1], (x, y) => x.content + "|" + y.content)
};
const element = document.createElement("div");
const container = document.getElementById("app-container");
container.appendChild(element);
(0, _rxmarbleDiagram.drawDiagram)(element, operator, true);