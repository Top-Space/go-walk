import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput, Image, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Search, X } from 'lucide-react-native'
import { theme } from '@/utils/theme'

const APPS = [
    {
        id: 'facebook',
        name: 'Facebook',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png'
    },
    {
        id: 'twitter',
        name: 'X',
        icon: 'https://img.freepik.com/darmowe-wektory/nowy-projekt-ikony-x-logo-twittera-2023_1017-45418.jpg'
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        icon: 'https://animationvisarts.com/wp-content/uploads/2024/01/image.png'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png'
    },
    {
        id: 'telegram',
        name: 'Telegram',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png'
    }
]

interface AddAppModalProps {
    visible: boolean
    onClose: () => void
    onAdd: (app: (typeof APPS)[0]) => void
}

export default function AddAppModal({ visible, onClose, onAdd }: AddAppModalProps) {
    const insets = useSafeAreaInsets()
    const [search, setSearch] = useState('')
    const [selectedApp, setSelectedApp] = useState<(typeof APPS)[0] | null>(null)

    const filteredApps = APPS.filter((app) => app.name.toLowerCase().includes(search.toLowerCase()))

    const handleAdd = () => {
        if (selectedApp) {
            onAdd(selectedApp)
            onClose()
        }
    }

    if (!visible) return null

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable style={styles.closeButton} onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <X size={24} color={theme.colors.text} />
                </Pressable>
                <Text style={styles.headerTitle}>Add App</Text>
                <Pressable style={[styles.addButton, !selectedApp && styles.addButtonDisabled]} onPress={handleAdd} disabled={!selectedApp}>
                    <Text style={[styles.addButtonText, !selectedApp && styles.addButtonTextDisabled]}>Add</Text>
                </Pressable>
            </View>

            <View style={styles.searchContainer}>
                <Search size={20} color={theme.colors.textSecondary} />
                <TextInput style={styles.searchInput} placeholder='Search apps' placeholderTextColor={theme.colors.textSecondary} value={search} onChangeText={setSearch} />
            </View>

            <ScrollView style={styles.content}>
                {filteredApps.map((app) => (
                    <Pressable key={app.id} style={({ pressed }) => [styles.appItem, selectedApp?.id === app.id && styles.appItemSelected, pressed && styles.appItemPressed]} onPress={() => setSelectedApp(app)}>
                        <Image source={{ uri: app.icon }} style={styles.appIcon} />
                        <Text style={styles.appName}>{app.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 17,
        color: theme.colors.text
    },
    addButton: {
        width: 60,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonDisabled: {
        opacity: 0.5
    },
    addButtonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 17,
        color: theme.colors.primary
    },
    addButtonTextDisabled: {
        color: theme.colors.textSecondary
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundSecondary,
        margin: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        height: 44
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 17,
        color: theme.colors.text,
        fontFamily: 'Inter-Regular'
    },
    content: {
        flex: 1,
        paddingHorizontal: 16
    },
    appItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8
    },
    appItemSelected: {
        backgroundColor: theme.colors.backgroundSecondary
    },
    appItemPressed: {
        opacity: 0.8
    },
    appIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        marginRight: 12
    },
    appName: {
        fontFamily: 'Inter-Medium',
        fontSize: 17,
        color: theme.colors.text
    }
})
