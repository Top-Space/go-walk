import type { OnboardingAge, OnboardingAvgScreenTime, UserInfoBaseStatistic, UserOnboardingInfo } from '@/shared/types'
import { OnboardingAges, OnboardingAvgScreenTimes } from '@/shared/types'

export const getUserInfoBaseStatistic = (userInfo: UserOnboardingInfo): UserInfoBaseStatistic => {
    const spendDaysOfYear = getSpendDaysOfYear(userInfo.avgScreenTime)
    const spendYearsOfLife = getSpendYearsOfLife(spendDaysOfYear, userInfo.age)
    const getBackYearsOfLife = getGetBackYearsOfLife(spendYearsOfLife)

    return {
        spendDaysOfYear,
        spendYearsOfLife,
        getBackYearsOfLife
    }
}

const getSpendDaysOfYear = (avgScreenTime: OnboardingAvgScreenTime): number => {
    let avgScreenTimeHours: number

    if (avgScreenTime === OnboardingAvgScreenTimes.UNDER_ONE_HOUR) {
        avgScreenTimeHours = 1
    } else if (avgScreenTime === OnboardingAvgScreenTimes.ONE_TO_THREE_HOURS) {
        avgScreenTimeHours = 3
    } else if (avgScreenTime === OnboardingAvgScreenTimes.THREE_TO_FOUR_HOURS) {
        avgScreenTimeHours = 4
    } else if (avgScreenTime === OnboardingAvgScreenTimes.FOUR_TO_FIVE_HOURS) {
        avgScreenTimeHours = 5
    } else if (avgScreenTime === OnboardingAvgScreenTimes.FIVE_TO_SEVEN_HOURS) {
        avgScreenTimeHours = 6
    } else if (avgScreenTime === OnboardingAvgScreenTimes.MORE_THAN_SEVEN_HOURS) {
        avgScreenTimeHours = 8
    } else {
        avgScreenTimeHours = 0
    }

    return Math.round((avgScreenTimeHours / 24) * 365)
}

const getSpendYearsOfLife = (spendDaysOfYear: number, age: OnboardingAge) => {
    const averageLifeYears = 80
    let ageValue: number

    if (age === OnboardingAges.UNDER_18) {
        ageValue = 14
    } else if (age === OnboardingAges.EIGHTEEN_TO_TWENTY_FOUR) {
        ageValue = 18
    } else if (age === OnboardingAges.TWENTY_FIVE_TO_THIRTY_FOUR) {
        ageValue = 25
    } else if (age === OnboardingAges.THIRTY_FIVE_TO_FOURTY_FOUR) {
        ageValue = 35
    } else if (age === OnboardingAges.FORTY_FIVE_TO_FIFTY_FIVE) {
        ageValue = 45
    } else if (age === OnboardingAges.FIFTY_FIVE_TO_SIXTY_FOUR) {
        ageValue = 55
    } else if (age === OnboardingAges.OVER_SIXTY_FOUR) {
        ageValue = 65
    } else {
        ageValue = 0
    }

    const yearsLeft = averageLifeYears - ageValue

    return Math.round((spendDaysOfYear * yearsLeft) / 365)
}

const getGetBackYearsOfLife = (willSpendDaysOfLife: number) => {
    const randomNumber = 3.66

    return Math.round(willSpendDaysOfLife / randomNumber)
}
