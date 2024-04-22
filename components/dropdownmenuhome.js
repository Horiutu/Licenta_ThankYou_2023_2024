import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function DropdownMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsVisible(false);
  };

  return (
    <View
      style={{ backgroundColor: themeColors.bgColor(1) }}
      className="ml-3 p-3 rounded-full"
    >
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Icon.Menu height="15" width="25" strokeWidth={2.5} stroke="white" />
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(option)}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {selectedOption !== ""}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#f8f9fa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    position: "absolute",
    top: 60,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    textAlign: "center",
  },
  selectedText: {
    marginTop: 20,
  },
});
