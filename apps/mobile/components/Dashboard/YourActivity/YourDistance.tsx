import { View, StyleSheet, Dimensions, Text } from "react-native";

export const YourDistance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>0.5</Text>
      <Text style={styles.subHeader}>miles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.5,
    backgroundColor: "#3b2217",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  header: {
    color: "#fec83e",
    fontSize: 55,
    fontWeight: "bold",
    lineHeight: 45,
  },
  subHeader: {
    color: "#fec83e",
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 35,
  },
});
