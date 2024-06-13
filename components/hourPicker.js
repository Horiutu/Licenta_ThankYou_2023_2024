import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { themeColors } from "../theme";

const HourSelector = ({
  onChange,
  openHour,
  closingHour,
  openMinutes,
  closingMinutes,
}) => {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const formattedOpenHour = openHour.toString().padStart(2, "0");
  const formattedOpenMinutes = openMinutes.toString().padStart(2, "0");

  const formattedClosingHour = closingHour.toString().padStart(2, "0");
  const formattedClosingMinutes = closingMinutes.toString().padStart(2, "0");

  const showPicker = () => {
    setPickerVisibility(true);
  };

  const hidePicker = () => {
    setPickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const validStartTime = new Date();
    validStartTime.setHours(openHour, openMinutes, 0); // Open hour from props

    const validEndTime = new Date();
    validEndTime.setHours(closingHour, closingMinutes, 0); // Closing hour from props

    if (date >= validStartTime && date <= validEndTime) {
      setSelectedHour(date);
      onChange(date);
      hidePicker();
    } else {
      Alert.alert(
        "Invalid Time",
        `Please select a time between ${formattedOpenHour}:${formattedOpenMinutes} and ${formattedClosingHour}:${formattedClosingMinutes}`,
        [{ text: "OK", onPress: () => setPickerVisibility(true) }]
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={showPicker}>
        <Text style={[styles.text, { color: themeColors.text }]}>
          Select the hour
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        date={selectedHour || new Date()}
        headerTextIOS="Pick a time"
        minuteInterval={30}
      />
      <Text style={styles.label}>
        Selected Hour:{" "}
        {selectedHour
          ? selectedHour.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "No hour selected"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: "grey",
  },
});

export default HourSelector;
