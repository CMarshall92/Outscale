import { View, StyleSheet, Dimensions, Text } from "react-native";

export const YourSteps = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>7356</Text>
      <Text style={styles.subHeader}>steps</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.5,
    backgroundColor: "#fec83e",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  header: {
    color: "#3b2217",
    fontSize: 55,
    fontWeight: "bold",
    lineHeight: 45,
  },
  subHeader: {
    color: "#3b2217",
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 35,
  },
});
