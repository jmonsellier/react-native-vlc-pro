"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Media = require("./Media");
Object.keys(_Media).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Media[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Media[key];
    }
  });
});
var _Config = require("./Config");
Object.keys(_Config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Config[key];
    }
  });
});
//# sourceMappingURL=index.js.map