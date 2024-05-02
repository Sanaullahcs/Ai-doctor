import { StyleSheet } from "react-native";
import { blackColor, lightColor } from "../../style";

const styles = StyleSheet.create({
  logo: {
    width: 137,
    marginHorizontal: "30%",
    marginVertical: 40,
    marginTop: 100,
  },
  formContainer: {
    width: "87%",
    display: "flex",
    marginHorizontal: "7%",
    gap: 20,
    marginTop: "auto",
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 25,
    fontWeight: "600",
  },
  fieldContainer: {
    display: "flex",
    gap: 5,
  },
  inputLabel: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
    color: "#00004D",
  },
  inputContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 80,
    paddingHorizontal: 18,
  },
  input: {
    fontFamily: "Manrope",
    fontSize: 14,
  },
  verticalBar: {
    width: 1,
    height: "95%",
    backgroundColor: "#CDD1E0",
    marginHorizontal: 10,
  },
  inputError: {
    fontFamily: "Manrope",
    color: "#E72626",
    fontSize: 14,
  },
  toggleIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  forgetPasswordRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetPasswordText: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
    color: "#FB344F",
  },
  checkBoxRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  blueButton: {
    backgroundColor: "#fff",
    height: 48,
    width: "100%",
    borderRadius: 80,
    marginBottom: 11,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: blackColor,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "ManropeBold",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
  },
  signInWith: {
    fontWeight: "400",
    fontSize: 11,
    color: lightColor,
    textAlign: "center",
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleIcon: {
    width: 28,
    height: 28,
    display: "flex",
  },
  haveNotRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  haveNotText: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
    color: "#999EA1",
  },
  otherPageLink: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
    color: "#1C81CB",
    marginLeft: 5,
  },
});

export default styles;

export const placeholderColor = "#1F1F1F6E";
