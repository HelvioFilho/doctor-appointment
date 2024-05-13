import { gql, useQuery } from "@apollo/client";
import { Alert, FlatList, Image, Text, View } from "react-native";
import { Loading } from "./Loading";
import { SubHeader } from "./SubHeader";

const GET_CATEGORIES = gql`
  query GetCategories($limit: Int, $orderBy: String, $orderDirection: String) {
    getCategories(
      limit: $limit
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      name
      icon
    }
  }
`;

type Category = {
  id: string;
  name: string;
  icon: string;
};

export function Categories() {
  const { data, loading, error } = useQuery<{ getCategories: Category[] }>(
    GET_CATEGORIES,
    {
      variables: {
        limit: 4,
        orderBy: "name",
        orderDirection: "ASC",
      },
    }
  );

  if (loading)
    return (
      <View className="h-22 justify-center">
        <Loading />
      </View>
    );
  if (error) {
    Alert.alert(
      "Aviso",
      "Algo deu errado e não foi possível carregar as categorias"
    );
    return null;
  }

  return (
    <View className="mt-4 px-2">
      <SubHeader
        title="Especialidade Médica"
        subtitle="Ver todos"
        onPress={() => console.log("Ver todos")}
      />
      <FlatList
        data={data?.getCategories}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mt-6 mb-4 mx-2.5 items-center gap-2">
            <View
              className={`
                rounded-full 
                items-center
                justify-center
                w-16 h-16
                border-8 
                border-secondary
              `}
            >
              <Image source={{ uri: item.icon }} className="w-8 h-8" />
            </View>
            <Text className="text-center font-regular">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
