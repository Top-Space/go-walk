import { gql } from '@apollo/client'
import type { UserType } from '@/shared/types'
import { QUERY } from '@/providers/ApolloProvider'

const GET_USER_BY_TOKEN = gql`
    query GetUserByToken {
        getUserByToken {
            token
            user {
                id
                email
                role
            }
        }
    }
`

export interface GetUserByTokenResponseType {
    getUserByToken: {
        token: string
        user: UserType
    }
}

export const getUserByTokenQuery = () => QUERY<GetUserByTokenResponseType, never>({ query: GET_USER_BY_TOKEN })
