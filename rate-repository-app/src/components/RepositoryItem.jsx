import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import NumericData from "./NumericData";
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:"white"
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
  buttonContainer: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center",
    borderRadius: 3,
    marginHorizontal:20
  },
  titleContainer:{
    paddingEnd:20,
    marginRight:20
  }
});

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  const OnPress = () => {
    navigate(`/${item.id}`);
  };
  return (
    <TouchableOpacity onPress={OnPress}>
      <View testID="repositoryItem" style={styles.container}>
        <View style={styles.titleFlex}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `${item.ownerAvatarUrl}`,
            }}
          />
          <View style={styles.titleContainer}> 
            <Text fontWeight="bold" fontSize="subheading">
              {item.fullName}
            </Text>
            <Text color="textSecondary">{item.description}</Text>
            <Text style={styles.textContainer}>{item.language}</Text>
          </View>
        </View>
        <NumericData item={item} />
      </View>
    </TouchableOpacity>
  );
};
export default RepositoryItem;
