import { useEffect, useState } from "react";
import { NativeSyntheticEvent, View } from "react-native";
import { ActivitySelectionWithMetadata } from "react-native-device-activity";
import * as ReactNativeDeviceActivity from "react-native-device-activity";

const DeviceActivityPicker = () => {
    const [familyActivitySelection, setFamilyActivitySelection] = useState<string | null>(null);

    useEffect(() => {
        ReactNativeDeviceActivity.requestAuthorization()
    }, [])

    return (
        <ReactNativeDeviceActivity.DeviceActivitySelectionView
            style={{
                height: '100%',
            }}
            onSelectionChange={(
                event: NativeSyntheticEvent<ActivitySelectionWithMetadata>,
            ) => {
                if (
                    event.nativeEvent.familyActivitySelection !==
                    familyActivitySelection
                ) {
                    setFamilyActivitySelection(
                        event.nativeEvent.familyActivitySelection,
                    );
                    // alert(event.nativeEvent.familyActivitySelection);
                }
                console.log(event.nativeEvent.familyActivitySelection);
            }}
            familyActivitySelection={familyActivitySelection}
        />
    )
}

export default DeviceActivityPicker