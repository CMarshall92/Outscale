import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { Brain, ChefHat } from "lucide-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DashboardHeader from "@/components/DashboardHeader";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/(tabs)");
          },
        })}
        options={{
          title: "Dashboard",
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
        name="letsCook"
        options={{
          title: "Lets Cook",
          tabBarIcon: ({ color }) => <ChefHat size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="letsDiet"
        options={{
          title: "Lets Diet",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="letsFast"
        options={{
          title: "Lets Fast",
          tabBarIcon: ({ color }) => <Brain size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
