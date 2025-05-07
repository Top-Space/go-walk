const isAbortError = (error: any) => error?.networkError?.name === 'AbortError' || error?.name === 'AbortError'

export default isAbortError
