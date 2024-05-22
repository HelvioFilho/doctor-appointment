import { Image, Text, View } from "react-native";
import { GetDoctorsByCategoryData } from "./DoctorList";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Button } from "./Button";

type DoctorListItemProps = {
  data: GetDoctorsByCategoryData;
};

const urlImage = process.env.EXPO_PUBLIC_URL_IMAGE;

export function DoctorListItem({ data }: DoctorListItemProps) {
  return (
    <View className="rounded-xl mb-5 border border-gray-400">
      <View className="p-4 flex-row">
        <Image
          className="w-32 h-36 rounded-xl"
          source={{ uri: `${urlImage}/doctors/${data.image}` }}
        />
        <View className="px-4 py-1 justify-between">
          <View className="flex-row items-center justify-center gap-1 bg-secondary rounded-xl py-1 px-2">
            <Ionicons
              name="shield-checkmark"
              size={15}
              color={colors.primary}
            />
            <Text className="font-semibold text-sm text-primary">
              Médico Certificado
            </Text>
          </View>
          <View>
            <Text className="font-bold text-lg">{data.name}</Text>
            <Text className="font-regular text-sm text-gray-600">
              {data.about}
            </Text>
          </View>
          <Text className="font-regular text-md text-primary">
            {data.year_of_experience} anos de experiência
          </Text>
        </View>
      </View>
      <View className="px-4 pb-3">
        <Text className="font-bold text-md">Horário de atendimento:</Text>
        <Text className="font-regular text-sm text-gray-600">
          de {data.startTime} a {data.endTime}
        </Text>
      </View>
      <View className="pb-3 px-4">
        <Button
          bgColor={colors.secondary}
          textColor={colors.primary}
          title="Agendar Consulta"
        />
      </View>
    </View>
  );
}
