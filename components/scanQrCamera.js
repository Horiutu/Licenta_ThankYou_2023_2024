import { useState } from "react";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import { themeColors } from "../theme";

const QRCodeScanner = () => {
  const handleBarCodeRead = ({ type, data }) => {
    // Handle the QR code data
    alert(`QR code with type ${type} and data ${data} has been scanned!`);
  };
  const [showScanner, setShowScanner] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {showScanner ? (
        <RNCamera
          style={{ flex: 1 }}
          onBarCodeRead={handleBarCodeRead}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >
          {/* You can customize the camera view here */}
        </RNCamera>
      ) : (
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={() => setShowScanner(true)}
          className="flex-row justify-center items-center mx-5 rounded-r-lg rounded-l-lg p-4 py-3 mb-2 shadow-lg shadow"
        >
          <View>
            <Text className="flex-1 text-center font-extrabold text-white text-lg">
              Scan QR
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QRCodeScanner;
