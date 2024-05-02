import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ButtonRounded from "../ButtonRounded/ButtonRounded";
import { skyColor } from "../../style";
import { googleIcon } from "../../assets";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  androidClientId,
  iosClientId,
  webClientId,
} from "../../constants/authCredentials";
const GoogleLoginButton = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
  });

  const signInWithGoogle = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      if (userJSON) {
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } catch (error) {
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };

  //add it to a useEffect with response as a dependency
  useEffect(() => {
    signInWithGoogle();
  }, [response]);

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.error();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        response.status,
        response.statusText
      );
    }
  };
  return (
    <>
      <ButtonRounded
        handelPress={() => promptAsync()}
        buttonBgColor={skyColor}
        buttonBorder={skyColor}
        image={googleIcon}
        textColor="white"
        text="Continue with Google"
      />
    </>
  );
};

export default GoogleLoginButton;
