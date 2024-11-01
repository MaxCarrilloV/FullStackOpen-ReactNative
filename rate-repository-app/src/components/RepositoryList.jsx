import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  picker: {
    color: "white",
  },
  searchInput: {
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  orderBy,
  setOrderBy,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={() => (
        <Picker
          selectedValue={orderBy}
          onValueChange={(itemValue) => setOrderBy(itemValue)}
          style={styles.selectStyle}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item
            label="Higest rated repositories"
            value="Highest Rated"
          />
          <Picker.Item label="Lowest rated repositories" value="Lowest Rated" />
        </Picker>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrderBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);
  let orderDirection;
  let orderBy;
  let first = 3;
  switch (order) {
    case "latest":
      orderBy = "CREATED_AT";
      orderDirection = "DESC";
      break;
    case "Highest Rated":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "Lowest Rated":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
  }
  const { repositories, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
    first,
  });


  const onEndReach = () => {
    fetchMore();
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchInput}
      />
      <RepositoryListContainer
        orderBy={order}
        setOrderBy={setOrderBy}
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </>
  );
};

export default RepositoryList;
