/**
 * Composant VLCPlayer natif
 * Phase 1, Semaine 2 : Intégration des vues natives iOS/Android
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import type { VLCPlayerProps, VLCPlayerRef } from '../types';
interface VLCPlayerNativeProps extends VLCPlayerProps {
    style?: ViewStyle;
}
declare const VLCPlayerNative: React.ForwardRefExoticComponent<VLCPlayerNativeProps & React.RefAttributes<VLCPlayerRef>>;
export default VLCPlayerNative;
//# sourceMappingURL=VLCPlayerNative.d.ts.map