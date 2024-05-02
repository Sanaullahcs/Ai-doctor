import { StyleSheet } from "react-native";
import { darkBlueColor, lightBlueColor } from "../../../style";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animationTextRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    backgroundColor: darkBlueColor,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: 25,
    gap: 14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  horizontalDivider: {
    width: "92%",
    height: 2,
    backgroundColor: lightBlueColor,
  },
});
export default styles;
