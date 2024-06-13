import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { FIRESTORE_DBDB } from "../services/config";
import { ref, get, update } from "firebase/database";

export default function StatusReservation({
  loggedInBusinessCode,
  reservationId,
}) {
  const [status, setStatus] = useState("Received");
  const navigation = useNavigation();
  const restaurant = loggedInBusinessCode;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusRef = ref(
          FIRESTORE_DBDB,
          `reservations/${restaurant}/${reservationId}/status`
        );
        const snapshot = await get(statusRef);
        if (snapshot.exists()) {
          setStatus(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching status: ", error);
      }
    };

    fetchStatus();
  }, []);

  const updateStatus = (newStatus) => {
    const statusRef = ref(
      FIRESTORE_DBDB,
      `reservations/${restaurant}/${reservationId}`
    );
    update(statusRef, {
      status: newStatus,
    })
      .then(() => {
        setStatus(newStatus);
        console.log("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status: ", error);
      });
  };

  return (
    <View className="ml-3">
      <Text
        style={{ color: themeColors.text }}
        className="ml-3 font-bold text-2xl mb-3"
      >
        Choose Status
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-3"
          style={{
            borderWidth: 2,
            borderColor:
              status === "Pending request" ? "#FFF301" : "transparent",
          }}
          onPress={() => updateStatus("Pending request")}
        >
          <Text style={{ color: "#FFF301" }} className="px-2">
            Pending request
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2"
          style={{
            borderWidth: 2,
            borderColor: status === "Accepted" ? "#17FF00" : "transparent",
          }}
          onPress={() => updateStatus("Accepted")}
        >
          <Text style={{ color: "#17FF00" }} className="px-2">
            Accepted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2"
          style={{
            borderWidth: 2,
            borderColor:
              status === "Declined" ? themeColors.text : "transparent",
          }}
          onPress={() => updateStatus("Declined")}
        >
          <Text style={{ color: themeColors.text }} className="px-2">
            Declined
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
