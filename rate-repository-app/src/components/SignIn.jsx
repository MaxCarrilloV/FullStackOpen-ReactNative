import React from "react";
import Text from "./Text";
import { Pressable, View, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import useSignIn from "../hooks/useSignIn";
import * as yup from "yup";
const initialValues = {
  username: "",
  password: "",
};
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    borderColor: "#586069",
  },
  textContainer: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 5,
    marginTop: 5,
    marginHorizontal: 13,
    textAlign: "center",
    borderRadius: 3,
  },
  errorInput: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 3,
    borderColor: "#586069",
    borderColor: "red",
    borderWidth: 1,
    marginBottom:3
  },
  errorText:{
    marginLeft:12,
    marginTop:0
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SigInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username && formik.errors.username
            ? styles.errorInput
            : null,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText} color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.password && formik.errors.password
            ? styles.errorInput
            : null,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry={true}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText} color="error">{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.textContainer}>Sig in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit =async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });

    } catch (e) {
      console.log(e);
    }
  };
  return <SigInForm onSubmit={onSubmit} />;
};

export default SignIn;
