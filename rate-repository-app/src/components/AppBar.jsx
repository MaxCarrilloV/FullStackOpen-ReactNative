import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import Constants from "expo-constants";
import useLogOut from "../hooks/useLogOut";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  text: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
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
    
          {me.data?.me === null ? (
            <>
              <Link to="/SignIn">
                <Text style={styles.text}>Sign in</Text>
              </Link>
              <Link to="/SignUp">
                <Text style={styles.text}>Sign up</Text>
              </Link>
            </>
          ) : (
            <>
              <Link to="/addReview">
                <Text style={styles.text}>Create a review</Text>
              </Link>
              <Link to="/MyReviews">
                <Text style={styles.text}>My Reviews</Text>
              </Link>
              <Link to="/" onPress={logout}>
                <Text style={styles.text}>Sign Out</Text>
              </Link>
            </>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBar;
