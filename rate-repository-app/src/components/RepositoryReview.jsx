import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REPO } from "../graphql/queries";
import { Pressable, View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    padding:10,
    margin:10,
  },
  ratingStyle:{
    width:50,
    height:50,
    borderStyle:'solid',
    borderWidth: 2,
    textAlign:'center',
    borderRadius:25,
    borderColor:'#0366d6',
    color:'#0366d6',
    paddingTop:10,
    fontSize:20,
  },
  buttonContainer: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    textAlign: "center",
    borderRadius: 3,
    marginHorizontal: 20,
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  content:{
    marginHorizontal:20,
    paddingRight:15,
  },
  style:{
    backgroundColor:'white'
  }
});

const RepositoryInfo = ({ repository }) => {
  const onPress = () => Linking.openURL(repository.url);
  return (
    <View style={styles.style}>
      <RepositoryItem item={repository} />
      <Pressable onPress={onPress}>
        <Text style={styles.buttonContainer}>Open in GitHub</Text>
      </Pressable>
      <Text style={styles.separator}></Text>
    </View>
  );
};

const ReviewItemRepo = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <Text  style={styles.ratingStyle}>{review.rating}</Text>
      <View style={styles.content}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.user.username}
        </Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), "MM/dd/yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const first = 2;
  const { data, loading, fetchMore } = useQuery(GET_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { id, first },
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if(!canFetchMore){
      return;
    }

    fetchMore({
      variables: {
        id, 
        first,
        after: data.repository.reviews.pageInfo.endCursor
      }
    })
  }
  const onEndReach = () => {
    handleFetchMore()
  }


  if (loading) {
    return <Text>loading data</Text>;
  }
  const repository = data.repository;
  const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      style={styles.style}
      data={reviews}
      renderItem={({ item }) => <ReviewItemRepo review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
