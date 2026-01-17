import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import OTPInput from "@/components/OTPInput";

const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pending2FA, setPending2FA] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [MFACode, setMFACode] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setError("");
    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      console.log(signInAttempt);

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else if (signInAttempt.status === "needs_second_factor") {
        const emailFactor = signInAttempt?.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code"
        ) as any;

        if (emailFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailFactor.emailAddressId,
          });
          setPending2FA(true);
        }
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

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      const completeSignIn = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code: MFACode,
      });

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(completeSignIn, null, 2));
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const errorMessage =
        err.errors?.[0]?.longMessage || err.message || "Verification failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSSOPress = React.useCallback(
    async (strategy: "oauth_google" | "oauth_apple" | "oauth_facebook") => {
      try {
        const { createdSessionId, setActive, signUp, signIn } =
          await startSSOFlow({
            strategy: strategy,
            redirectUrl: AuthSession.makeRedirectUri({
              scheme: "Outscale",
              path: "oauth-native-callback",
            }),
          });

        if (createdSessionId) {
          await setActive?.({ session: createdSessionId });
        } else {
          console.log("Additional steps required", signUp || signIn);
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    },
    [startSSOFlow]
  );

  if (pending2FA) {
    return (
      <View style={styles.container}>
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

            <Text style={styles.title}>Verification</Text>
            <Text style={{ color: "white", marginBottom: 20 }}>
              Enter the code sent to your email address below
            </Text>

            <OTPInput code={MFACode} setCode={setMFACode} />

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={onVerifyPress}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPending2FA(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={[styles.linkText, { textAlign: "center" }]}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

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

          <Text style={styles.title}>Begin your journey</Text>

          <View style={styles.socialButtonsContainer}>
            <View style={styles.socialGrid}>
              <TouchableOpacity
                onPress={() => onSSOPress("oauth_google")}
                style={styles.socialButton}
              >
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

              <TouchableOpacity
                onPress={() => onSSOPress("oauth_facebook")}
                style={styles.socialButton}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path
                    fill="white"
                    d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v1.518h3.962l-.547 3.713h-3.415v7.98h-4.887"
                  />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onSSOPress("oauth_apple")}
                style={styles.socialButton}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                  <Path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z" />
                </Svg>
              </TouchableOpacity>
            </View>

            <Text style={styles.dividerText}>Or continue with</Text>

            <View style={styles.formContainer}>
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
                    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <Path d="M22 6l-10 7L2 6" />
                  </Svg>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#fff"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  style={[styles.input]}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                  onPress={() => router.replace("/(auth)/forgot-password")}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={onSignInPress}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Not a Member?{" "}
              <Text
                style={styles.linkText}
                onPress={() => router.replace("/(auth)/signup")}
              >
                Create an Account
              </Text>
            </Text>
          </View>
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
    borderColor: "#6b7280",
    borderWidth: 1,
    borderRadius: 12,
    width: "100%",
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
    color: "white",
    paddingLeft: 44,
    paddingRight: 16,
  },
  passwordInput: {
    paddingLeft: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 12,
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
    color: "white",
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
