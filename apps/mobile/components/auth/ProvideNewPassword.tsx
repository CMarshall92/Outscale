import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import OTPInput from "@/components/OTPInput";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export const ProvideNewPassword = ({ emailAddress }: any) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const onProvideNewPasswordPress = async () => {
    if (!isLoaded) return;

    if (password !== confirmedPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const { createdSessionId, status } = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code,
        password: password,
      });

      if (status === "complete") {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#1a1a1a" }}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Svg width={32} height={32} viewBox="0 0 24 24" fill="#1a1a1a">
              <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </Svg>
          </View>
        </View>

        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a password reset code to {emailAddress}
        </Text>
        <Text style={styles.instruction}>
          Enter the code you recieved below and then provide your new password
          in the inputs below.
        </Text>

        <OTPInput code={code} setCode={setCode} length={6} />

        {code.length === 6 && (
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                <Svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </Svg>
              </View>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#fff"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.iconContainer}>
                <Svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </Svg>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                secureTextEntry
              />
            </View>
          </>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={onProvideNewPasswordPress} style={styles.button}>
          <Text style={styles.buttonText}>
            {isLoading ? "Updating..." : "Update Password"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoBox: {
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    lineHeight: 22,
  },
  instruction: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#888",
    lineHeight: 20,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
    marginVertical: 10,
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
  errorText: {
    color: "#f44336",
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    marginVertical: 20,
    borderColor: "#6b7280",
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontSize: 16,
    color: "white",
  },
});
