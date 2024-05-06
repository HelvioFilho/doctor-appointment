import "@/theme/global.css";

import { Slot } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView, StatusBar } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SignInScreen } from "./SignInScreen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const publishableKey = process.env
    .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle={"dark-content"} />
        <SignedIn>
          <Slot />
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}
