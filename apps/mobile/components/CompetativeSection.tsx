import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TeamView from "./TeamView";
import NoTeamView from "./NoTeamView";

const CompetativeSection = () => {
  const [hasTeam, setHasTeam] = useState(false);

  const handleCreateTeam = () => {
    console.log("Create team clicked");
    setHasTeam(true);
  };

  const handleJoinTeam = () => {
    console.log("Join team clicked");
    setHasTeam(true);
  };

  const handleNavigateToTeam = () => {
    console.log("Navigate to team overview");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Competition</Text>

        <TouchableOpacity
          onPress={() => setHasTeam(!hasTeam)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Toggle Demo</Text>
        </TouchableOpacity>
      </View>

      {hasTeam ? (
        <TeamView onNavigateToTeam={handleNavigateToTeam} />
      ) : (
        <NoTeamView
          onCreateTeam={handleCreateTeam}
          onJoinTeam={handleJoinTeam}
        />
      )}
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
