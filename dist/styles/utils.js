"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elevation1 = exports.dropshadow = undefined;
exports.renderSvgDropshadow = renderSvgDropshadow;
exports.getElevationPseudoElementStyle = getElevationPseudoElementStyle;
exports.renderElevation2Before = renderElevation2Before;
exports.renderElevation2After = renderElevation2After;
exports.merge = merge;

var _dom = require("@cycle/dom");

const DROPSHADOW_FILTER_ID = 'dropshadow'; // Cross-browser SVG filter for drop shadows

function renderSvgDropshadow() {
  return (0, _dom.svg)({
    attrs: {
      height: '0'
    }
  }, [_dom.svg.filter(`#${DROPSHADOW_FILTER_ID}`, {
    attrs: {
      height: '130%'
    }
  }, [// stdDeviation is blur:
  _dom.svg.feGaussianBlur({
    attrs: {
      in: 'SourceAlpha',
      stdDeviation: '0.3'
    }
  }), // position relative to marble viewBox:
  _dom.svg.feOffset({
    attrs: {
      dx: '0',
      dy: '0.25',
      result: 'offsetblur'
    }
  }), _dom.svg.feFlood({
    attrs: {
      'flood-color': 'rgba(0,0,0,0.4)'
    }
  }), _dom.svg.feComposite({
    attrs: {
      in2: 'offsetblur',
      operator: 'in'
    }
  }), _dom.svg.feMerge([_dom.svg.feMergeNode(), _dom.svg.feMergeNode({
    attrs: {
      in: 'SourceGraphic'
    }
  })])])]);
}

const dropshadow = exports.dropshadow = {
  filter: `url(#${DROPSHADOW_FILTER_ID})`
};

function getElevationPseudoElementStyle(dy, blur, opacity) {
  return {
    display: 'block',
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    '-webkit-box-shadow': `0 ${dy} ${blur} 0 rgba(0,0,0,${opacity})`,
    '-moz-box-shadow': `0 ${dy} ${blur} 0 rgba(0,0,0,${opacity})`,
    'box-shadow': `0 ${dy} ${blur} 0 rgba(0,0,0,${opacity})`
  };
}

function renderElevation2Before() {
  return (0, _dom.div)({
    style: getElevationPseudoElementStyle('2px', '10px', '0.17')
  }, '');
}

function renderElevation2After() {
  return (0, _dom.div)({
    style: getElevationPseudoElementStyle('2px', '5px', '0.26')
  }, '');
}

function merge(...args) {
  return Object.assign({}, ...args);
}

const elevation1 = exports.elevation1 = {
  '-webkit-box-shadow': '0px 1px 2px 1px rgba(0,0,0,0.17)',
  '-moz-box-shadow': '0px 1px 2px 1px rgba(0,0,0,0.17)',
  'box-shadow': '0px 1px 2px 1px rgba(0,0,0,0.17)'
};
//# sourceMappingURL=utils.js.map