import { Text, View, ScrollView, Linking } from "react-native";

import { AppInformation, InfoContainer } from "../styles/AppInfo";
import { openURL } from "expo-linking";

const About = () => {

    const sendBugReport = async () => {
        const emailUrl = 'mailto:techdevmd@gmail.com?subject=BabySteps:%20Bug%20Report';
        await Linking.openURL(emailUrl);
    };

    const sendFeatureRequest = async () => {
        const emailUrl = 'mailto:techdevmd@gmail.com?subject=BabySteps:%20Feature%20Request';
        await Linking.openURL(emailUrl);
    };

    const repoUrl = async () => {
        const link = "https://github.com/mardeyar/BabySteps";
        await Linking.openURL(link);
    }

    return (
        <ScrollView>
            <View style={InfoContainer.body}>
                <Text style={AppInformation.title}>About BabySteps</Text>
                <View style={AppInformation.divider} />
                <Text style={AppInformation.bodyText}>BabySteps is designed to help you keep track of each and every milestone your baby does through as they grow up.</Text>
                <Text style={AppInformation.bodyText}>From their first arrival home from the hospital 
                to their first steps, you can keep every memory of your little ones amazing accomplishments close by. As they age each week, you can attach photos or videos to each 
                milestone for a keepsake and look back on those memories as the grow up. </Text>
                <Text style={AppInformation.bodyText}>Think of BabySteps as your digital babybook.</Text>

                <View style={InfoContainer.spacer} />

                <Text style={AppInformation.title}>Features</Text>
                <View style={AppInformation.divider} />
                <Text style={AppInformation.bodyText}>BabySteps includes the following features:</Text>
                <Text style={AppInformation.list}>• Ability to create a profile for your baby</Text>
                <Text style={AppInformation.list}>• Edit profile. Change their picture or maybe you spelled their name wrong. Don't worry, you can change that!</Text>
                <Text style={AppInformation.list}>• Create your memory cards and attach pictures and descriptions</Text>
                <Text style={AppInformation.list}>• Browse memories in your home feed</Text>
                <Text style={AppInformation.list}>• <Text style={AppInformation.boldStyle}>Tip: </Text>Want to remove a memory from your feed? Press and hold the memory date to delete</Text>
                <Text style={AppInformation.list}>• Tap a feed photo to view in full screen</Text>
                <Text style={AppInformation.bodyText}>To request features, send an email with your request to <Text style={AppInformation.link} onPress={sendFeatureRequest}>techdevmd@gmail.com</Text></Text>

                <View style={InfoContainer.spacer} />

                <Text style={AppInformation.title}>Bug Reports</Text>
                <View style={AppInformation.divider} />
                <Text style={AppInformation.bodyText}>If you encounter any bugs, you are encouraged to send a description to  
                    <Text style={AppInformation.link} onPress={sendBugReport}> techdevmd@gmail.com</Text> along with a few details such as:
                </Text>
                <Text style={AppInformation.list}>• Device type (ie. iPhone, Android, iPad, etc.)</Text>
                <Text style={AppInformation.list}>• Operating system version (ie. iOS 17.2, Android 12, etc.)</Text>
                <Text style={AppInformation.list}>• What were you doing when the bug occurred?</Text>
                <Text style={AppInformation.list}>• What you expected to happen? What actually happened?</Text>
                <Text style={AppInformation.bodyText}>You can view a list of known bugs from <Text style={AppInformation.link} onPress={repoUrl}>BabySteps GitHub repository </Text>
                by visiting the <Text style={AppInformation.boldStyle}>issues tab.</Text>
                </Text>
            </View>
        </ScrollView>
        
    );
};

export default About;