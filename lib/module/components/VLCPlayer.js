function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Composant VLCPlayer principal
 * Phase 1, Semaine 2 : Intégration des vues natives iOS/Android
 */

import React, { forwardRef } from 'react';
import VLCPlayerNative from './VLCPlayerNative';
const VLCPlayer = /*#__PURE__*/forwardRef((props, ref) => {
  // Phase 1, Semaine 2 : Utilisation de la vue native
  return /*#__PURE__*/React.createElement(VLCPlayerNative, _extends({
    ref: ref
  }, props));
});
VLCPlayer.displayName = 'VLCPlayer';
export default VLCPlayer;
//# sourceMappingURL=VLCPlayer.js.map