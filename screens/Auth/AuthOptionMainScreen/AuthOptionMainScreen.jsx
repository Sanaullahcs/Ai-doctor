import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AnimatedTyping from "../../../components/AnimatedTyping/AnimatedTyping";
import { texts } from "../../../constants";
import {
  animationTextColor,
  animationBgColor,
  skyColor,
  lightBlueColor,
  darkBlueColor,
} from "../../../style";
import styles from "./AuthOptionMainScreen.style";
import ButtonRounded from "../../../components/ButtonRounded/ButtonRounded";
import { googleIcon } from "../../../assets";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  androidClientId,
  iosClientId,
  webClientId,
} from "../../../constants/authCredentials";
import GoogleLoginButton from "../../../components/GoogleLoginButton/GoogleLoginButton";
const AuthOptionMainScreen = () => {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(animationBgColor[0]);
  const [textColor, setTextColor] = useState(animationTextColor[0]);
  const [text, setText] = useState(texts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (index + 1) % animationBgColor.length;
      setIndex(newIndex);
      setColor(animationBgColor[newIndex]);
      setTextColor(animationTextColor[newIndex]);
      setText(texts[newIndex % texts.length]);
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.centerContent}>
        <View style={styles.animationTextRow}>
          <AnimatedTyping key={text} text={[text]} color={textColor} />
          <View
            style={[
              styles.circle,
              {
                backgroundColor: textColor,
              },
            ]}
          ></View>
        </View>
      </View>

      {/* start buttonContainer */}
      <View style={styles.buttonContainer}>
        {/* <ButtonRounded
          handelPress={() => promptAsync()}
          buttonBgColor={skyColor}
          buttonBorder={skyColor}
          image={googleIcon}
          textColor="white"
          text="Continue with Google"
        /> */}
        <GoogleLoginButton />
        <ButtonRounded
          handelPress={() => console.log("first button pressed")}
          buttonBgColor={lightBlueColor}
          buttonBorder={lightBlueColor}
          textColor="white"
          text="Sign up with Email"
        />
        <View style={styles.horizontalDivider}></View>
        <ButtonRounded
          handelPress={() => console.log("first button pressed")}
          buttonBgColor={darkBlueColor}
          buttonBorder={skyColor}
          textColor={skyColor}
          text="Sign In"
        />
      </View>
    </View>
  );
};

export default AuthOptionMainScreen;
