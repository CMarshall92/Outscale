import React from "react";
import { Tabs, useRouter } from "expo-router";
import { BadgeCheck, Bike, Flame } from "lucide-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DashboardHeader from "@/components/DashboardHeader";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: true,
        header: () => <DashboardHeader />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: "Competition",
          tabBarIcon: ({ color }) => <Flame size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color }) => <Bike size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="members"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/(pro)/letsCook");
          },
        })}
        options={{
          title: "Members",
          tabBarIcon: ({ color }) => <BadgeCheck size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
