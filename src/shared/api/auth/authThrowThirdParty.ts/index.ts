import { gql } from '@apollo/client'
import type { UserType } from '@/shared/types'
import { MUTATE } from '@/providers/ApolloProvider'

export const AUTH_THROW_THIRD_PARTY = gql`
    mutation AuthThrowThirdParty($appleIdToken: String) {
        authThrowThirdParty(appleIdToken: $appleIdToken) {
            token
            user {
                role
                id
                email
            }
        }
    }
`

export interface AuthThrowThirdPartyResponseType {
    authThrowThirdParty: {
        user: UserType
        token: string
    }
}

export interface AuthThrowThirdPartyInputType {
    appleIdToken: string
}

export const authThrowThirdPartyMutation = (variables: AuthThrowThirdPartyInputType) => MUTATE<AuthThrowThirdPartyResponseType, AuthThrowThirdPartyInputType>({ mutation: AUTH_THROW_THIRD_PARTY, variables })
