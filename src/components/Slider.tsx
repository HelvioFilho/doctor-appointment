import { useQuery, gql } from "@apollo/client";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
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

export function Slider() {
  // const [getSliders, setSliders] = useState<SliderList[]>([]);
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
    console.log(error);
    return <Text>Error: {error.message} </Text>;
  }

  return (
    <View className="mt-3">
      <FlatList
        data={data?.getSliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item.imageUrl }}
              className="h-44 rounded-lg m-1"
              alt=""
              style={{ width: Dimensions.get("screen").width * 0.9 }}
            />
          );
        }}
      />
    </View>
  );
}
