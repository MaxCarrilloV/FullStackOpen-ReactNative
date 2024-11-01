import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
  ownerName: "",
  rating: "",
  repositoryName: "",
  text: "",
};

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
const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name is required"),
  rating: yup.number().required("Rating is required").min(0,'Rating must be greater than 0 ').max(100,'Rating must be less than 100'),
  repositoryName: yup.string().required("Repository name is required"),
  text:yup.string()
});

const ReviewForm = ({ onSubmit }) => (
  <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline/>
    <Pressable onPress={onSubmit}>
      <Text style={styles.PressContainer}>Create Review</Text>
    </Pressable>
  </View>
);

const CreateReview = () => {
  const [CreateReview] = useCreateReview();
  const onSubmit = async(values) => {
    try {
        const { ownerName, repositoryName, rating , text } = values
        await CreateReview({ ownerName, repositoryName, rating , text });
    } catch (error) {
        console.log("e", error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};
export default CreateReview;
