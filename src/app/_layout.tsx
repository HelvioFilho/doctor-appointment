import "@/theme/global.css";

import { Slot } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

import { SignInScreen } from "./SignInScreen";

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
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <View className="flex-1 bg-background-100">
        <StatusBar barStyle={"dark-content"} />
        <SignedIn>
          <Slot />
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}
