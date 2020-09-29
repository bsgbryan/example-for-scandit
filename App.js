/* START app.js file copied from BarcodeCaptureSimpleSample */

// import React, { Component } from 'react';
// import { Alert, BackHandler } from 'react-native';
// import {
//   BarcodeCapture,
//   BarcodeCaptureOverlay,
//   BarcodeCaptureSettings,
//   Symbology,
//   SymbologyDescription,
// } from 'scandit-react-native-datacapture-barcode';
// import {
//   Camera,
//   CameraSettings,
//   DataCaptureContext,
//   DataCaptureView,
//   FrameSourceState,
//   RectangularViewfinder,
//   VideoResolution,
// } from 'scandit-react-native-datacapture-core';

// import { requestCameraPermissionsIfNeeded } from './camera-permission-handler';

// export default class App extends Component {

//   constructor() {
//     super();

//     // Create data capture context using your license key.
//     this.dataCaptureContext = DataCaptureContext.forLicenseKey('AUIPLwqHFVp0CgRf+xMUkxga6IF8PPxEwWEM1cF7ZToDfDrNol17lmxsYjkHRfXcZm4LrGVwqakycRMSSjMbaIBz8qfUZUMXTACjAO9P6lseR+SVyHFRmvJdV/kQGHoV/0yIeDxjrWxpW0SKxG+9g9Nop1StLdgmsGaYjbtsSJKFfKaPoyTwfgZXxKYedSzH2VA+USJAPdurcYpWK1l3V7tD1oTITTzXGi/tPjhOWlBKfObudnwytc18vSmwWuWfqn2ERx1QKBGgZey5/msMRXIglYLGZenYcHdfA2lR/v2XeT3mBU6YhVdIiSk6W+ru33X9OsNL4UVIfHQ8N29KlfxKSvJVLG4HIkW62kBw5zlGUcZzoXk/nVBtwefJZNI1J1pdglV++Q5EDclu7Vjpfk9vyH82Zl8EIWbXo8NJwPJEVOFclkpsBJhtLNGEfjkwEGM2bkR5321qKjOy03TVqP9aE/S1ehjIDmfaZ8VEXykIZPWY7UyZUTBvcA6SZVeMNRvVZl8t740+HO/Q+yZbo9hNIl1Pe9KsmMtzu58KclrluzYwH6rmQsXS5BiYADhQXlOIBKwQ5abfQpwdToMTxAQ5OHwnNc9hQVuT/ROmlBYvgYJ9gJYbxbBCzwtedBPwa0d4gyBTOU+a9A5nf0X4AT0FvFMh1zMJC/kL+z+QzbQQSktdDUPtH8rJzG00mIAO+G4iVudXl8Z5ej7CYB67jl7cmmT+nzpoQL2CPTGF2b9+2zfSpk22So25EszO1KASu8MURXOtOFd6M9Nw65atN+FrcYU3NjipNC+Gp0MK84YeUTYsxwA1QERH31m37XL+Mpn7w4bIuzM8ZS4k22AIgqMlScuaMTzAlswsTqGxpIn18V4XAppobUKBv3pKjiuTwD1fAP0qYl2uso6RDIgAR5BlXmmIhgT5SJhvlPxiolNFOwRaBK6D4Pj05/Ko/S6FicM1tRVMLc1pb2KgjONcfeQHKGeNlGu15uNGVCQXtRNPVGXhlijIg8KigWZABI5xvD+yFf7D2lqmEFAyz/FmTaFr2oJOEYazE4c++E8Vona17DgAakCOxdQO0vW2v1eYOhj2GXt8MzNX1n9ISMprdLu0ocRMokWCeghpgQRQMyrRiOtI37QmQFSeopEk3XvM6XS/jTi1671SaygVcWN6mHh5y28yZLQt6qKuJwgx1/jr57dYxDQQrMFW49LPUbo=');
//     this.viewRef = React.createRef();
//   }

//   async componentDidMount() {
//     this.startCamera();
//     this.startScanner();
//     this.barcodeCaptureMode.isEnabled = true;
//   }

