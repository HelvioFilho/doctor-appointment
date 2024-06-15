import { Text, View } from "react-native";
import { GetHospitalsByCategoryData } from "./HospitalList";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

type HospitalInfoProps = {
  data: GetHospitalsByCategoryData;
};

export function HospitalInfo({ data }: HospitalInfoProps) {
  const categories = data.categories
    .map((category) => category.name)
    .join(", ");
  let address = data.address.slice(0, -11);

  return (
    <View>
      <Text className="text-2xl font-bold">{data.name}</Text>

      <Text className="text-sm font-regular text-gray-600">{categories}</Text>
      <View className="border-b border-gray-300 m-1 mb-3" />
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="location" size={20} color={colors.primary} />
        <Text className="font-regular text-base text-gray-600">{address}</Text>
      </View>
      <View className="flex-row items-center gap-1.5 pl-1 mt-2">
        <AntDesign name="clockcircle" size={15} color={colors.primary} />
        <Text className="font-regular text-base text-gray-600">
          {data.duration} - {data.distance} -{" "}
          {`${data.operation && `${data.operation} | `}`}
          {data.day_of_week}
        </Text>
      </View>
    </View>
  );
}
