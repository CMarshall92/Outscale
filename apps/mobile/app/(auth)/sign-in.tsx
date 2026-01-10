import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setError("");
    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        setError("Sign-in incomplete. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An error occurred during sign-in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={setEmailAddress}
        style={styles.input}
        editable={!isLoading}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
        editable={!isLoading}
      />
      <Button
        title={isLoading ? "Signing In..." : "Sign In"}
        onPress={onSignInPress}
        disabled={isLoading}
      />
      <Link href="/(auth)/forgot-password" asChild>
        <Pressable style={styles.link} disabled={isLoading}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </Pressable>
      </Link>

      <Link href="/(auth)/sign-up" asChild>
        <Pressable style={styles.link} disabled={isLoading}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
    textAlign: "center",
  },
  link: { marginTop: 10, alignItems: "center" },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
