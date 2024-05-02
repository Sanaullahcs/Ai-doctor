import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";

const NewChatButton = ({ newChat }) => {
  return (
    <TouchableOpacity style={{ marginRight: 7 }} onPress={newChat}>
      <Icon.Edit color="white" size={30} />
    </TouchableOpacity>
  );
};

export default NewChatButton;
