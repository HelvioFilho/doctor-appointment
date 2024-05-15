import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { HospitalDoctorTab } from "@/components/HospitalDoctorTab";
import { HospitalList } from "@/components/HospitalList";

import { colors } from "@/theme/colors";

type HospitalDoctorsParams = {
  category: string;
};

export default function hospitalDoctorsList() {
  const { back } = useRouter();
  const { category } = useLocalSearchParams() as HospitalDoctorsParams;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Pressable className="p-2" onPress={back}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={37}
              color={colors.gray[500]}
            />
          </Pressable>
        </View>
        <Text className="flex-1 font-semibold text-2xl text-center">
          {category}
        </Text>
        <View className="flex-1" />
      </View>
      <HospitalDoctorTab />
      <HospitalList category={category} />
    </SafeAreaView>
  );
}
