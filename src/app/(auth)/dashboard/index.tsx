import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, ScrollView, Pressable, Image, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react-native'
import { theme } from '@/utils/theme'
import { BarChart } from '@/components/Charts'
import Logo from '@/components/Logo'
import HealthKit, { HKQuantityTypeIdentifier, HKUnits } from '@kingstinct/react-native-healthkit'

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date)

    startOfWeek.setDate(date.getDate() - date.getDay())

    return Array.from({ length: 7 }, (_, i) => {
        const currentDate = new Date(startOfWeek)

        currentDate.setDate(startOfWeek.getDate() + i)

        return currentDate
    })
}

const formatMonthYear = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toLowerCase()
}

const USAGE_DATA = [
    { hour: '00', minutes: 0 },
    { hour: '02', minutes: 0 },
    { hour: '04', minutes: 0 },
    { hour: '06', minutes: 15 },
    { hour: '08', minutes: 25 },
    { hour: '10', minutes: 30 },
    { hour: '12', minutes: 10 },
    { hour: '14', minutes: 40 },
    { hour: '16', minutes: 20 },
    { hour: '18', minutes: 45 },
    { hour: '20', minutes: 35 },
    { hour: '22', minutes: 15 }
]

const APPS = [
    {
        id: 'instagram',
        name: 'Instagram',
        category: 'Social',
        duration: '31m',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        category: 'Social',
        duration: '31m',
        icon: 'https://i.pinimg.com/736x/e1/0e/3f/e10e3f21d3b4e0f40b04b8fee7f40da4.jpg'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        category: 'Entertainment',
        duration: '20m',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png',
        color: '#F59E0B'
    }
]

