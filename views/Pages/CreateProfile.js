import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import GenderDropdown from '../../components/Dropdown';

import { createProfile } from '../../database/DatabaseManager';
import { infoStyle } from '../styles/firstrun';

const CreateProfile = () => {
    // To use navigation to get from this page to Disclaimer.js
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
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
        // This will format the date to string type instead of numbers ex. April 1/2020 vs 4/01/2020
        const dateFormat = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const formattedDate = date.toLocaleDateString(undefined, dateFormat);
        setDob(formattedDate);
        hideDatePicker();
    }

    const saveToDb = () => {
        // Need to ensure required fields are not null
        if (!firstName || !lastName || !gender || !dob) {
            Alert.alert('Missing information', 'Please fill in all required fields');
            return;
        }

        // Save img path as 'photo' column in the baby_profile table
        createProfile(firstName, lastName, gender, dob, photo || '');
        //navigation.navigate('MainPage', {refresh: true });
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
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
            />
            <GenderDropdown value={gender} setValue={setGender} />
            {/* <TextInput
                style={infoStyle.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            /> */}
            <View>
                <Button title="Select DOB" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    value={dob}
                    textColor='black'
                />
                {/* {dob && <Text>DOB: {dob}</Text>} */}
            </View>
            <Button title="Save" onPress={saveToDb} />
        </View>
    );
};

export default CreateProfile;