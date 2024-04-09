import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { checkData } from '../../database/DatabaseManager';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { ProfileStyle, Setup } from '../styles/ProfileStyle';
import { Btn } from '../styles/Global';

const Profile = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [dadName, setDadName] = useState('');
    const [momName, setMomName] = useState('');
    const [birthHeight, setBirthHeight] = useState('');
    const [birthLb, setBirthLb] = useState('');
    const [birthOz, setBirthOz] = useState('');
    const [babyPhoto, setBabyPhoto] = useState('');

    useFocusEffect(() => {
        checkData((data) => {
            if (data.length > 0) {
                setFirstName(data[0].first_name);
                setLastName(data[0].last_name);
                setDob(data[0].dob);
                setDadName(data[0].dad_name);
                setMomName(data[0].mom_name);
                setBirthHeight(data[0].birth_height);
                setBirthLb(data[0].birth_weight_lb);
                setBirthOz(data[0].birth_weight_oz);
                setBabyPhoto(data[0].photo);
            }
        });
    });

    const handleEditProfile = () => {
        navigation.navigate('Edit Profile');
    };

    // This is to format DOB down below to a more readable format
    const formattedDOB = new Date(dob).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        timeZone: 'UTC'
    });

    return(
        <View style={ProfileStyle.body}>
            {firstName ? (
                <View style={ProfileStyle.cardContainer}>
                    {/* This block of code will avoid the error message about "empty uri.string" */}
                    {babyPhoto ? (
                        <Image source={{ uri: babyPhoto}} style={ProfileStyle.profilePic} />
                    ) : null}
                    <Text style={ProfileStyle.profileName}>{firstName} {lastName}</Text>
                    <View style={ProfileStyle.divider} />
                    <Text style={ProfileStyle.birthText}>Your journey began on {formattedDOB} when {dadName} & {momName} welcomed you into the world with loving arms.</Text>
                    <View style={ProfileStyle.spacer}/>
                    <Text style={ProfileStyle.birthText}>You arrived clocking in at a height of {birthHeight} inches and weighed {birthLb}lbs {birthOz}oz.</Text>
                    <View style={ProfileStyle.divider} />
                    <TouchableOpacity style={Btn.buttonStyle} onPress={handleEditProfile}>
                        <Text style={Btn.text}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={Setup.message}>You have not set up your babys profile yet. You can do so by navigating to the settings menu and tapping 'Create Profile'</Text>
            )}
        </View>
    )
}

export default Profile;