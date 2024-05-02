import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./ButtonRounded.style";
import { skyColor } from "../../style";
import { googleIcon } from "../../assets";

const ButtonRounded = ({
  buttonBgColor,
  buttonBorder,
  image,
  textColor,
  text,
  handelPress,
}) => {
  return (
    <TouchableOpacity
      onPress={handelPress}
      style={[
        styles.buttonBody,
        { backgroundColor: buttonBgColor, borderColor: buttonBorder },
      ]}
    >
      {image && <Image source={image} style={styles.image} />}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRounded;
