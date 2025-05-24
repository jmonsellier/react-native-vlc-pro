"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PerformanceProfiler: true,
  PerformanceUtils: true
};
Object.defineProperty(exports, "PerformanceProfiler", {
  enumerable: true,
  get: function () {
    return _performance.PerformanceProfiler;
  }
});
Object.defineProperty(exports, "PerformanceUtils", {
  enumerable: true,
  get: function () {
    return _performance.PerformanceUtils;
  }
});
var _formatTime = require("./formatTime");
Object.keys(_formatTime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formatTime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formatTime[key];
    }
  });
});
var _performance = require("./performance");
//# sourceMappingURL=index.js.map