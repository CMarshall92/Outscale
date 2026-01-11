import React, { Dispatch, SetStateAction, useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

export const RequestNewPassword = ({
  emailAddress,
  setIsEmailSent,
  setEmailAddress,
}: {
  emailAddress: string;
  setIsEmailSent: Dispatch<SetStateAction<boolean>>;
  setEmailAddress: Dispatch<SetStateAction<string>>;
}) => {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    router.replace("/(auth)/signin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Svg width={32} height={32} viewBox="0 0 24 24" fill="#1a1a1a">
            <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </Svg>
        </View>
      </View>

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

      <View style={styles.inputWrapper}>
        <View>
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
              <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <Path d="M22 6l-10 7L2 6" />
            </Svg>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#fff"
            value={emailAddress}
            onChangeText={setEmailAddress}
            editable={!isLoading}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
      </View>

      <Pressable
        onPress={onResetPasswordPress}
        disabled={isLoading || !emailAddress.trim()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.linkText} onPress={onBackToSignIn}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
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
  link: {
    alignItems: "center",
  },
  linkText: {
    color: "white",
    textDecorationLine: "underline",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 32,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
  },
});
