import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import OTPInput from "@/components/OTPInput";
import { createDBUser } from "@/networking/users";

export default function SignupForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const [error, setError] = useState<{
    message: string | null;
    first: string | null;
    last: string | null;
    email: string | null;
    password: string | null;
  }>({
    message: null,
    first: null,
    last: null,
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setError({
      message: null,
      first: null,
      last: null,
      email: null,
      password: null,
    });
    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.first,
        lastName: formData.last,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        if (err.errors[0].meta?.paramName === "first_name") {
          setError((s) => ({
            ...s,
            first: err.errors[0]?.longMessage || "First name is required",
          }));
        }

        if (err.errors[0].meta?.paramName === "last_name") {
          setError((s) => ({
            ...s,
            last: err.errors[0]?.longMessage || "Last name is required",
          }));
        }

        if (err.errors[0].meta?.paramName === "email_address") {
          setError((s) => ({
            ...s,
            email: err.errors[0]?.longMessage || "Email is required",
          }));
        }

        if (err.errors[0].meta?.paramName === "password") {
          setError((s) => ({
            ...s,
            password: err.errors[0].message || "Password is required",
          }));
        }
      } else if (err.message) {
        setError((s) => ({ ...s, message: err.message }));
      } else {
        setError((s) => ({
          ...s,
          message: "An error occurred during sign-up. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setError({
      message: null,
      first: null,
      last: null,
      email: null,
      password: null,
    });
    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        const user = await createDBUser(
          signUpAttempt.createdUserId,
          signUpAttempt.firstName,
          signUpAttempt.lastName,
          signUpAttempt.emailAddress
        );

        if (user) {
          await setActive({ session: signUpAttempt.createdSessionId });
          router.replace("/(tabs)");
        }
      } else {
        setError((s) => ({
          ...s,
          message: "Verification incomplete, try again.",
        }));
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError((s) => ({ ...s, message: errorMessage }));
      } else if (err.message) {
        setError((s) => ({ ...s, message: err.message }));
      } else {
        setError((s) => ({
          ...s,
          message: "Invalid verification code. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Svg width={32} height={32} viewBox="0 0 24 24" fill="#1a1a1a">
                <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </Svg>
            </View>
          </View>

          {!pendingVerification && (
            <>
              <Text style={styles.title}>Create your account</Text>

              <View style={styles.socialButtonsContainer}>
                <View>
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
                        value={formData.email}
                        onChangeText={(text) =>
                          handleInputChange("email", text)
                        }
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                    {error.email ? (
                      <Text style={styles.errorText}>{error.email}</Text>
                    ) : null}
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
                      style={[styles.input]}
                      placeholder="Password"
                      placeholderTextColor="#fff"
                      value={formData.password}
                      onChangeText={(text) =>
                        handleInputChange("password", text)
                      }
                      secureTextEntry
                    />
                    {error.password ? (
                      <Text style={styles.errorText}>{error.password}</Text>
                    ) : null}
                  </View>

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
                          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <Circle cx="12" cy="7" r="4" />
                        </Svg>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor="#fff"
                        value={formData.first}
                        onChangeText={(text) =>
                          handleInputChange("first", text)
                        }
                      />
                    </View>
                    {error.first ? (
                      <Text style={styles.errorText}>{error.first}</Text>
                    ) : null}
                  </View>

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
                          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <Circle cx="12" cy="7" r="4" />
                        </Svg>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor="#fff"
                        value={formData.last}
                        onChangeText={(text) => handleInputChange("last", text)}
                      />
                    </View>

                    {error.last ? (
                      <Text style={styles.errorText}>{error.last}</Text>
                    ) : null}
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={onSignUpPress}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.submitButtonText}>
                        Create Account
                      </Text>
                    </TouchableOpacity>
                    {error.message ? (
                      <Text style={styles.errorText}>{error.message}</Text>
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Already have an account?{" "}
                  <Text
                    style={styles.linkText}
                    onPress={() => router.push("/(auth)/signin")}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </>
          )}

          {pendingVerification && (
            <>
              <Text style={styles.title}>Verify Email</Text>
              <Text style={styles.subtitle}>
                Enter the verification code sent to
              </Text>
              <Text style={styles.subtitle}>{formData.email}</Text>

              {error.message ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error.message}</Text>
                </View>
              ) : null}

              <OTPInput code={code} setCode={setCode} length={6} />

              <Pressable onPress={onPressVerify} disabled={isLoading}>
                <Text style={styles.submitButtonText}>
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  scrollContainer: {
    flexGrow: 1,
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
    color: "white",
    fontSize: 24,
    marginBottom: 32,
    fontWeight: "600",
  },
  socialButtonsContainer: {
    width: "100%",
    maxWidth: 384,
    marginBottom: 24,
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    paddingTop: 5,
    paddingLeft: 20,
  },
  socialGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    marginBottom: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputWrapper: {
    position: "relative",
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
  verifyInput: {
    width: "100%",
    height: 48,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    color: "#fff",
    paddingLeft: 44,
    paddingRight: 16,
    marginBottom: 20,
  },
  passwordInput: {
    paddingLeft: 16,
  },
  submitButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
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
  linkText: {
    color: "white",
    textDecorationLine: "underline",
  },
});
