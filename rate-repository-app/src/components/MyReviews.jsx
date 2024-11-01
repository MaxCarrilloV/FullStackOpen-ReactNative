import { View, FlatList, StyleSheet, Pressable, Button, Alert } from "react-native";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import Text from "./Text";
const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
  },
  ratingStyle: {
    width: 50,
    height: 50,
    borderStyle: "solid",
    borderWidth: 2,
    textAlign: "center",
    borderRadius: 25,
    borderColor: "#0366d6",
    color: "#0366d6",
    paddingTop: 10,
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 20,
    marginVertical: 5,
    borderRadius: 5,
    textAlign: "center",
    borderRadius: 3,
    marginHorizontal: 10,
  },
  deleteContainer: {
    backgroundColor: "red",
    color: "white",
    padding: 20,
    paddingHorizontal:30,
    marginVertical: 5,
    borderRadius: 5,
    textAlign: "center",
    borderRadius: 3,
    marginHorizontal: 10,
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  content: {
    marginHorizontal: 20,
    paddingRight: 15,
  },
  buttons:{
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'center',
    marginBottom:10
  },
  container:{
    backgroundColor:'white'
  }
});

const ReviewItemMe = ({ review, refetch }) => {
  const [mutate] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();
  const viewRepository = () => navigate(`/${review.repository.id}`);
  const createAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'DELETE', onPress: async () => {
        const deleteReviewId = review.id;
        await mutate({variables:{deleteReviewId}});
        refetch();
      }},
    ]);
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <Text style={styles.ratingStyle}>{review.rating}</Text>
        <View style={styles.content}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "MM/dd/yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={viewRepository}>
            <Text fontWeight="bold" style={styles.buttonContainer}>View Repository</Text>
        </Pressable>
        <Pressable onPress={createAlert}>
            <Text fontWeight="bold" style={styles.deleteContainer}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });
  if (loading) {
    return <Text>...loading</Text>;
  }
  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItemMe review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};
export default MyReviews;
