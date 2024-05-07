import { Dimensions, FlatList, Image, Text, View } from "react-native";

export function Slider() {
  const silderList = [
    {
      id: 1,
      name: "slider 1",
      imageUrl:
        "https://photomedia.in/wp-content/uploads/2023/04/yellow-red-abstract-background-2048x1368.jpg",
    },
    {
      id: 2,
      name: "slider 2",
      imageUrl:
        "https://photomedia.in/wp-content/uploads/2023/04/red-blue-abstruct-background-2048x1365.jpg",
    },
    {
      id: 3,
      name: "slider 3",
      imageUrl:
        "https://photomedia.in/wp-content/uploads/2023/04/yellow-abstruct-background-2048x1365.jpg",
    },
  ];
  return (
    <View className="mt-3">
      <FlatList
        data={silderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            className="h-44 rounded-lg m-1"
            style={{ width: Dimensions.get("screen").width * 0.9 }}
          />
        )}
      />
    </View>
  );
}
