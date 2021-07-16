"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sandbox = require("./sandbox");

Object.keys(_sandbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sandbox[key];
    }
  });
});