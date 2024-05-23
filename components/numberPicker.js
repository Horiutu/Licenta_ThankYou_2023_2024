import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { themeColors } from "../theme";

export default function NumberSelector({ text }) {
  const [selectedNumber, setSelectedNumber] = useState(2);
  const textNr = `${text}`;

  const handleIncrement = () => {
    setSelectedNumber(selectedNumber + 1);
  };

  const handleDecrement = () => {
    if (selectedNumber > 1) {
      setSelectedNumber(selectedNumber - 1);
    }
  };

  return (
    <View style={styles.container} className="ml-6">
      <Text
        className="text-lg font-bold mr-6"
        style={{ color: themeColors.text }}
      >
        {textNr}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          className="mr-2"
          onPress={handleDecrement}
          style={styles.button}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.number}>{selectedNumber}</Text>
        <TouchableOpacity
          className="ml-2"
          onPress={handleIncrement}
          style={styles.button}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: themeColors.bgColor(1),
    borderRadius: 5,
    marginHorizontal: 10,
  },
  number: {
    fontSize: 18,
  },
});
