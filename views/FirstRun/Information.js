import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createProfile } from '../../database/DatabaseManager';
import { infoStyle } from '../styles/firstrun';

const Information = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // This code block is here to ask the user permission to access photos for setting profile picture
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
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
        setDob(date);
        hideDatePicker();
    }

    const saveToDb = () => {
        // Need to ensure required fields are not null
        if (!firstName || !lastName || !gender || !dob) {
            Alert.alert('Missing information', 'Please fill in all required fields');
            return;
        }

        // Save img path as 'photo' column in the baby_profile table
        createProfile(firstName, middleName, lastName, gender, dob, photo || '');
        Alert.alert('Success', 'Your babys profile has been created!');
    };

    return (
        <View style={infoStyle.container}>
            {photo && <Image source={{ uri: photo }} style={infoStyle.photo} />}
            <Button title="Choose photo" onPress={pickImage} />
            <TextInput
                style={infoStyle.input}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={infoStyle.input}
                placeholder="Middle name"
                value={middleName}
                onChangeText={setMiddleName}
            />
            <TextInput
                style={infoStyle.input}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={infoStyle.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />
            <View>
                <Button title="Select DOB" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            {/* <TextInput
                style={infoStyle.input}
                placeholder="DOB (YYYY-MM-DD)"
                value={dob}
                onChangeText={setDob}
            /> */}
            <Button title="Continue" onPress={saveToDb} />
        </View>
    );
};

export default Information;