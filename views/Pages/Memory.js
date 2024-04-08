import React, { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { View, TextInput, Button, Image, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { infoStyle } from '../styles/CreationStyle';
import { MemoryStyle } from "../styles/MemoryStyle";
import { Btn } from "../styles/Global";
import { createMemory } from '../../database/DatabaseManager';

const Memory = () => {
    const navigation = useNavigation();
    
    const [memoryDate, setMemoryDate] = useState(new Date());
    const [memoryInfo, setMemoryInfo] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // TODO: Change this to better suit a posting image instead of profile 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: undefined,
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = (date) => {
        setMemoryDate(date);
        hideDatePicker();
    }

    // Format the memory date into readable format and set timezone to avoid issues
    const dateFormat = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const saveToDb = () => {
        // Need to ensure required fields are not null
        if (!memoryDate || !memoryInfo) {
            Alert.alert('Missing information', 'Please fill in all required fields');
            return;
        }

        // Save img path as 'photo' column in the milestones table
        createMemory(memoryDate.toISOString().split('T')[0], memoryInfo, photo || '');
        Alert.alert('Success', 'Memory created!', [
            { text: 'OK', onPress: () => {
                // Reset all state variable to clear the screen then nav to home
                setMemoryDate(new Date());
                setMemoryInfo('');
                setPhoto('');

                navigation.navigate('Home', { refresh: true });
            }}
        ]);
    };

    // The view
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
            style={{ flex: 1 }}
        >

        <ScrollView contentContainerStyle={MemoryStyle.scrollContainer}>
            <TouchableOpacity onPress={pickImage}>
                <View style={[infoStyle.photo, { backgroundColor: photo ? 'transparent' : '#ECE9E9' }]}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={infoStyle.photo} />
                    ) : (
                        <View style={infoStyle.placeholder}>
                            <Text>Add Photo</Text>
                            <MaterialCommunityIcons name="plus" size={32} color="#5A5A5A" />
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <Text style={MemoryStyle.label}>Description</Text>
            <TextInput
                style={MemoryStyle.memoryField}
                onChangeText={setMemoryInfo}
                value={memoryInfo}
                placeholder="Enter a description about this photo"
                multiline={true}
            />

            
            <Text style={MemoryStyle.label}>Memory Date</Text>
                <TouchableOpacity style={MemoryStyle.memoryTitle} onPress={showDatePicker}>
                    <Text style={{ color: memoryDate ? 'black' : 'gray' }}>{dateFormat(memoryDate) || 'Select Date'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    value={memoryDate}
                    date={memoryDate || new Date()}
                    textColor='black'
                />

            <TouchableOpacity
                style={Btn.buttonStyle}
                title="Save" 
                onPress={saveToDb} 
            >
                <Text style={Btn.text}>Save Memory</Text>
            </TouchableOpacity>

        </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Memory;