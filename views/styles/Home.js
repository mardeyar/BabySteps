import { StyleSheet } from "react-native";

export const MemoryFeed = StyleSheet.create({
    card: {
        width: '100%',
        flex: 1,
        backgroundColor: 'rgb(242, 242, 242)',
        marginBottom: 8,
        paddingVertical: 10
    },
    divider: {
        borderBottomColor: '#BABABA',
        borderBottomWidth: .5,
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
    dateText: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        borderBottomColor: "#909090",
        borderBottomWidth: 5,
    },
    memoryText: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: '500'
    },
    memoryTitle: {
        width: '90%',
        borderColor: '#909090',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    memoryField: {
        width: '90%',
        borderColor: '#909090',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        height: 100
    },
    label: {
        fontWeight: '600',
        width: '90%',
        paddingVertical: 8,
    },
    image: {
        width: "95%",
        height: 300,
        resizeMode: 'cover',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

export const NoMemory = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20
    },
    span: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
