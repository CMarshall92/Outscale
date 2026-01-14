import React from "react";
import { View, StyleSheet } from "react-native";
import {
  YourStats,
  YourWeight,
  YourActivitySectionOne,
  YourActivitySectionTwo,
} from "@/components/Dashboard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <YourStats />
      <YourWeight />
      <YourActivitySectionOne />
      <YourActivitySectionTwo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
