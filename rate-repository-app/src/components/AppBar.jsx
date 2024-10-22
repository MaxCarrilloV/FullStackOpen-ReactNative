import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  text: {
    color: "white",
    marginLeft: 10,
    fontSize: 20,
  },
});

const AppBar = () => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          <Link to="SigIn">
            <Text style={styles.text}>Sig In</Text>
          </Link>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBar;
