import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles, { placeholderColor } from "./LoginAndRegister.style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { validateEmail } from "../../utils/helper.js";
import { url } from "../../config/config.js";
import { login } from "../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import { blackColor, lightGrayColor } from "../../style.js";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  androidClientId,
  iosClientId,
  webClientId,
} from "../../constants/authCredentials.js";

WebBrowser.maybeCompleteAuthSession();
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const rememberedCredentials = AsyncStorage.getItem("rememberCredentials");

  useEffect(() => {
    const loadRememberedCredentials = async () => {
      const rememberedCredentialsString = await AsyncStorage.getItem(
        "rememberedCredentials"
      );
      if (rememberedCredentialsString) {
        const rememberedCredentials = JSON.parse(rememberedCredentialsString);
        setLoginData({
          email: rememberedCredentials.email,
          password: rememberedCredentials.password,
        });
        setChecked(true);
      }
    };

    loadRememberedCredentials();
  }, []);

  const handleRememberMeChange = () => {
    setChecked(!checked);
  };

  const handleEmailChange = (text) => {
    setLoginData({ ...loginData, email: text });

    if (isSubmitted) {
      setEmailError(validateEmail(text) ? "" : "Enter a valid email address");
    }
  };

  const handlePasswordChange = (text) => {
    setLoginData({ ...loginData, password: text });
    if (loginData.password.length > 6) {
      setPasswordError("");
      // return;
    }
  };

  const handelLogin = async () => {
    setIsSubmitted(true);
    if (!validateEmail(loginData.email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    if (loginData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    const userData = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        if (json.message === "Invalid User Email") {
          setEmailError(json.message);
        } else if (json.message === "Invalid Password") {
          setPasswordError(json.message);
        } else {
          Alert.alert("An Unknown Error occurred");
        }
      } else {
        dispatch(login({ token: json.token }));
        await AsyncStorage.setItem("userId", json.id);
        await AsyncStorage.setItem("userToken", json.token);
        const userId = await AsyncStorage.getItem("userId");
        if (checked) {
          await AsyncStorage.setItem(
            "rememberedCredentials",
            JSON.stringify(userData)
          );
        } else {
          await AsyncStorage.removeItem("rememberedCredentials");
        }
      }
    } catch (error) {
      Alert.alert("An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const getVerticalOffset = () => {
    const { height } = Dimensions.get("window");
    return height >= 812 ? 30 : 10; // iPhone X and above have a height of 812 or more
  };

  // Google Sign In
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

  //log the userInfo to see user details
  console.log("user info " + JSON.stringify(userInfo));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: blackColor }}>
      <LoadingScreen isVisible={isLoading} />
      <Text style={{ color: "white" }}>{JSON.stringify(userInfo)}asdasd</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS === "ios" ? getVerticalOffset() : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../assets/Images/Auth/SignIn.png")}
            resizeMode="contain"
          />

          <View style={styles.formContainer}>
            <View style={styles.fieldContainer} className="mt-5">
              <View
                style={{
                  ...styles.inputContainer,
                  borderColor: emailError ? "#E72626" : lightGrayColor,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    color: emailError ? "#E72626" : "#fff",
                  }}
                  value={loginData.email}
                  placeholderTextColor={placeholderColor}
                  placeholder="Please Enter Your Email"
                  onChangeText={handleEmailChange}
                  maxLength={50}
                />
                <Ionicons
                  name={"mail"}
                  size={24}
                  color={lightGrayColor}
                  style={styles.toggleIcon}
                />
              </View>
              {emailError ? (
                <Text style={styles.inputError}>{emailError}</Text>
              ) : null}
            </View>

            <View style={styles.fieldContainer}>
              <View
                style={{
                  ...styles.inputContainer,
                  borderColor: passwordError ? "#E72626" : lightGrayColor,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    color: passwordError ? "#E72626" : "#fff",
                  }}
                  value={loginData.password}
                  placeholderTextColor={placeholderColor}
                  placeholder="Please Enter Your Password"
                  secureTextEntry={hidePassword}
                  onChangeText={handlePasswordChange}
                  maxLength={20}
                />
                <TouchableOpacity
                  style={styles.toggleIcon}
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Ionicons
                    name={hidePassword ? "eye-off" : "eye"}
                    size={24}
                    color={lightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.inputError}>{passwordError}</Text>
              ) : null}
            </View>

            <View style={styles.forgetPasswordRow}>
              {/* <View style={styles.checkBoxRow}>
                <CheckBox
                  checked={checked}
                  onPress={handleRememberMeChange}
                  uncheckedColor={"red"}
                  color="black"
                  style={{ color: "black" }}
                />
                <Text style={styles.inputLabel}>Remember Me</Text>
              </View> */}

              {/* <TouchableOpacity>
                <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity style={styles.blueButton} onPress={handelLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.signInWith}>Sign in with</Text>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => promptAsync()}
            >
              <Image
                source={require("../../assets/Images/Auth/GoogleIcon.png")}
                style={styles.googleIcon}
              />
            </TouchableOpacity>

            <View style={styles.haveNotRow}>
              <Text style={styles.haveNotText}>Don’t have an account ? </Text>
              <Text
                style={styles.otherPageLink}
                onPress={() => navigation.navigate("Register")}
              >
                Sign Up
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
