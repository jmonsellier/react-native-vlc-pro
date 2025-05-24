/**
 * Composant VLCPlayer principal
 * Phase 1, Semaine 2 : Intégration des vues natives iOS/Android
 */

import React, { forwardRef } from 'react';
import VLCPlayerNative from './VLCPlayerNative';
import type { VLCPlayerProps, VLCPlayerRef } from '../types';

const VLCPlayer = forwardRef<VLCPlayerRef, VLCPlayerProps>((props, ref) => {
  // Phase 1, Semaine 2 : Utilisation de la vue native
  return <VLCPlayerNative ref={ref} {...props} />;
});

VLCPlayer.displayName = 'VLCPlayer';

export default VLCPlayer;
