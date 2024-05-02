import { View, Text } from "react-native";
import React from "react";
import { grayColor } from "../../style.js";
const DrawerView = () => {
  return (
    <View style={{ flex: 1, backgroundColor: grayColor }}>
      <Text>DrawerView</Text>
    </View>
  );
};

export default DrawerView;
