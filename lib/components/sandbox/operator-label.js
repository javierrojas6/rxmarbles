"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOperatorBox = renderOperatorBox;

var _dom = require("@cycle/dom");

var _utils = require("../../styles/utils");

var _styles = require("../../styles");

function renderOperatorLabel(label) {
  let fontSize = label.length >= 45 ? 1.3 : label.length >= 30 ? 1.5 : 2;
  let style = (0, _styles.merge)({
    fontWeight: '400',
    fontSize: `${fontSize}rem`
  }, _styles.fontCode);
  return (0, _dom.span)('.operatorLabel', {
    style
  }, label);
}

function renderOperatorBox(label) {
  const style = {
    border: '1px solid rgba(0,0,0,0.06)',
    padding: _styles.DIMENS.spaceMedium,
    textAlign: 'center',
    position: 'relative'
  };
  return (0, _dom.div)('.operatorBox', {
    style
  }, [(0, _utils.renderElevation2Before)(), renderOperatorLabel(label), (0, _utils.renderElevation2After)()]);
}