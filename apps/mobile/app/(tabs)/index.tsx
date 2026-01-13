import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import StatSection from "@/components/StatSection";
import { Activity, Flame } from "lucide-react-native";
import { StatCardProps } from "@/components/StatCard";

export default function HomeScreen() {
  const hasGoogleConnection = null;
  const cardDataSample: StatCardProps[] = [
    {
      label: "Calories",
      value: "847",
      trend: "+12% vs yesterday",
      icon: Flame,
      iconColor: "#F97316",
      slug: "calories",
    },
    {
      label: "Steps",
      value: "8.2k",
      trend: "+8% vs yesterday",
      icon: Activity,
      iconColor: "#3B82F6",
      slug: "steps",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {hasGoogleConnection ? (
          <>
            <StatSection cardData={cardDataSample} />
            <StatSection cardData={cardDataSample} />
          </>
        ) : null}
      </ScrollView>
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
