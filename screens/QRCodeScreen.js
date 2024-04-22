import { SafeAreaView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import QRScanner from "../services/qrScanner";

export default function QRCodeScreen() {
  const navigation = useNavigation();
  return <QRScanner />;
}
