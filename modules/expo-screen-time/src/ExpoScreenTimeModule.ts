import { NativeModule, requireNativeModule } from 'expo';

import { ExpoScreenTimeModuleEvents } from './ExpoScreenTime.types';

declare class ExpoScreenTimeModule extends NativeModule<ExpoScreenTimeModuleEvents> {}

export default requireNativeModule<ExpoScreenTimeModule>('ExpoScreenTime');
