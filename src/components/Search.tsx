import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View } from "react-native";

type SearchProps = {
  onSearch: (value: string) => void;
};

export function Search({ onSearch }: SearchProps) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View className="mt-4">
      <View className="flex-row gap-3 items-center border border-gray-600 p-2 rounded-lg">
        <Ionicons name="search-outline" size={24} color={colors.primary} />
        <TextInput
          className="w-full"
          placeholder="Pesquisar"
          placeholderTextColor={"gray"}
          onChangeText={setSearchInput}
          value={searchInput}
          onSubmitEditing={() => onSearch(searchInput)}
        />
      </View>
    </View>
  );
}
