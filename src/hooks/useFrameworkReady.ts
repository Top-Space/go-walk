import { useEffect } from 'react'

declare global {
    interface Window {
        frameworkReady?: () => void
    }
}

export const useFrameworkReady = () => {
    useEffect(() => {
        window.frameworkReady?.()
    })
}
