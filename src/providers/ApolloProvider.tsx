/* eslint-disable no-console */
import { ApolloClient, ApolloProvider as NativeApolloProvider, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import type { FC, PropsWithChildren } from 'react'

// TODO: Add in the future
// import { setContext } from '@apollo/client/link/context'
// import tokenService from '@shared/services/tokenService'

// const authLink = setContext(async (_, { headers }) => {
//     const dynamicToken = headers?.token
//     const token = dynamicToken || (await tokenService.get())

//     return {
//         headers: {
//             ...headers,
//             Authorization: token ? `Bearer ${token}` : ''
//         }
//     }
// })

const httpLink = createHttpLink({
    uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}/graphql`
})

const client = new ApolloClient({
    link: ApolloLink.from([
        // authLink,
        httpLink
    ]),
    cache: new InMemoryCache()
})

export const MUTATE = client.mutate
export const QUERY = client.query
export const CACHE = client.cache

const ApolloProvider: FC<PropsWithChildren> = ({ children }) => <NativeApolloProvider client={client}>{children}</NativeApolloProvider>

export default ApolloProvider
