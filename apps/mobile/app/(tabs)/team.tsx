import React from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CompetativeSection from "@/components/CompetativeSection";

export default function TeamPage() {
  const { team } = useLocalSearchParams();
  console.log("Team params:", team);

  return (
    <View style={styles.container}>
      <CompetativeSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
