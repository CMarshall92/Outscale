import React, { useCallback, useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { redirectionHandler } from "@/lib/redirects";

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
  const [fontsLoaded, fontError] = useFonts({
    MontserratSemi: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratReg: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if ((isLoaded && fontsLoaded) || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded, fontsLoaded, fontError]);

  useEffect(
    () =>
      redirectionHandler(isLoaded, isSignedIn, segments, router, fontsLoaded),
    [isLoaded, isSignedIn, segments, router, fontsLoaded]
  );

  if (!isLoaded) {
    return (
      <View
        onLayout={onLayoutRootView}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(pro)" />
      <Stack.Screen name="(auth)/signin" />
      <Stack.Screen name="(auth)/signup" />
      <Stack.Screen name="(auth)/forgot-password" />
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
        <SafeAreaView style={{ flex: 1 }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
