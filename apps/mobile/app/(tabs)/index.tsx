import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import StatSection from "@/components/StatSection";
import DashboardHeader from "@/components/DashboardHeader";
import { Activity, Flame } from "lucide-react-native";
import { StatCardProps } from "@/components/StatCard";
import CompetativeSection from "@/components/CompetativeSection";
import { useAuth, useUser } from "@clerk/clerk-expo";

const fetchTeams = async (userId: string) => {
  try {
    const url = `${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams?userId=${userId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return json.data;
  } catch (error) {
    console.error("Request failed:", error);
  }
};

const createTeam = async (userId: string) => {
  try {
    const url = `${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

export default function HomeScreen() {
  const { user, isLoaded } = useUser();
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    // const getTeams = async () => setTeams(await fetchTeams(user!.id));
    const createTeams = async () => await createTeam(user!.id);
    // if (isLoaded) getTeams();
    if (isLoaded) createTeams();
  }, []);

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

  console.log("Fetched teams:", teams);

  return (
    <View style={{ flex: 1 }}>
      <DashboardHeader />
      <ScrollView style={styles.container}>
        <StatSection cardData={cardDataSample} />
        <StatSection cardData={cardDataSample} />
        <CompetativeSection />
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
