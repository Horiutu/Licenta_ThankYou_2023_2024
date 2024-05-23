import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { FIREBASE_ST } from "../services/config.js";

function ImageDisplay({ imageName }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(FIREBASE_ST, imageName);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to retrieve data", error);
      }
    };

    fetchImage();
  }, [imageName]);

  return (
    <View className="items-center">
      {imageUrl ? (
        <Image source={imageUrl} className="h-40 w-40" />
      ) : (
        <Text className="mt-4">Loading...</Text>
      )}
    </View>
  );
}

export default ImageDisplay;
