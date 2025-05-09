import { MUTATE } from '@/providers/ApolloProvider'
import type { UserOnboardingInfo } from '@/shared/types'
import { gql } from '@apollo/client'

const CHANGE_USER_INFO = gql`
    mutation Mutation($input: ChangeUserInfoInput!) {
        changeUserInfo(input: $input) {
            id
            userId
            avgScreenTime
            age
            occupation
            distractiveApps
        }
    }
`

interface ChangeUserInfoVariablesType {
    input: UserOnboardingInfo
}

interface ChangeUserInfoResponseType {
    changeUserInfo: {
        id: string
        userId: string
        avgScreenTime: number
        age: number
        occupation: string
        distractiveApps: string[]
    }
}

export const changeUserInfo = (variables: ChangeUserInfoVariablesType) =>
    MUTATE<ChangeUserInfoResponseType, ChangeUserInfoVariablesType>({
        mutation: CHANGE_USER_INFO,
        variables
    })
