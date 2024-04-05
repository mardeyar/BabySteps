import { StyleSheet } from "react-native";

export const InfoContainer = StyleSheet.create({
    body: {
        margin: 8
    },
    spacer: {
        margin: 4
    }
})

export const AppInformation = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.7)'
    },
    divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 5
    },
    bodyText: {
        marginTop: 4,
        marginBottom: 4,
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.8)'
    },
    list: {
        marginTop: 2,
        marginBottom: 2,
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.8)'
    },
    boldStyle: {
        fontWeight: '700'
    },
    link: {
        color: '#5D94B1',
        fontWeight: '600'
    }
})