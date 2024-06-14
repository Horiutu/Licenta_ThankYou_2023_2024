import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { FIRESTORE_DBDB } from "../services/config";
import { ref, get, update } from "firebase/database";

export default function StatusOrder({ loggedInBusinessCode, orderId }) {
  const [status, setStatus] = useState("Sent");
  const navigation = useNavigation();
  const restaurant = loggedInBusinessCode;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusRef = ref(
          FIRESTORE_DBDB,
          `orders/${restaurant}/${orderId}/status`
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
    const statusRef = ref(FIRESTORE_DBDB, `orders/${restaurant}/${orderId}`);
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
            borderColor: status === "Sent" ? "orange" : "transparent",
          }}
          onPress={() => updateStatus("Sent")}
        >
          <Text style={{ color: "orange" }} className="px-2">
            Sent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-3"
          style={{
            borderWidth: 2,
            borderColor: status === "In progress" ? "yellow" : "transparent",
          }}
          onPress={() => updateStatus("In progress")}
        >
          <Text style={{ color: "yellow" }} className="px-2">
            In progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2"
          style={{
            borderWidth: 2,
            borderColor: status === "Served" ? "chartreuse" : "transparent",
          }}
          onPress={() => updateStatus("Served")}
        >
          <Text style={{ color: "chartreuse" }} className="px-2">
            Served
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }} className="ml-1 mt-4">
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
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2"
          style={{
            borderWidth: 2,
            borderColor: status === "Paid" ? "purple" : "transparent",
          }}
          onPress={() => updateStatus("Paid")}
        >
          <Text style={{ color: "purple" }} className="px-2">
            Paid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full shadow bg-stone-800 ml-2"
          style={{
            borderWidth: 2,
            borderColor: status === "Waiter is coming" ? "aqua" : "transparent",
          }}
          onPress={() => updateStatus("Waiter is coming")}
        >
          <Text style={{ color: "aqua" }} className="px-2">
            Waiter is coming
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
