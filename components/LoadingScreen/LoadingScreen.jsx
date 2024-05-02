import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";

const LoadingScreen = ({ isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.modalBackground}>
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoadingScreen;
