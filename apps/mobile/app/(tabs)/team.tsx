import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import CompetativeSetup from "@/components/CompetativeSetup";
import { useUser } from "@clerk/clerk-expo";
import { fetchTeamByUserId } from "@/networking/teams";
import { Team } from "@/types/team";

export default function TeamPage() {
  const { user } = useUser();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeam = async () =>
      setTeam((await fetchTeamByUserId(user?.id))?.[0] || null);
    fetchTeam();
  }, []);

  return (
    <>
      <CompetativeSetup teamData={team} />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
