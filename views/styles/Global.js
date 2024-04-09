import { StyleSheet, Platform } from "react-native";
import { DefaultTheme } from "@react-navigation/native";

export const AppColor = StyleSheet.create({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(80, 173, 245)',
    background:'#e7e7e7'
  }
})

export const Btn = StyleSheet.create({
    buttonStyle: {
        margin: 40,
        width: '35%',
        paddingVertical: 12,
        backgroundColor: '#7FBBDC',
        borderRadius: 50,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 0.3,
        justifyContent: 'center',
        alignContent: 'center',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
        color: "rgba(0, 0, 0, 0.85)",
        padding: 0
    }
})