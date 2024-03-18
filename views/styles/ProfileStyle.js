import { StyleSheet, Platform } from "react-native";

export const ProfileStyle = StyleSheet.create({
    body: {
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#F0F0F0'
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D8DC',
        padding: 20,
        borderRadius: 15,
        border: 2,
        width: '90%',
        borderWidth: 1,
        borderColor: '#989593',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,        
            },
            android: {
                elevation: 5,
            },
        }),
    },
    profilePic: {
        width: 250,
        height: 250,
        margin: 20,
        borderRadius: 120,
        borderWidth: 2,
        borderColor: '#989593'
    },
    profileName: {
        fontFamily: 'Urbanist',
        fontSize: 32,
        padding: 10
    },
    birthText: {
        fontFamily: 'Urbanist',
        fontSize: 18
    }
})