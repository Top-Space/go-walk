import { MUTATE } from '@/providers/ApolloProvider'
import { gql } from '@apollo/client'

const DELETE_ACCOUNT = gql`
    mutation Mutation {
        deleteAccount
    }
`

interface DeleteAccountResponse {
    deleteAccount: boolean
}

export const deleteAccount = () => MUTATE<DeleteAccountResponse, never>({ mutation: DELETE_ACCOUNT })
