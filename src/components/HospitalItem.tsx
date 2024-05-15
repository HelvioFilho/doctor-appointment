import { Image, Text, View } from "react-native";
import { Hospital } from "./PremiumHospitals";

type HospitalItemProps = {
  data: Hospital;
};

const urlImage = process.env.EXPO_PUBLIC_URL_IMAGE;

export function HospitalItem({ data }: HospitalItemProps) {
  return (
    <View className="w-52 my-2 border border-gray-400 rounded-xl">
      <Image
        className="w-full h-28 rounded-t-xl"
        source={{ uri: `${urlImage}/hospital/${data.image}` }}
      />
      <View className="p-2">
        <Text className="font-semibold text-base">{data.name}</Text>
        <Text className="font-regular text-sm text-gray-600">
          {data.address}
        </Text>
      </View>
    </View>
  );
}
