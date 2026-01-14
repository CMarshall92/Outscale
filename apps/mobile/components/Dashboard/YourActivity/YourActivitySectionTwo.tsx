import { Dimensions, StyleSheet, View } from "react-native";
import { YourMoveMinutes } from "./YourMoveMinutes";
import { YourDistance } from "./YourDistance";

export const YourActivitySectionTwo = () => {
  return (
    <View style={styles.container}>
      <YourMoveMinutes />
      <YourDistance />
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
