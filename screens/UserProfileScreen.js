import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { themeColors } from "../theme";
import ReservationCard from "../components/reservationCard";
import { logout } from "../services/userSignIn";
import BackButtonBlack from "../components/backButtonBlack";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../services/config";
import Spinner from "../components/spinner";
import { useAuth } from "../hooks/useAuth";
import { useAuth2 } from "../hooks/useAuth2";
import { getAuth, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { child, get, getDatabase, ref } from "firebase/database";

export default function UserProfileScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [reservations, setReservations] = useState([]);
  const [nextReservation, setNextReservation] = useState([]);
  const [nextReservationRestaurtant, setNextReservationRestaurant] = useState(
    []
  );
  const [countReservations, setCountReservations] = useState(0);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      // console.debug("Auth object in useEffect: ", JSON.parse(user).uid);
      setUserName(JSON.parse(user).displayName);
      setUserId(JSON.parse(user).uid);
    })();

    const dbRef = ref(getDatabase());

    get(child(dbRef, `reservations`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const reservationsArr = [];
          const data = snapshot.val();

          try {
            Object.keys(data).forEach((restaurantId) => {
              Object.keys(data[restaurantId]).forEach((reservationId) => {
                const reservation = data[restaurantId][reservationId];
                console.log(userId);
                console.log(reservation.userId);
                console.log(reservation.userId == userId);

                if (reservation.userId == userId) {
                  reservationsArr.push({
                    ...reservation,
                    reservationId,
                  });
                }
              });
            });
            console.debug(reservationsArr);
          } catch (error) {
            console.error(error);
          }
          // Sort reservations by date
          const today = new Date();
          reservationsArr.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA >= today && dateB >= today) {
              return dateA - dateB; // Future reservations: earlier dates first
            } else if (dateA < today && dateB < today) {
              return dateB - dateA; // Past reservations: later dates first
            } else if (dateA >= today) {
              return -1; // Future reservations before past reservations
            } else {
              return 1; // Past reservations after future reservations
            }
          });
          console.debug(reservationsArr);
          console.debug(reservationsArr.length);
          if (reservationsArr.length > 0) {
            restId = reservationsArr[0].restaurantId;
            const restaurant = params.allRestaurants.find(
              (r) => r.id === restId
            );

            console.debug(params.allRestaurants);
            console.debug(restaurant);
            console.debug(restId);
            setNextReservation(reservationsArr[0]);
            setNextReservationRestaurant(restaurant);
          }
          setReservations(reservationsArr);
          setCountReservations(reservationsArr.length);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   if (auth) {
  //     console.log("Auth object in useEffect: ", auth);
  //     setUserName(auth.displayName);
  //   }
  // }, [auth]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // console.log("Rendered with userName: ", userName);

  return (
    <SafeAreaView className="bg-white flex-1">
      <BackButtonBlack />

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        className="mt-14 pb-8"
      >
        <Text style={{ fontSize: 44 }} className="font-bold ml-4 text-black">
          {" "}
          Hi,
        </Text>
        <Text style={{ fontSize: 44 }} className="font-thin text-black ml-3">
          {userName}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserAppearance")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Notifications
          </Text>
        </TouchableOpacity>
        <Icon.Bell
          className="ml-2 mb-2"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserReservations")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Reservations
          </Text>
        </TouchableOpacity>
        <Icon.Clock
          className="ml-2 mb-2"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserFinance")}
          className="pb-3"
        >
          <Text
            style={{ color: themeColors.text }}
            className="font-bold ml-6 text-3xl"
          >
            Finance
          </Text>
        </TouchableOpacity>
        <Icon.DollarSign
          className="ml-2 mb-3"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>

      <View className="ml-6 pt-6 pb-2">
        <Text className="text-2xl font-thin font-s">Your next reservation</Text>
      </View>

      {countReservations === 0 ? (
        <View className="items-center">
          <Text className="font-semi text-black text-2xl">
            No reservation yet...
          </Text>
        </View>
      ) : (
        // <View></View>
        <ReservationCard
          item={nextReservation}
          restaurant={nextReservationRestaurtant}
        />
      )}

      <View
        className="mt-8 ml-6"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <TouchableOpacity onPress={handleLogout} className="">
          <Text
            style={{ color: themeColors.text }}
            className="font-bold text-3xl"
          >
            Logout
          </Text>
        </TouchableOpacity>
        <Icon.CornerDownLeft
          className="ml-3"
          strokeWidth={3}
          stroke={themeColors.bgColor(1)}
        />
      </View>
    </SafeAreaView>
  );
}
