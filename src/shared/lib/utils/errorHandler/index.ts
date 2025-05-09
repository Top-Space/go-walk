/* eslint-disable no-console */
import { Alert } from 'react-native'
import isAbortError from '../isAbortError'

const errorHandler = (error: any): undefined => {
    if (isAbortError(error)) return

    const message = error?.message ?? 'An unknown error occurred'
    const cause = typeof error?.cause === 'string' ? error.cause : undefined

    if (__DEV__) {
        console.error(error)
    }

    Alert.alert(message, cause)
}

export default errorHandler
