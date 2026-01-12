import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TeamView from "./TeamView";
import NoTeamView from "./NoTeamView";

const CompetativeSection = () => {
  const [hasTeam, setHasTeam] = useState(false);

  useEffect(() => {
    // Fetch team status from API or local storage
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Competition</Text>
      </View>

      {hasTeam ? <TeamView /> : <NoTeamView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
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
