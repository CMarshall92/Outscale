import React, { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const inTabsGroup = segments[0] === "(tabs)";
    const inAuthScreens =
      segments[0] === "sign-in" ||
      segments[0] === "sign-up" ||
      segments[0] === "forgot-password";
    const inAccountScreens = segments[0] === "change-password";

    if (isSignedIn) {
      // If signed in and on auth screens, push to main app
      if (inAuthScreens) {
        router.replace("/(tabs)");
        return;
      }

      // Allow tabs and account screens like change-password; otherwise go to tabs
      if (!inTabsGroup && !inAccountScreens) {
        router.replace("/(tabs)");
      }
    } else {
      // If signed out and in protected areas (tabs or account screens), go to sign-in
      if (inTabsGroup || inAccountScreens) {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [isLoaded, isSignedIn, segments, router]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="(auth)/forgot-password" />
        <Stack.Screen
          name="(auth)/change-password"
          options={{
            presentation: "modal",
            title: "Change Password",
            headerBackTitle: "Profile",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
      // Configure for mobile platform
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#007AFF",
        },
      }}
    >
      <SafeAreaProvider>
        <InitialLayout />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
