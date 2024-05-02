import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Navigation from "./navigations/Navigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
export default function App() {
  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    changeScreenOrientation();
  }, []);
  const [fontsLoaded, fontError] = useFonts({
    Manrope: require("./assets/Fonts/Roboto-Regular.ttf"), // used
    ManropeBold: require("./assets/Fonts/Roboto-Bold.ttf"), // unused
    // Inter: require("./assets/fonts/Inter-Medium.ttf"), // used
    // Manrope: require("./assets/fonts/Manrope-SemiBold.ttf"), // unused
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Provider
      store={store}
      onLayout={onLayoutRootView}
      style={styles.container}
    >
      <Navigation />
      <StatusBar hidden />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
