import { View, StyleSheet, Dimensions, Text } from "react-native";

export const YourEnergyExpended = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>20598</Text>
      <Text style={styles.subHeader}>cals</Text>
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
    fontSize: 45,
    fontWeight: "bold",
    lineHeight: 45,
  },
  subHeader: {
    color: "#fec83e",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 35,
  },
});
