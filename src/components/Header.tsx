import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export function Header() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) return null;
  return (
    <View className="flex-row justify-between px-2">
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: user.imageUrl }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text>Olá,👋</Text>
          <Text className="font-bold text-lg">{user.fullName}</Text>
        </View>
      </View>
      <Ionicons name="notifications-outline" size={28} color="black" />
    </View>
  );
}
