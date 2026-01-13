import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import TeamView from "./TeamView";
import NoTeamView from "./NoTeamView";

const CompetativeSection = () => {
  const [hasTeam, setHasTeam] = useState(false);

  useEffect(() => {
    // Fetch team status from API or local storage
  }, []);

  return (
    <View style={styles.container}>
      {hasTeam ? <TeamView /> : <NoTeamView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: "#6B7280",
  },
  buttonText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
});

export default CompetativeSection;
