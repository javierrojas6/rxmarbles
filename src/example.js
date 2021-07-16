import { zip } from "rxjs/observable/zip";
import {  concat  } from "rxjs/observable/concat";
import {  combineLatest } from "rxjs/observable/combineLatest";
import {  merge } from "rxjs/observable/merge";

import { drawDiagram } from "./rxmarble-diagram";

const operator = {
  label: "My Operator",
  inputs: [
    [
      { t: 0, c: 1 },
      { t: 20, c: 2 },
      { t: 65, c: 3 },
      { t: 75, c: 4 },
      { t: 92, c: 5 },
    ],
    [
      { t: 10, c: "A" },
      { t: 25, c: "B" },
      { t: 50, c: "C" },
      { t: 57, c: "D" },
      { t: 58, c: "E" },
    ],
  ],
  apply: (inputs) =>
    zip(inputs[0], inputs[1], (x, y) => x.content + "|" + y.content),
    // combineLatest(inputs[0], inputs[1], (x, y) => ('' + x.content + y.content)),
    // concat(...inputs),
    // merge(...inputs),
    
};

const element = document.createElement("div");
const container = document.getElementById("app-container");
container.appendChild(element);

drawDiagram(element, operator, true);
