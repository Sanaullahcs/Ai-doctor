import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonBody: {
    padding: 14,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    color: "white",
    fontSize: 17,
    fontWeight: 700,
  },
});

export default styles;
