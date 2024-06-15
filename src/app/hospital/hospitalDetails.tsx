import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ActionButton } from "@/components/ActionButton";
import { HospitalInfo } from "@/components/HospitalInfo";
import { useHospitalStore } from "@/store/hospitalStore";
import { SubHeader } from "@/components/SubHeader";
import { Button } from "@/components/Button";

import { colors } from "@/theme/colors";

const urlImage = process.env.EXPO_PUBLIC_URL_IMAGE;

export default function hospitalDetails() {
  const { hospitalData } = useHospitalStore();
  const { back, push } = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 relative">
      <View className="absolute top-28 left-8 z-40 bg-white rounded-full">
        <Pressable className="p-2" onPress={back}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </Pressable>
      </View>
      <Image
        className="w-full h-60"
        source={{ uri: `${urlImage}/hospital/${hospitalData.image}` }}
      />
      <ScrollView
        className="flex-1 -mt-5 bg-white rounded-t-3xl p-5"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <HospitalInfo data={hospitalData} />
        <ActionButton data={hospitalData} />
        <View className="border-b border-gray-300 m-1 my-5" />
        <View>
          <SubHeader title="Sobre" subtitle="" />
          <Text className="mt-3 text-md font-regular text-gray-600">
            {hospitalData.description}
          </Text>
        </View>
      </ScrollView>
      <View className="mb-3 mx-4">
        <Button
          onPress={() => push("/appointment/bookAppointment")}
          title="Agendar Consulta"
        />
      </View>
    </SafeAreaView>
  );
}
