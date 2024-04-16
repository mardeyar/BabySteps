# Babysteps
Keep memories of your baby on your mobile device in one convenient digital feed.

## About

Babysteps is a memory tracker designed to curate a feed of memories for your baby. Consider Babysteps your digital babybook; you can add memories to your feed and look back on them as the time passes and remark on all your little ones accomplishments. **NOTE:** Babysteps is currently in the _beta release phase_, meaning, bugs are likely and features may not work as intended.

## Features

* Create a profile for your baby
* Attach photos to your memory feed of your baby doing the things you love seeing them do
* Browse your memory feed to see everything your little one has accomplished
* Edit profile: spelled baby's name wrong? Want to change their profile picture? You can make those edits!

## Development Setup

Any IDE should work, platform dependent. Recommended to use either [Android Studio](https://developer.android.com/studio) for developing native Android code or [XCode](https://apps.apple.com/ca/app/xcode/id497799835?mt=12) for developing native code on iOS. If you're not developing any native code you can use [VSCode](https://code.visualstudio.com/download).

Before getting started you will need to ensure all dependencies are installed. Do so by running the following:

```git clone https://github.com/mardeyar/BabySteps.git```

```cd Project/Directory/location```

```npm install```

Replace "Project/Directory/location" with the actual root location of where you git cloned. Running **npm install** will install all needed dependencies for the project. 

This project is configured for use with Expo Go, available on either [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US&pli=1). Open the project in your IDE and open a terminal from the project root. Run the following:

```npx expo start```

This will start a development server on your machine. From your mobile device (either iOS or Android), open the Expo Go app and scan the QR code to open up the project. If everything was set up correctly, Expo Go should now open up your project and it should be viewable on your device.

## User Install Instructions

Installation will vary depending on which device you are installing on. Instructions are below:

### Android

* See the [releases section](https://github.com/mardeyar/BabySteps/releases) and grab the latest release. For Android, this is typically labelled **Babysteps_vX.X_BETA_ANDROID.apk** although this naming will change after beta stage.
* After grabbing the **apk** from releases, navigate to the folder you downloaded it to.
* Open the downloaded **apk** file and tap **install** to install Babysteps to your device.
* Success! Babysteps is now installed on your device.

### iOS

***Not yet supported***

## Preview

Profile section: after filling in the profile creation screen, your profile will be displayed through Settings->Profile where you can also edit your profile.

![2-1](https://github.com/mardeyar/BabySteps/assets/117761940/82775a7c-45cd-443f-9fbf-773e7fca122f)

Settings screen: this is where general information and settings are found.

![3](https://github.com/mardeyar/BabySteps/assets/117761940/f867cb20-1cd7-479c-ba11-8019dc2d67b9)

Add memory: attach a photo, title and description along with date selection for when this memory occured.

![4](https://github.com/mardeyar/BabySteps/assets/117761940/49913bfd-b2f3-4c5e-bece-5a67493918e8)

Main page: this is your feed for all memories that you enter. Upon opening the app it will default to this landing screen.

![1](https://github.com/mardeyar/BabySteps/assets/117761940/5abdd0a0-9515-4d97-8ff2-e490205e655d)

## Known Issues

As Babysteps is a beta release, there are likely to be bugs and issues. Some common issues will be listed here but please see the [issues tab](https://github.com/mardeyar/BabySteps/issues) to raise a bug report if it's not already acknowledged.

**[X]** Dark/light mode toggle doesn't work

**[X]** Video memories not yet supported

**[X]** Date picker displays twice occasionally on Android

## Other Notes

For important notes regarding Babysteps, please check the ***About*** and ***Disclaimer*** sections from within the settings menu.

## License

[License information](https://github.com/mardeyar/BabySteps/blob/main/LICENSE)
