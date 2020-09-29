# Ways to create a React Native app

1. `npx react-native init` - This is considered legacy. It has not been deprecated, but it is no longer the preferred, or standard, way to create a React Native app. It is presented as an option for creating a React Native app in the documentation, but it is not the default.

2. `npx create-react-native-app` - This is a middle ground between the legacy method and the `expo init` method. This is essentially the same thing as creating a project using `expo init` and then ejecting it. Projects created this way use Expo's Bare workflow. This method is not detailed in the React Native documentation.

3. `expo init` This is the method referenced by default in React Native's own [documentation](https://reactnative.dev/docs/environment-setup). Creating a project this way uses Expo's Managed workflow.

> It is important to note that Expo is the direction React Native is heading. All of the React Native documentation uses Expo "snacks". The documentation assumes, wherever possible, that the project was created using `expo init`.

> To maintain relevance in the React Native community it is essential to implement support for at least the Expo Bare workflow.

Expo's documentation describes the Managed and Bare [workflows](https://docs.expo.io/introduction/managed-vs-bare/) is detail.

# Schnucks apps

The Schnucks Teammate app cannot the Managed as it needs to install native third party modules.

Moving forward, Schnucks will be doing everything possible to stay current and relevant with the React Native community (_to fascilitate hiring, maintain efficiant development, and stay current with best practices_).

As part of it's ongoing development, the Rewards app will be modernized to use the Expo Bare workflow to stay current with React Native best practices and gain all the advantages the toolchain offers.

All new Schnucks React Native apps will follow React Native's recommended best practices (_using `expo init` where possible and `create-react-native-app` where not_).

# Notes about this project

This project was create using:

1. `npx create-react-native-app`
1. selecting the "Default new app" option
1. Adding the local path for `scandit-react-native-datacapture-barcode` and `scandit-react-native-datacapture-core` package.json
1. `yarn` (_to install newly-added node modules_)
1. `cd ios`
1. `pod install` (_to install newly added pods_)
1. `cd ..`
1. `react-native run-ios --device` (_to build the app and run it on my connected device_)

# Results

When the contents of the `App.js` file added by `create-react-native-app` are used, the app builds, deploys, loads, and runs as expected.

When the contents copied from the BarcodeCaptureSimpleSample `App.js` and `camera-permissions-handler.js` files are used the app hard crashes immediately.

I think this hard crash is the same behavior as what is seen in the Teammate app, it's just exhibiting here differently because the `DataCaptureView` component is the first and only thing rendered by React Native.

