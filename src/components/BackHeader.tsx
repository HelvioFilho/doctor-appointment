import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/theme/colors";

type BackHeaderProps = {
  title?: string;
  color?: string;
};
export function BackHeader({ title, color }: BackHeaderProps) {
  const { back } = useRouter();

  if (!color) color = colors.gray[500];
  return (
    <View className="flex-row items-center justify-between">
      <Pressable className="p-2" onPress={back}>
        <Ionicons name="arrow-back-circle-outline" size={37} color={color} />
      </Pressable>

      {title && (
        <Text className="font-semibold text-2xl text-center">{title}</Text>
      )}
      <View className="w-9" />
    </View>
  );
}
