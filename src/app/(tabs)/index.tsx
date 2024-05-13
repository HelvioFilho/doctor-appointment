import { Button } from "@/components/Button";
import { Categories } from "@/components/Categories";
import { Header } from "@/components/Header";
import { PremiumHospitals } from "@/components/PremiumHospitals";
import { Search } from "@/components/Search";
import { Slider } from "@/components/Slider";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  const { isLoaded, signOut } = useAuth();

  return (
    <View className="flex-1 bg-white pt-16 px-4">
      <StatusBar style="dark" />
      <Header />
      <Search onSearch={(text) => console.log(text)} />
      <Slider />
      <Categories />
      <PremiumHospitals />
    </View>
  );
}
