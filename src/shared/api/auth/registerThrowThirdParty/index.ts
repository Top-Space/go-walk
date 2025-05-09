import { gql } from '@apollo/client'
import type { UserType } from '@/shared/types'
import { MUTATE } from '@/providers/ApolloProvider'

export const AUTH_THROW_THIRD_PARTY = gql`
    mutation RegisterThrowThirdParty($appleIdToken: String) {
        registerThrowThirdParty(appleIdToken: $appleIdToken) {
            token
            user {
                role
                id
                email
            }
        }
    }
`

export interface RegisterThrowThirdPartyResponseType {
    registerThrowThirdParty: {
        user: UserType
        token: string
    }
}

export interface RegisterThrowThirdPartyInputType {
    appleIdToken: string
}

export const registerThrowThirdPartyMutation = (variables: RegisterThrowThirdPartyInputType) => MUTATE<RegisterThrowThirdPartyResponseType, RegisterThrowThirdPartyInputType>({ mutation: AUTH_THROW_THIRD_PARTY, variables })
