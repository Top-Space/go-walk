import { MUTATE } from '@/providers/ApolloProvider'
import type { UserType } from '@/shared/types'
import { gql } from '@apollo/client'

const LOGIN_THROW_THIRD_PARTY = gql`
    mutation LoginThrowThirdParty($appleIdToken: String) {
        loginThrowThirdParty(appleIdToken: $appleIdToken) {
            user {
                id
                email
                role
            }
            token
        }
    }
`

export interface LoginThrowThirdPartyVariablesType {
    appleIdToken: string
}

export interface LoginThrowThirdPartyResponseType {
    loginThrowThirdParty: {
        user: UserType
        token: string
    }
}

export const loginThrowThirdPartyMutation = (variables: LoginThrowThirdPartyVariablesType) =>
    MUTATE<LoginThrowThirdPartyResponseType, LoginThrowThirdPartyVariablesType>({
        mutation: LOGIN_THROW_THIRD_PARTY,
        variables
    })
