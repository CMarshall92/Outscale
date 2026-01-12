import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const Button = ({ onPress, title }: any) => (
  <TouchableOpacity
    style={styles.submitButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.submitButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  submitButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
