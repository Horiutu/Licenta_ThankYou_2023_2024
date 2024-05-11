import React from "react";
import { useNavigation } from "@react-navigation/native";

import QRScanner from "../services/qrScanner";

export default function QRCodeScreen() {
  const navigation = useNavigation();
  return <QRScanner />;
}
