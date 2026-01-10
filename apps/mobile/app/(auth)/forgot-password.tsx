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

export default function ForgotPasswordScreen() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onResetPasswordPress = async () => {
    if (!isLoaded) return;

    setError("");
    setIsLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setIsEmailSent(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          "An error occurred while sending reset email. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onBackToSignIn = () => {
    router.replace("/(auth)/sign-in");
  };

  if (isEmailSent) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a password reset link to {emailAddress}
        </Text>
        <Text style={styles.instruction}>
          Please check your email and follow the instructions to reset your
          password.
        </Text>

        <Pressable onPress={onBackToSignIn} style={styles.button}>
          <Text>Back to Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send you a link to reset your
        password.
      </Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email address..."
        onChangeText={setEmailAddress}
        style={styles.input}
        editable={!isLoading}
        keyboardType="email-address"
        autoComplete="email"
      />

      <Pressable
        onPress={onResetPasswordPress}
        disabled={isLoading || !emailAddress.trim()}
        style={styles.button}
      >
        <Text>{isLoading ? "Sending..." : "Send Reset Link"}</Text>
      </Pressable>

      <Link href="/(auth)/sign-in" asChild>
        <Pressable style={styles.link} disabled={isLoading}>
          <Text style={styles.linkText}>Back to Sign In</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 22,
  },
  instruction: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#888",
    lineHeight: 20,
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
  button: {
    marginBottom: 20,
  },
  link: {
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
