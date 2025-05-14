import type { PurchasesPackage } from 'react-native-purchases'

export const UserRoles = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface UserType {
    email: string
    id: string
    role: UserRole
    freeTrialActivatedAt: Date | null
}

export const OnboardingAges = {
    UNDER_18: 'UNDER_18',
    EIGHTEEN_TO_TWENTY_FOUR: 'EIGHTEEN_TO_TWENTY_FOUR',
    TWENTY_FIVE_TO_THIRTY_FOUR: 'TWENTY_FIVE_TO_THIRTY_FOUR',
    THIRTY_FIVE_TO_FOURTY_FOUR: 'THIRTY_FIVE_TO_FOURTY_FOUR',
    FORTY_FIVE_TO_FIFTY_FIVE: 'FORTY_FIVE_TO_FIFTY_FIVE',
    FIFTY_FIVE_TO_SIXTY_FOUR: 'FIFTY_FIVE_TO_SIXTY_FOUR',
    OVER_SIXTY_FOUR: 'OVER_SIXTY_FOUR'
}

export const OnboardingAvgScreenTimes = {
    UNDER_ONE_HOUR: 'UNDER_ONE_HOUR',
    ONE_TO_THREE_HOURS: 'ONE_TO_THREE_HOURS',
    THREE_TO_FOUR_HOURS: 'THREE_TO_FOUR_HOURS',
    FOUR_TO_FIVE_HOURS: 'FOUR_TO_FIVE_HOURS',
    FIVE_TO_SEVEN_HOURS: 'FIVE_TO_SEVEN_HOURS',
    MORE_THAN_SEVEN_HOURS: 'MORE_THAN_SEVEN_HOURS'
}

export const OnboardingOccupations = {
    STUDENT_ACADEMIC: 'STUDENT_ACADEMIC',
    SOFTWARE_DEVELOPMENT: 'SOFTWARE_DEVELOPMENT',
    CEO_FOUNDER: 'CEO_FOUNDER',
    REMOTE_WORKER: 'REMOTE_WORKER',
    FINANCE_OPS_CONSULTING: 'FINANCE_OPS_CONSULTING',
    ART_CONTENT: 'ART_CONTENT',
    OTHER: 'OTHER'
}

export type OnboardingAge = (typeof OnboardingAges)[keyof typeof OnboardingAges]
export type OnboardingAvgScreenTime = (typeof OnboardingAvgScreenTimes)[keyof typeof OnboardingAvgScreenTimes]
export type OnboardingOccupation = (typeof OnboardingOccupations)[keyof typeof OnboardingOccupations]

export interface UserOnboardingInfo {
    age: OnboardingAge
    avgScreenTime: OnboardingAvgScreenTime
    distractiveApps: string[]
    occupation: OnboardingOccupation
}

export interface UserInfoBaseStatistic {
    spendDaysOfYear: number
    spendYearsOfLife: number
    getBackYearsOfLife: number
}

export interface RevenueUserType {
    packages: Array<PurchasesPackage>
    subscriptions: Array<string>
}
