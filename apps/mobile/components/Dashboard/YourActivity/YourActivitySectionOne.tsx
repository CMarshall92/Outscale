import { Dimensions, StyleSheet, View } from "react-native";
import { YourSteps } from "./YourSteps";
import { YourEnergyExpended } from "./YourEnergyExpended";

export const YourActivitySectionOne = () => {
  return (
    <View style={styles.container}>
      <YourEnergyExpended />
      <YourSteps />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width,
  },
});
