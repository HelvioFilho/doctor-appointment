import { useQuery, gql } from "@apollo/client";
import { Alert, Dimensions, FlatList, Image, View } from "react-native";

import { Loading } from "./Loading";

const GET_SLIDERS = gql`
  query GetSliders {
    getSliders {
      id
      name
      imageUrl
    }
  }
`;

type SliderList = {
  id: number;
  name: string;
  imageUrl: string;
};

const urlImage = process.env.EXPO_PUBLIC_URL_IMAGE;

export function Slider() {
  const { data, loading, error } = useQuery<{ getSliders: SliderList[] }>(
    GET_SLIDERS
  );

  if (loading)
    return (
      <View className="h-44 justify-center">
        <Loading />
      </View>
    );
  if (error) {
    Alert.alert(
      "Aviso",
      "Algo deu errado e não foi possível carregar as imagens!"
    );
    return null;
  }

  return (
    <View className="mt-3">
      <FlatList
        data={data?.getSliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{ flexGrow: 1, paddingEnd: 2 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: `${urlImage}/${item.imageUrl}` }}
              className="h-44 rounded-lg mx-2 my-2"
              alt={item.name}
              style={{ width: Dimensions.get("screen").width * 0.9 }}
            />
          );
        }}
      />
    </View>
  );
}
