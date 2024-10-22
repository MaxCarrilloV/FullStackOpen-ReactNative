import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import theme from "../theme";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily:theme.fonts.main
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="SigIn" element={<SignIn/>}/>
      </Routes>
    </View>
  );
};

export default Main;