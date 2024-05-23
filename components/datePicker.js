import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { themeColors } from "../theme";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <Text className="text-lg font-bold" style={{ color: themeColors.text }}>
          Select the date
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.label}>
        Selected Date:{" "}
        {selectedDate ? selectedDate.toDateString() : "No date selected"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: "grey",
  },
});

export default DateSelector;
