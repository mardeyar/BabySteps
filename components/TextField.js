import React, { useState } from "react";
import { TextInput, SafeAreaView, StyleSheet } from "react-native";

const TextField = () => {
    const [text, setText] = useState('');

    return (
        <SafeAreaView>
            <TextInput 
                style={styles.textField}
                onChangeText={setText}
                value={text}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textField: {
        height: 100,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
})

export default TextField;