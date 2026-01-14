import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Users, Trophy, TrendingUp, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Team } from "@/types/team";

const TeamView = ({ team }: { team: Team }) => {
  const teamData = {
    name: team.name,
    description: team.description,
    members: 12,
    rank: 3,
    weeklyPoints: 2847,
    imageUrl:
      "https://images.unsplash.com/photo-1763740360969-908ca8c00629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdGVhbSUyMHdvcmtvdXR8ZW58MXx8fHwxNzY4MDc4MzE0fDA&ixlib=rb-4.1.0&q=80&w=400",
  };

  const handleNavigateToTeam = () => {
    console.log("Navigate to team overview");
  };

  return (
    <TouchableOpacity
      onPress={handleNavigateToTeam}
      activeOpacity={0.9}
      style={styles.container}
    >
      <LinearGradient
        colors={["#3B82F6", "#0891B2"]} // blue-500 to cyan-600
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.teamInfo}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: teamData.imageUrl }}
                style={styles.teamImage}
              />
            </View>
            <View>
              <Text style={styles.title}>{teamData.name}</Text>
              <Text style={styles.teamName}>{teamData.description}</Text>
            </View>
          </View>
          <View style={styles.iconCircle}>
            <ChevronRight size={20} color="white" />
          </View>
        </View>

        <View style={styles.grid}>
          <StatBox icon={Users} label="Members" value={teamData.members} />
          <StatBox icon={Trophy} label="Rank" value={`#${teamData.rank}`} />
          <StatBox
            icon={TrendingUp}
            label="Points"
            value={teamData.weeklyPoints}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>View team overview</Text>
          <ChevronRight size={16} color="rgba(255,255,255,0.9)" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const StatBox = ({ icon: Icon, label, value }: any) => (
  <View style={styles.statBox}>
    <View style={styles.statHeader}>
      <Icon size={14} color="rgba(255,255,255,0.7)" />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    marginVertical: 10,
  },
  gradient: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 56, // size-14
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  teamImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  teamName: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  iconCircle: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
  },
  grid: {
    flexDirection: "row",
    gap: 12, // Supported in modern React Native
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginLeft: 6,
  },
  statValue: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginRight: 8,
  },
});

export default TeamView;