export default function HomeScreen() {
    const insets = useSafeAreaInsets()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [weekDates, setWeekDates] = useState(getWeekDates(new Date()))

    const [hasRequestedAuthorization, setHasRequestedAuthorization] = useState(false)
    const [stepCount, setStepCount] = useState(0)

    useEffect(() => {
        setWeekDates(getWeekDates(currentDate))
    }, [currentDate])

    const handlePreviousWeek = () => {
        const newDate = new Date(currentDate)

        newDate.setDate(currentDate.getDate() - 7)
        setCurrentDate(newDate)
    }

    const handleNextWeek = () => {
        const newDate = new Date(currentDate)

        newDate.setDate(currentDate.getDate() + 7)
        setCurrentDate(newDate)
    }

    const handleDateSelect = (date: Date) => {
        const today = new Date()
        const selectedDate = new Date(date)

        if (selectedDate < today) {
            setCurrentDate(selectedDate)
        } else {
            setCurrentDate(today)
        }
    }

    const updateStepCount = useCallback(async () => {
        if (hasRequestedAuthorization) {
        HealthKit.getMostRecentQuantitySample(HKQuantityTypeIdentifier.stepCount, HKUnits.Count).then((sample) => {
                console.log('sample', sample)
                setStepCount(sample?.quantity ?? 0)
            })
        }
    }, [hasRequestedAuthorization])

    useEffect(() => {
        HealthKit.requestAuthorization([HKQuantityTypeIdentifier.stepCount]).then(() => {
            setHasRequestedAuthorization(true);
        });
    }, []);

    useEffect(() => {
        updateStepCount()

        let unsubscribe: (() => void) | undefined;

        const subscribe = async () => {
            if (hasRequestedAuthorization) {
                try {
                    unsubscribe = await HealthKit.subscribeToChanges(
                        HKQuantityTypeIdentifier.stepCount,
                        () => updateStepCount()
                    );
                } catch (error) {
                    console.error('Failed to subscribe to heart rate changes', error);
                }
            }
        };

        subscribe();

        return () => {
            unsubscribe?.();
        };
    }, [hasRequestedAuthorization, updateStepCount]);

    const renderWeekCalendar = () => (
        <View>
            <View style={styles.navigationContainer}>
                <Pressable onPress={handlePreviousWeek} style={styles.navigationButton}>
                    <ChevronLeft size={24} color={theme.colors.textSecondary} />
                </Pressable>
                <Text style={styles.monthYear}>{formatMonthYear(currentDate)}</Text>
                <Pressable onPress={handleNextWeek} style={styles.navigationButton}>
                    <ChevronRight size={24} color={theme.colors.textSecondary} />
                </Pressable>
            </View>

            <View style={styles.weekCalendarContainer}>
                {weekDates.map((date, index) => {
                    const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
                    const isSelected = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()
                    const dayColor = isSelected ? theme.colors.primary : theme.colors.textSecondary
                    const dateBgColor = isSelected ? theme.colors.primary : 'transparent'
                    const dateTextColor = isSelected ? theme.colors.text : theme.colors.textSecondary

                    return (
                        <Pressable key={index} style={styles.dateItemContainer} onPress={() => handleDateSelect(date)}>
                            <Text style={[styles.dayText, { color: dayColor }]}>{weekDays[index]}</Text>
                            <Animated.View style={[styles.dateCircle, { backgroundColor: dateBgColor }]}>
                                <Text style={[styles.dateNumText, { color: dateTextColor }]}>{date.getDate()}</Text>
                            </Animated.View>
                            {(isSelected || isToday) && <View style={styles.selectedIndicator} />}
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Logo />
                <Text style={styles.headerTitle}>GoWalk</Text>
            </View>

            <View style={styles.header}>{renderWeekCalendar()}</View>

            <View style={styles.stepsSection}>
                <Text style={styles.sectionLabel}>your steps statistic</Text>
                <View style={styles.statsBox}>
                    <View style={styles.statsColumn}>
                        <Text style={styles.statsLabel}>Today Steps</Text>
                        <Text style={styles.statsNumber}>{stepCount}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statsColumn}>
                        <Text style={styles.statsLabel}>Social Minutes</Text>
                        <Text style={styles.statsNumber}>{stepCount / 100}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.screenTimeSection}>
                <Text style={styles.sectionLabel}>your screen time</Text>
                <Text style={styles.screenTimeValue}>1h 49m</Text>
                <View style={styles.comparisonContainer}>
                    <View style={styles.comparison}>
                        <ArrowDown size={16} color='#22C55E' style={styles.comparisonIcon} />
                        <Text style={styles.comparisonText}>20% vs this point yesterday</Text>
                    </View>
                    <Text style={styles.comparisonSubtext}>28m less – you're doing amazing</Text>
                </View>

                <View style={styles.chartContainer}>
                    <BarChart data={USAGE_DATA} />
                </View>
            </View>

            <View style={styles.usageSection}>
                <Text style={styles.sectionLabel}>your usage</Text>
                {APPS.map((app) => (
                    <View key={app.id} style={styles.appItem}>
                        <View style={styles.appIcon}>
                            <Image source={{ uri: app.icon }} style={styles.appIconImage} resizeMode='cover' />
                        </View>
                        <View style={styles.appInfo}>
                            <Text style={styles.appName}>{app.name}</Text>
                            <Text style={styles.appCategory}>{app.category}</Text>
                        </View>
                        <Text style={styles.appDuration}>{app.duration}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    headerTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 34,
        color: theme.colors.text
    },
    header: {
        padding: 20
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    monthYear: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: theme.colors.textSecondary
    },
    navigationButton: {
        padding: 8
    },
    weekCalendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border
    },
    dateItemContainer: {
        alignItems: 'center',
        paddingHorizontal: 4
    },
    dayText: {
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        marginBottom: 8,
        textTransform: 'uppercase'
    },
    dateCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateNumText: {
        fontFamily: 'Inter-Bold',
        fontSize: 16
    },
    selectedIndicator: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: theme.colors.primary,
        marginTop: 4
    },
    stepsSection: {
        padding: 20,
        marginBottom: 24
    },
    sectionLabel: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase'
    },
    statsBox: {
        flexDirection: 'row',
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 24,
        padding: 24
    },
    statsColumn: {
        flex: 1
    },
    divider: {
        width: 1,
        backgroundColor: theme.colors.border,
        marginHorizontal: 24
    },
    statsLabel: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginBottom: 8
    },
    statsNumber: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        color: theme.colors.primary,
        marginBottom: 8
    },
    statsUnit: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary
    },
    screenTimeSection: {
        marginHorizontal: 20,
        marginBottom: 24
    },
    screenTimeValue: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 8
    },
    comparisonContainer: {
        marginBottom: 16,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        padding: 10,
        borderRadius: 8
    },
    comparison: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    comparisonIcon: {
        marginRight: 6,
        transform: [{ rotate: '45deg' }]
    },
    comparisonText: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: '#22C55E'
    },
    comparisonSubtext: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: theme.colors.textSecondary
    },
    chartContainer: {
        height: 180,
        marginTop: 16
    },
    usageSection: {
        paddingTop: 42,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    appItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border
    },
    appIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        marginRight: 16
    },
    appIconImage: {
        width: '100%',
        height: '100%'
    },
    appInfo: {
        flex: 1
    },
    appName: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4
    },
    appCategory: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: theme.colors.textSecondary
    },
    appDuration: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: theme.colors.text
    }
})
