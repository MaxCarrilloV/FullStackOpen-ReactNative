import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
} from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useLogOut from "../hooks/useLogOut";

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
  const me = useQuery(ME);
  const [logout] = useLogOut();
  
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ScrollView horizontal>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          {me.data.me === null ? (
            <Link to="SigIn">
              <Text style={styles.text}>Sig In</Text>
            </Link>
          ) : (
            <Link to="/" onPress={logout}>
              <Text style={styles.text}>Log Out</Text>
            </Link>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBar;
