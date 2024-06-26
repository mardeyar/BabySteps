import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import * as Haptics from 'expo-haptics';

import { MemoryFeed } from "../views/styles/Home";

const MemoryCard = ({ style, memoryDate, memoryName, memoryInfo, photo, onPressPhoto, onLongPressDelete, memoryId }) => {
    // Some weird happening is displaying these dates 1 day early so add +1 to the date to get it to display properly
    // Temp measure for now until it is fixed
    const date = new Date(memoryDate);
    date.setDate(date.getDate() + 1);
    const formattedDate = format(date, 'MMMM dd, yyyy');

    const handleLongPress = () => {
        onLongPressDelete(memoryId);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <TouchableOpacity onLongPress={handleLongPress} activeOpacity={0.9}>
            <View style={[MemoryFeed.card, style]}>
                <View style={MemoryFeed.divider}>
                    <Text style={MemoryFeed.dateText}>{formattedDate}: {memoryName}</Text>
                </View>
                
                <View style={MemoryFeed.row}>
                    <Text style={MemoryFeed.memoryText}>{memoryInfo}</Text>
                    <TouchableOpacity onPress={onPressPhoto} activeOpacity={0}>
                        {photo && <Image source={{ uri: photo }} style={MemoryFeed.image} />}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default MemoryCard;