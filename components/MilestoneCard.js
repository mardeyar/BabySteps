import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { format } from "date-fns";

const MilestoneCard = ({ milestoneDate, milestoneName, milestoneInfo, photo, onPressPhoto, onLongPressDelete, milestoneId }) => {
    // Some weird happening is displaying these dates 1 day early so add +1 to the date to get it to display properly
    // Temp measure for now until it is fixed
    const date = new Date(milestoneDate);
    date.setDate(date.getDate() + 1);
    const formattedDate = format(date, 'MMMM dd, yyyy');

    const handleLongPress = () => {
        onLongPressDelete(milestoneId);
    };

    return (
        <TouchableOpacity onLongPress={handleLongPress} activeOpacity={1}>
            <Card>
            <Card.Title>{formattedDate}</Card.Title>
            <Card.Divider />
            <View>
                <Text>{milestoneName}</Text>
                <Text>{milestoneInfo}</Text>
                <TouchableOpacity onPress={onPressPhoto} activeOpacity={1}>
                    {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
                </TouchableOpacity>
            </View>
        </Card>
        </TouchableOpacity>
    );
}

export default MilestoneCard;