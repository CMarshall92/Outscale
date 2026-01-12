import React, { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Users,
  UserPlus,
  ChevronLeftCircleIcon,
  Book,
  Boxes,
  Merge,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "./TextInput";
import OTPInput from "./OTPInput";
import { Button } from "./Button";
import { createTeam } from "@/networking/teams";
import { useUser } from "@clerk/clerk-expo";

const OPTION_SELECTED = {
  CREATE_TEAM: "create_team",
  JOIN_TEAM: "join_team",
  NONE: "none",
};

const NoTeamOptions = ({ setOption }: any) => {
  const Options = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => setOption(OPTION_SELECTED.CREATE_TEAM)}
        activeOpacity={0.8}
      >
        <Users size={18} color="#9333EA" style={styles.buttonIcon} />
        <Text style={styles.primaryButtonText}>Create Team</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => setOption(OPTION_SELECTED.JOIN_TEAM)}
        activeOpacity={0.8}
      >
        <UserPlus size={18} color="white" style={styles.buttonIcon} />
        <Text style={styles.outlineButtonText}>Join Team</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <ChevronLeftCircleIcon size={24} color="white" />
        </View>
        <View>
          <Text style={styles.title}>Join A Team</Text>
          <Text style={styles.subtitle}>We need a few more details</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Join or create a team to track progress of your friends, compete with
        friends, and achieve your fitness goals together.
      </Text>
      <Options />
    </>
  );
};

const CreateForm = ({
  user,
  setOption,
}: {
  user: { id: string | undefined } | null | undefined;
  setOption: Dispatch<SetStateAction<string>>;
}) => {
  const Form = () => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handelCreateTeam = async () => {
      setIsLoading(true);
      const code = await createTeam(user?.id, { name, description });
      console.log("Created team with code:", code);
      setIsLoading(false);
    };

    return (
      <View>
        <Input
          value={name}
          set={setName}
          placeholder="Name..."
          icon={<Users size={16} color="#fff" />}
        />
        <Input
          value={description}
          set={setDescription}
          placeholder="Description..."
          icon={<Book size={16} color="#fff" />}
        />
        <Button
          title={isLoading ? "Creating..." : "Create Team"}
          onPress={handelCreateTeam}
        />
        <Button title="Back" onPress={() => setOption(OPTION_SELECTED.NONE)} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Users size={24} color="white" />
        </View>
        <View>
          <Text style={styles.title}>Create A Team</Text>
          <Text style={styles.subtitle}>We need a few more details</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Please fill in the details below to create your new fitness team and
        start inviting members to joinr you on your fitness journey.
      </Text>
      <Form />
    </>
  );
};

const JoinForm = ({
  user,
  setOption,
}: {
  user: { id: string | undefined } | null | undefined;
  setOption: Dispatch<SetStateAction<string>>;
}) => {
  const Form = () => (
    <View>
      <OTPInput length={6} code={""} setCode={() => {}} />
      <Button title="Join Team" onSignUpPress={() => {}} />
      <Button title="Back" onPress={() => setOption(OPTION_SELECTED.NONE)} />
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Merge size={24} color="white" />
        </View>
        <View>
          <Text style={styles.title}>Team Fitness Competition</Text>
          <Text style={styles.subtitle}>Its better training together</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Join or create a team to track progress of your friends, compete with
        friends, and achieve your fitness goals together.
      </Text>
      <Form />
    </>
  );
};

const NoTeamView = () => {
  const { user, isLoaded } = useUser();
  const [option, setOption] = React.useState(OPTION_SELECTED.CREATE_TEAM);

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={["#A855F7", "#4F46E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {option === OPTION_SELECTED.NONE ? (
          <NoTeamOptions setOption={setOption} />
        ) : null}
        {option === OPTION_SELECTED.CREATE_TEAM ? (
          <CreateForm setOption={setOption} user={user} />
        ) : null}
        {option === OPTION_SELECTED.JOIN_TEAM ? (
          <JoinForm setOption={setOption} user={user} />
        ) : null}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 16,
  },
  card: {
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20,
    marginBottom: 5,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#9333EA",
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default NoTeamView;
