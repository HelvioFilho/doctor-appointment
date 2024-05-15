import { Image, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { GetHospitalsByCategoryData } from "./HospitalList";

import { colors } from "@/theme/colors";

type HospitalCardItemProps = {
  data: GetHospitalsByCategoryData;
};

const urlImage = process.env.EXPO_PUBLIC_URL_IMAGE;

export function HospitalCardItem({ data }: HospitalCardItemProps) {
  const categoriesString = data.categories
    .map((category) => category.name)
    .join(", ");
  let address = data.address.slice(0, -11);
  if (address.length > 45) {
    address = address.slice(0, 45) + "...";
  }

  return (
    <View className="rounded-xl mb-5 border border-gray-400">
      <Image
        source={{ uri: `${urlImage}/hospital/${data.image}` }}
        className="w-full h-36 rounded-t-xl"
      />
      <View className="p-2.5 bg-white rounded-b-xl">
        <Text className="font-semibold text-lg">{data.name}</Text>
        <Text className="font-regular text-gray-600">{categoriesString}</Text>
        <View className="border-b border-gray-300 m-1 mb-3" />
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text className="font-regular text-base text-gray-600">
            {address}
          </Text>
        </View>
        {data.duration && data.distance && (
          <View className="flex-row items-center gap-1.5 pl-1 mt-2">
            <AntDesign name="clockcircle" size={15} color={colors.primary} />
            <Text className="font-regular text-base text-gray-600">
              {data.duration} - {data.distance}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
