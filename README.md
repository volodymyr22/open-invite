# Open Invite

## Prerequisites

[Install node](https://nodejs.org/en/download/)

[Install yarn](https://classic.yarnpkg.com/en/)

[Install Cocoapods](https://guides.cocoapods.org/using/getting-started.html)

[Install Gradle](https://gradle.org/)

[Xcode](https://developer.apple.com/xcode/)

[Android studio](https://developer.android.com/studio)


## Getting Started

`yarn install` To install all dependencies

`cd ios && pod install && cd ..`

`cd android && ./gradlew clean && cd ..`

`npx react-native run-ios` Run on iOS simulator

`npx react-native run-ios --simulator="SIMULATOR_NAME"` Run on a specific device

`npx react-native run-android` Run on an android device

`yarn run start` Start metro server

`yarn run start --reset-cache` Reset cache and start metro server


## 3rd Party

1. [Forms](https://jaredpalmer.com/formik/)
2. [Form validation](https://www.npmjs.com/package/yup)
3. [OTP](https://www.npmjs.com/package/@twotalltotems/react-native-otp-input)
4. [StyledComponents](https://styled-components.com/)
5. [Firebase](https://rnfirebase.io/)
6. [Redux](https://redux.js.org/)

## References
1. [React Native](https://reactnative.dev/docs/getting-started)

## Steps - Run on ios device

1. `yarn install` To install all dependencies
2. `cd ios && pod install && cd ..` Install pod dependencies for ios
3. `npx react-native run-ios` Run on ios simulator or `npx react-native run-ios --simulator="SIMULATOR_NAME"` to run on specific simulator

## Steps - Build ios app 

1. Open ios folder as project using xcode
2. Choose Any iOS device in device selection dropdown(top pane)
3. Product -> Clean build folder
4. Product -> Archive
5. In the wizrd 
  * Select you profiles
  * Choose `App store distribution`
  * And export the `.ipa`
6. Install Transporter app from App store.
7. Select the exported ipa file and click upload.
8. Login to app store connect using any browser and approve the build.

`Assumed the developer account is logged in on both xcode and transporter app`
