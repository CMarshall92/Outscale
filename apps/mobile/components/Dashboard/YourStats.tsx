import { View, StyleSheet, Dimensions, Text } from "react-native";

export const YourStats = () => {
  return (
    <View style={styles.section}>
      <View>
        <Text style={styles.sectionHeading}>Your Daily</Text>
        <Text style={styles.sectionSubHeading}>Statistics</Text>
      </View>
      <View style={styles.headlineContainer}>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>Weigh-In</Text>
          <Text style={styles.headlineSubText}>2 Days</Text>
        </View>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>Challenges</Text>
          <Text style={styles.headlineSubText}>15</Text>
        </View>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>Workouts</Text>
          <Text style={styles.headlineSubText}>15</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "#ebebea",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeading: {
    fontFamily: "MontserratSemi",
    color: "#676767",
    fontSize: 55,
    fontWeight: "bold",
    lineHeight: 60,
  },
  sectionSubHeading: {
    fontFamily: "MontserratSemi",
    color: "#676767",
    fontSize: 45,
    fontWeight: "bold",
    lineHeight: 40,
  },
  headlineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  headline: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  headlineText: {
    fontFamily: "MontserratSemi",
    color: "#676767",
    paddingHorizontal: 5,
    fontSize: 18,
    lineHeight: 25,
  },
  headlineSubText: {
    fontFamily: "MontserratSemi",
    color: "#676767",
    paddingHorizontal: 5,
    fontSize: 15,
    lineHeight: 25,
  },
});
