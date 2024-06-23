import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

import * as Icon from "react-native-feather";

export default function QRScanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const getRestaurandId = (qr_string) => {
    const segments = qr_string.split("/");
    return segments.pop();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    console.log(getRestaurandId(data));
    navigation.navigate("LocalRestaurant", {
      item: { restaurantId: getRestaurandId(data) },
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>
        <View style={styles.middleContainer}>
          <View style={styles.unfocusedSide}></View>
          <View style={styles.focusedBox}></View>
          <View style={styles.unfocusedSide}></View>
        </View>
        <View style={styles.unfocusedContainer}></View>
      </View>
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Tap to Scan Again
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon.ArrowLeft strokeWidth={3} stroke="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
  },
  middleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  unfocusedSide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  focusedBox: {
    height: 300,
    width: 300,
    borderWidth: 0,
    borderColor: themeColors.bgColor(1),
    backgroundColor: "transparent",
  },
  button: {
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
    backgroundColor: themeColors.bgColor(1),
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  backButton: {
    position: "absolute",
    top: 200,
    alignSelf: "center",
    backgroundColor: themeColors.bgColor(1),
    padding: 10,
    paddingHorizontal: 138,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
