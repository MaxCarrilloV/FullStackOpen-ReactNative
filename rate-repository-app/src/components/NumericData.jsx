import { StyleSheet, View } from "react-native";
import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  flexText: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Data = ({ data, text }) => {
  if(data>=1000){
    data = (data/1000).toFixed(1)
    data = data.at(-1) == 0 ? Math.round(data) + 'K': data+'K'
  }
  return (
    <View style={styles.flexText}>
      <Text fontWeight="bold" fontSize="subheading">
        {data}
      </Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const NumericData = ({ item }) => {
  return (
    <View style={styles.container}>
      <Data data={item.stargazersCount} text="Stars" />
      <Data data={item.forksCount} text="Forks" />
      <Data data={item.reviewCount} text="Reviews" />
      <Data data={item.ratingAverage} text="Rating" />
    </View>
  );
};
export default NumericData;
