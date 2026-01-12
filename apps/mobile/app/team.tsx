import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";

export default function TeamPage() {
  const { team } = useLocalSearchParams();
  const router = useRouter();
  const parsedTeam = JSON.parse(team as string);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Team Page</Text>
        <Text style={styles.text}>Team Name: {parsedTeam.name}</Text>
        <Text style={styles.text}>
          Team Description: {parsedTeam.description}
        </Text>
        <Text style={styles.text}>Team Code: {parsedTeam.referenceCode}</Text>
        <Text style={styles.text}>Team ID: {parsedTeam.teamId}</Text>

        <Button
          title="Go Back Home"
          onPress={() => router.replace("/(tabs)")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});
