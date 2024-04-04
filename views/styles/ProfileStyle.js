import { StyleSheet, Platform } from "react-native";

export const ProfileStyle = StyleSheet.create({
    body: {
        alignItems: 'center',
        paddingTop: 20,
        //backgroundColor: '#F0F0F0'
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '90%'
    },
    profilePic: {
        width: 200,
        height: 200,
        margin: 20,
        borderRadius: 120,
        borderWidth: 2,
        borderColor: '#4E504E'
    },
    profileName: {
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        padding: 1,
        color: "#656565",
    },
    birthText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: "#656565",
        margin: 4
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        margin: 10
    },
    spacer: {
        margin: 8
    }
});

export const Setup = StyleSheet.create({
    message: {
        textAlign: 'center',
        padding: 15,
        fontSize: 16
    }
});

export const EditBtn = StyleSheet.create({
    button: {
        margin: 40,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#BCC1BA',
        borderRadius: 8,
        justifyContent: 'center',
        alignContent: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 1,
            },
            android: {
              elevation: 2,
            },
          }),
    },
    text: {
        fontSize: 18,
        fontWeight: '100',
        color: "#656565"
    }
})