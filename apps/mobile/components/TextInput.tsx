import { View, TextInput, StyleSheet } from "react-native";

export const Input = ({
  value,
  set,
  icon,
  placeholder,
}: {
  value: string;
  set: (text: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.iconContainer}>{icon || null}</View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={set}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
    marginVertical: 5,
    borderColor: "#6b7280",
    borderWidth: 1,
    borderRadius: 12,
  },
  iconContainer: {
    position: "absolute",
    left: 16,
    zIndex: 1,
    justifyContent: "center",
    height: "100%",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    color: "#fff",
    paddingLeft: 44,
    paddingRight: 16,
  },
});
