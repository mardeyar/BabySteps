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
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgb(211, 230, 255)',
        borderRadius: 100,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 0.3,
        justifyContent: 'center',
        alignContent: 'center',
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
            },
            android: {
              elevation: 1,
            },
          }),
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
        color: "rgba(0, 0, 0, 0.7)"
    }
})

export const HeaderStyle = StyleSheet.create({
  text: {
    fontFamily: 'Carrois',
    fontSize: 28,
    fontWeight: 'bold'
  }
})