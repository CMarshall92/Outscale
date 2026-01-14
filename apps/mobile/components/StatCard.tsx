import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: React.ComponentType<any>;
  iconColor?: string;
  slug?: string;
}

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

const StatCard = ({
  label,
  value,
  trend,
  icon: Icon,
  iconColor,
}: StatCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
          {trend && <Text style={styles.trendText}>{trend}</Text>}
        </View>

        <View style={[styles.iconContainer, { backgroundColor: "#F9FAFB" }]}>
          <Icon size={20} color={iconColor || "#6B7280"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 2,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  trendText: {
    color: "#10B981",
    fontSize: 12,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
  },
});

export default StatCard;
