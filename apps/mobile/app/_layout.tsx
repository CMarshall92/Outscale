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
    const inTeamRoute = segments[0] === "team";
    const inAuthScreens =
      segments[0] === "signin" ||
      segments[0] === "signup" ||
      segments[0] === "forgot-password";

    if (isSignedIn) {
      if (inAuthScreens) {
        router.replace("/(tabs)");
        return;
      }

      if (!inTabsGroup && !inTeamRoute) {
        router.replace("/(tabs)");
        return;
      }
    } else {
      if (inTabsGroup) {
        router.replace("/(auth)/signin");
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)/signin" />
      <Stack.Screen name="(auth)/signup" />
      <Stack.Screen name="(auth)/forgot-password" />
      <Stack.Screen name="team" />
    </Stack>
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
