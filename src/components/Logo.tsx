import type { FC } from 'react'
import { Image } from 'expo-image'
import LogoImage from '@/assets/images/logo.png'

interface Props {
    size?: number
}

const Logo: FC<Props> = ({ size = 48 }) => {
    return <Image source={LogoImage} style={{ width: size, height: size }} />
}

export default Logo
