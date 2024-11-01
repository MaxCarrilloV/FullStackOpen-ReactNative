import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";
import * as yup from "yup";

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
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .required("Username is required")
    .min(1, "The username length is too small")
    .max(30, "The username length is too small"),
  password: yup.string()
    .required("Password is required")
    .min(5, "The password length is too small")
    .max(50, "The password length is too small"),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), 'The confirmed password is different'])
  .required('Password confirm is required')
});

const SignUpForm = ({ onSubmit }) => (
  <View>
    <FormikTextInput name="username" placeholder="Username"/>
    <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
    <FormikTextInput name="confirmPassword" placeholder="Confirm password" secureTextEntry/>
    <Pressable onPress={onSubmit}>
      <Text style={styles.PressContainer}>Sign Up</Text>
    </Pressable>
  </View>
);

const SignUp = () => {
  const [signUp] = useSignUp()
  const onSubmit = async (values) => {
    const {username, password} = values;
    try {
      await signUp({username, password});
    } catch (e) {
      console.log("e", e);
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};
export default SignUp;
