import { StyleSheet } from "react-native"

export const SettingsContainer = StyleSheet.create({
    body: {
        marginTop: 20
    },
    containerStyle: {
        margin: 5,
        borderColor: '#BCC1BA',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    label: {
        fontWeight: '700',
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: 'rgba(0, 0, 0, 0.8)'
    }
})

export const SettingsCard = StyleSheet.create({
    cardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 15,
        borderRadius: 10
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#BCC1BA',
    }
})