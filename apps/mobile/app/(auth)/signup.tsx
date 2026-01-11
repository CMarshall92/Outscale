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
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        setError((s) => ({
          ...s,
          message: "Verification incomplete. Please try again.",
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
                <View style={styles.socialGrid}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <Path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z" />
                    </Svg>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}>
                    <Svg width={20} height={20} viewBox="0 0 24 24">
                      <Path
                        fill="currentColor"
                        color="white"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <Path
                        fill="currentColor"
                        color="white"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <Path
                        fill="currentColor"
                        color="white"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <Path
                        fill="currentColor"
                        color="white"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>

                <Text style={styles.dividerText}>Or continue with</Text>

                <View>
                  <View style={styles.inputWrapper}>
                    <View>
                      <View style={styles.iconContainer}>
                        <Svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6b7280"
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
                        placeholderTextColor="#6b7280"
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
                          stroke="#6b7280"
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
                        placeholderTextColor="#6b7280"
                        value={formData.last}
                        onChangeText={(text) => handleInputChange("last", text)}
                      />
                    </View>

                    {error.last ? (
                      <Text style={styles.errorText}>{error.last}</Text>
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
                          stroke="#6b7280"
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
                        placeholderTextColor="#6b7280"
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
                    <View>
                      <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Password"
                        placeholderTextColor="#6b7280"
                        value={formData.password}
                        onChangeText={(text) =>
                          handleInputChange("password", text)
                        }
                        secureTextEntry
                      />
                    </View>
                    {error.password ? (
                      <Text style={styles.errorText}>{error.password}</Text>
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
    color: "#6b7280",
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
