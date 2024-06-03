import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { themeColors } from "../theme"; // Ensure this import matches your project's structure

const HourSelector = ({ onChange }) => {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [tempSelectedHour, setTempSelectedHour] = useState(new Date());

  const showPicker = () => {
    setPickerVisibility(true);
  };

  const hidePicker = () => {
    setPickerVisibility(false);
  };

  const handleConfirm = () => {
    setSelectedHour(tempSelectedHour);
    onChange(tempSelectedHour);
    hidePicker();
  };

  const generateTimeOptions = (startHour, endHour, interval) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minutes);
        time.setSeconds(0);
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions(9, 22, 30); // Example: 9 AM to 10 PM with 30-minute intervals

  return (
    <View>
      <TouchableOpacity onPress={showPicker}>
        <Text className="text-lg font-bold" style={{ color: themeColors.text }}>
          Select the hour
        </Text>
      </TouchableOpacity>
      <Modal visible={isPickerVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tempSelectedHour}
              onValueChange={(itemValue) =>
                setTempSelectedHour(new Date(itemValue))
              }
            >
              {timeOptions.map((time) => (
                <Picker.Item
                  key={time.toISOString()}
                  label={time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  value={time.toISOString()}
                />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <Button title="Confirm" onPress={handleConfirm} />
              <Button title="Cancel" onPress={hidePicker} />
            </View>
          </View>
        </View>
      </Modal>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: themeColors.bgColor(1),
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: "grey",
  },
});

export default HourSelector;
