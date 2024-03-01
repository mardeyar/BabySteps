import React, { useState } from "react";
import { Text, View, CheckBox, Button } from "react-native";
import { disclaimerCheck } from "../../database/DatabaseManager";

const Disclaimer = () => {
    // Check to see user has acknowledged the discalimer
    const [disclaimer, setDisclaimer] = useState(false);

    const handleDisclaimer = () => {
        disclaimerCheck(disclaimer ? 1 : 0);
    }

    return (
        <View>
            <Text>About</Text>
            <Text>BabySteps is designed to help you keep track of each and every milestone your baby does through as they grow up. From their first arrival home from the hospital 
            to their first steps, you can keep every memory of your little ones amazing accomplishments close by. As they age each week, you can attach photos or videos to each 
            milestone for a keepsake and look back on those memories as the grow up. Think of BabySteps as your digital babybook.</Text>
            <Text>Disclaimer</Text>
            <Text>BabySteps does not communicate with any other services outside of your device. This means that any and all data about your baby will be kept on your device 
            and not seen by any 3rd parties, keeping your information private to only you. Due to this storage method, your data being contained to your device means there are 
            no backup options should you delete the app; deleting BabySteps from your device means deleting all data associated with BabySteps that you have entered up to this 
            point.</Text>
            <CheckBox
                value={disclaimer}
                onValueChange={setDisclaimer}
            />
            <Text>Acknowledge</Text>
            <Button title="Continue" onPress={handleDisclaimer}/>
        </View>
    );
}

export default Disclaimer;