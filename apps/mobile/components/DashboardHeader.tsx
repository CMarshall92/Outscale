import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DashboardHeader = () => {
  return (
    <View style={[styles.headerContainer, styles.safeArea]}>
      <View style={styles.innerWrapper}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>

        <LinearGradient
          colors={["#A855F7", "#4F46E5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>CM</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderBottomColor: "#F3F4F6", // gray-100
  },
  headerContainer: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  innerWrapper: {
    maxWidth: 450, // max-w-md
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
    fontSize: 20, // text-xl
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14, // text-sm
    color: "#6B7280", // gray-500
  },
  avatar: {
    width: 40, // size-10
    height: 40,
    borderRadius: 20, // rounded-full
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
