import React, { useEffect, useState } from 'react';
import { Card } from '@rneui/themed';
import { View, Text, Image } from 'react-native';
import { checkData } from '../../database/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';

import { ProfileStyle } from '../styles/ProfileStyle';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [babyPhoto, setBabyPhoto] = useState('');

    useFocusEffect(() => {
        checkData((data) => {
            if (data.length > 0) {
                setFirstName(data[0].first_name);
                setLastName(data[0].last_name);
                setDob(data[0].dob);
                setBabyPhoto(data[0].photo);
            }
        });
    });

    return(
        <View style={ProfileStyle.body}>
            <View style={ProfileStyle.cardContainer}>
                {babyPhoto ? (
                    <Image source={{ uri: babyPhoto}} style={ProfileStyle.profilePic} />
                ) : null}
                <Text style={ProfileStyle.profileName}>{firstName} {lastName}</Text>
                <Text style={ProfileStyle.birthText}>Born on {dob}</Text>
            </View>
        </View>
    )
}

export default Profile;