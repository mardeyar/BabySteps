import { Text, View, ScrollView } from "react-native";
import { AppInformation, InfoContainer } from "../styles/AppInfo";

const Disclaimer = () => {

    return (
        <ScrollView>
            <View style={InfoContainer.body}>
                <Text style={AppInformation.title}>Data Storage</Text>
                <View style={AppInformation.divider} />
                <Text style={AppInformation.bodyText}>BabySteps does not communicate with any other services outside of your device. This means that any and all data about your baby will be kept on your device 
                and not seen by any 3rd parties, keeping your information private to only you.</Text>
                <Text style={AppInformation.bodyText}>Due to this storage method, your data being contained to your device means there are 
                no backup options should you delete the app; deleting BabySteps from your device means deleting all data associated with BabySteps that you have entered up to this 
                point.</Text>

                <View style={InfoContainer.spacer} />

                <Text style={AppInformation.title}>App State</Text>
                <View style={AppInformation.divider} />
                <Text style={AppInformation.bodyText}>This app is currently in a <Text style={AppInformation.boldStyle}>beta release</Text> stage. 
                This means that bugs are likely and certain features may not work as intended.</Text>
            </View>

        </ScrollView>
        
    );
};

export default Disclaimer;