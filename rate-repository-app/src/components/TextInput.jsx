import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    borderColor: "#586069",
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, error && styles.errorInput, style];
  return <NativeTextInput style={textInputStyle} {...props} />;
};
export default TextInput;
