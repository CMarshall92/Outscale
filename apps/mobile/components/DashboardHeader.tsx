import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const DashboardHeader = () => {
  const router = useRouter();

  return (
    <View style={[styles.headerContainer, styles.safeArea]}>
      <View style={styles.innerWrapper}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/profile")}>
          <LinearGradient
            colors={["#A855F7", "#4F46E5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>CM</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderBottomColor: "#F3F4F6",
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  innerWrapper: {
    maxWidth: 450,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default DashboardHeader;
