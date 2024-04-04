import { StyleSheet, Platform } from "react-native";

export const Body = StyleSheet.create({
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    inputRow: {
        alignItems: 'center',
        width: '100%',
    },
    labelText: {
        fontWeight: '600',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    inputField: {
        paddingHorizontal: 7,
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: '#909090',
        width: '90%',
        borderRadius: 5
    },
    numberRow: {
        flexDirection: 'row'
    },
    numberInput: {
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 13,
        borderColor: '#909090',
        width: '30%',
        margin: 1,
        borderRadius: 5
    }
});

export const photoBackground = {
    backgroundColor: 'transparent'
};

export const infoStyle = StyleSheet.create({
    photo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: '#4E504E',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    placeholder: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        borderColor: '#5A5A5A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 15,
        backgroundColor: '#424242',
        padding: 10,
        borderRadius: 100
    },
    addPhoto: {
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 0.7)'
    }
});

export const displayMessage = StyleSheet.create({
    styleErer: {
        padding: 20,
        fontSize: 16,
        textAlign: 'center'
    }
});