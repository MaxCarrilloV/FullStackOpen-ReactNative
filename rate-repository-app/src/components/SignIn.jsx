import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  PressContainer: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 5,
    marginTop: 5,
    marginHorizontal: 13,
    textAlign: "center",
    borderRadius: 5,
    minWidth: 64,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <View>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Pressable onPress={onSubmit}>
        <Text style={styles.PressContainer}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
