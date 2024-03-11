import React, { useState } from "react";
import { TextInput, SafeAreaView, StyleSheet } from "react-native";

const MilestoneBody = ({ text, setText }) => {
    return (
            <TextInput 
                style={styles.textField}
                onChangeText={setText}
                value={text}
            />
    );
}

const styles = StyleSheet.create({
    textField: {
        height: 100,
        margin: 10,
        borderWidth: 1,
        padding: 3,
        textAlign: 'left'
    }
})

export default MilestoneBody;