import { Router } from "expo-router";

export const redirectionHandler = (
  isLoaded: boolean | undefined,
  isSignedIn: boolean | undefined, 
  segments: any, 
  router: Router, 
  fontsLoaded: boolean | undefined
) => {
  if (!isLoaded || !fontsLoaded) return;

  const inTabsGroup = segments[0] === "(tabs)";
  const inProGroup = segments[0] === "(pro)";
  const inProfile = segments[0] === "profile";
  const inAuthScreens =
    segments[0] === "signin" ||
    segments[0] === "signup" ||
    segments[0] === "forgot-password";

  if (isSignedIn) {
    if (inAuthScreens) {
      router.replace("/(tabs)");
      return;
    }

    if (!inTabsGroup && !inProGroup && !inProfile) {
      router.replace("/(tabs)");
      return;
    }
  } else {
    if (inTabsGroup || inProGroup) {
      router.replace("/(auth)/signin");
    }
  }
}