//   componentWillUnmount() {
//     this.stopCamera();
//     this.dataCaptureContext.dispose();
//   }

//   stopCamera() {
//     if (this.camera) {
//       this.camera.switchToDesiredState(FrameSourceState.Off);
//     }
//   }

//   startCamera() {
//     if (!this.camera) {
//       // Use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
//       // default and must be turned on to start streaming frames to the data capture context for recognition.
//       this.camera = Camera.default;
//       this.dataCaptureContext.setFrameSource(this.camera);

//       const cameraSettings = new CameraSettings();
//       cameraSettings.preferredResolution = VideoResolution.FullHD;
//       this.camera.applySettings(cameraSettings);
//     }

//     // Switch camera on to start streaming frames and enable the barcode capture mode.
//     // The camera is started asynchronously and will take some time to completely turn on.
//     requestCameraPermissionsIfNeeded()
//       .then(() => this.camera.switchToDesiredState(FrameSourceState.On))
//       .catch(() => BackHandler.exitApp());
//   }

//   startScanner() {
//     // The barcode capturing process is configured through barcode capture settings
//     // and are then applied to the barcode capture instance that manages barcode recognition.
//     const settings = new BarcodeCaptureSettings();

//     // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
//     // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
//     // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
//     settings.enableSymbologies([
//       Symbology.EAN13UPCA,
//       Symbology.EAN8,
//       Symbology.UPCE,
//       Symbology.QR,
//       Symbology.DataMatrix,
//       Symbology.Code39,
//       Symbology.Code128,
//       Symbology.InterleavedTwoOfFive,
//     ]);

//     // Some linear/1d barcode symbologies allow you to encode variable-length data. By default, the Scandit
//     // Data Capture SDK only scans barcodes in a certain length range. If your application requires scanning of one
//     // of these symbologies, and the length is falling outside the default range, you may need to adjust the "active
//     // symbol counts" for this symbology. This is shown in the following few lines of code for one of the
//     // variable-length symbologies.
//     const symbologySettings = settings.settingsForSymbology(Symbology.Code39);
//     symbologySettings.activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

//     // Create new barcode capture mode with the settings from above.
//     this.barcodeCaptureMode = BarcodeCapture.forContext(this.dataCaptureContext, settings);

//     // Register a listener to get informed whenever a new barcode got recognized.
//     this.barcodeCaptureListener = {
//       didScan: (_, session) => {
//         const barcode = session.newlyRecognizedBarcodes[0];
//         const symbology = new SymbologyDescription(barcode.symbology);

//         // The `alert` call blocks execution until it's dismissed by the user. As no further frames would be processed
//         // until the alert dialog is dismissed, we're showing the alert through a timeout and disabling the barcode
//         // capture mode until the dialog is dismissed, as you should not block the BarcodeCaptureListener callbacks for
//         // longer periods of time. See the documentation to learn more about this.
//         this.barcodeCaptureMode.isEnabled = false;

//         Alert.alert(
//           null,
//           `Scanned: ${barcode.data} (${symbology.readableName})`,
//           [{ text: 'OK', onPress: () => this.barcodeCaptureMode.isEnabled = true }],
//           { cancelable: false }
//         );
//       }
//     };

//     this.barcodeCaptureMode.addListener(this.barcodeCaptureListener);

//     // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
//     // the video preview. This is optional, but recommended for better visual feedback.
//     this.overlay = BarcodeCaptureOverlay.withBarcodeCaptureForView(this.barcodeCaptureMode, this.viewRef.current);
//     this.overlay.viewfinder = new RectangularViewfinder();
//     this.overlay = this.overlay;
//   }

//   render() {
//     return (
//       <DataCaptureView style={{ flex: 1 }} context={this.dataCaptureContext} ref={this.viewRef} />
//     );
//   };
// }

/* END app.js file copied from BarcodeCaptureSimpleSample */

/* START App.js file generated by create-react-native-app */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/* END App.js file generated by create-react-native-app */

