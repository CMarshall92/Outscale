import React from "react";
import { StyleSheet, View } from "react-native";
import StatSection from "@/components/StatSection";
import DashboardHeader from "@/components/DashboardHeader";
import { Activity, Flame } from "lucide-react-native";
import { StatCardProps } from "@/components/StatCard";
import TeamSection from "@/components/TeamSection";

export default function HomeScreen() {
  const cardDataSample: StatCardProps[] = [
    {
      label: "Calories",
      value: "847",
      trend: "+12% vs yesterday",
      icon: Flame,
      iconColor: "#F97316",
    },
    {
      label: "Steps",
      value: "8.2k",
      trend: "+8% vs yesterday",
      icon: Activity,
      iconColor: "#3B82F6",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DashboardHeader />
      <View style={styles.container}>
        <StatSection cardData={cardDataSample} />
        <StatSection cardData={cardDataSample} />
        <TeamSection />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
