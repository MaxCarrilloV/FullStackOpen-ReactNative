import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./RepositoryReview"; 
import SignIn from "./SignIn";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import theme from "../theme";
import MyReviews from "./MyReviews";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink:1,
    fontFamily:theme.fonts.main,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<SingleRepository/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/addReview" element={<CreateReview/>}/>
        <Route path="MyReviews" element={<MyReviews />}/>
      </Routes>
    </View>
  );
};

export default Main;
