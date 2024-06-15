import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GetHospitalsByCategoryData } from "./HospitalList";
import { colors } from "@/theme/colors";

type AppointmentHospitalInfoProps = {
  data: GetHospitalsByCategoryData;
};

const urlImage = process.env.EXPO_PUBLIC_URL_IMAGE;

export function AppointmentHospitalInfo({
  data,
}: AppointmentHospitalInfoProps) {
  let address = data.address.slice(0, -11);

  return (
    <View className="mt-5 flex-row items-center gap-4">
      <Image
        className="w-28 h-28 rounded-full"
        source={{ uri: `${urlImage}/hospital/${data.image}` }}
      />
      <View className="px-2 py-1">
        <Text className="font-bold text-xl ">{data.name}</Text>
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text className="w-3/4 font-regular text-base text-gray-600">
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
}
