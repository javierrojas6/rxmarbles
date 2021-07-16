"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categories = exports.examples = undefined;

var _ramda = require("ramda");

var _categories = require("./categories");

const examples = exports.examples = (0, _ramda.values)(_categories.categories).reduce(_ramda.merge, {});
exports.categories = _categories.categories;
//# sourceMappingURL=index.js.map