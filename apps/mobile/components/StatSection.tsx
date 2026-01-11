import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatCard, { StatCardProps } from "./StatCard";

export interface StatRowProps {
  cardData: StatCardProps[];
}

const StatSection = ({ cardData }: StatRowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Activity</Text>

      <View style={styles.grid}>
        {cardData.map(
          ({ icon, label, value, trend, iconColor, slug }: StatCardProps) => (
            <View key={`StatCard-${slug}`} style={styles.column}>
              <StatCard
                icon={icon}
                label={label}
                value={value}
                trend={trend}
                iconColor={iconColor}
                slug={slug}
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    marginHorizontal: -6,
  },
  column: {
    flex: 1,
    paddingHorizontal: 6,
  },
});

export default StatSection;
