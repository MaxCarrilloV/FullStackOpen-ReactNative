import { StyleSheet, View, Image } from "react-native";
import Text from "./Text";
import NumericData from "./NumericData";
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginEnd: 20,
  },
  textContainer: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 5,
    marginTop: 5,
    alignSelf: "flex-start",
    borderRadius: 5,
    textAlign: "center",
    borderRadius: 3,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleFlex}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${item.ownerAvatarUrl}`,
          }}
        />
        <View>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.textContainer}>{item.language}</Text>
        </View>
      </View>

      <NumericData item={item} />
    </View>
  );
};
export default RepositoryItem;
