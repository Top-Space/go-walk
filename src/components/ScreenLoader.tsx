import { View } from 'react-native'
import FullLogo from '@/assets/images/full-logo.png'
import { Image } from 'expo-image'
import { theme } from '@/utils/theme'

const ScreenLoader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <Image source={FullLogo} style={{ width: 246, height: 151 }} contentFit='contain' />
        </View>
    )
}

export default ScreenLoader
