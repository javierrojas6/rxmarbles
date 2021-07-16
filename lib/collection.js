"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = undefined;

var _collection = require("@cycle/collection");

var _rxjsAdapter = require("@cycle/rxjs-adapter");

var _rxjsAdapter2 = _interopRequireDefault(_rxjsAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Collection = exports.Collection = (0, _collection.makeCollection)(_rxjsAdapter2.default);