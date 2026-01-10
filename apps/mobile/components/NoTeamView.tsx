import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Users, UserPlus } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const NoTeamView = ({ onCreateTeam, onJoinTeam }: any) => {
  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={["#A855F7", "#4F46E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Users size={24} color="white" />
          </View>
          <View>
            <Text style={styles.title}>Team Fitness</Text>
            <Text style={styles.subtitle}>Better together</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Join or create a team to track progress, compete with friends, and
          achieve your fitness goals together.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onCreateTeam}
            activeOpacity={0.8}
          >
            <Users size={18} color="#9333EA" style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>Create Team</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={onJoinTeam}
            activeOpacity={0.8}
          >
            <UserPlus size={18} color="white" style={styles.buttonIcon} />
            <Text style={styles.outlineButtonText}>Join Team</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 16,
  },
  card: {
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#9333EA",
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default NoTeamView;
