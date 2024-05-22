import { Alert, FlatList, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { DoctorCardItem } from "./DoctorCardItem";

const GET_DOCTORS_BY_CATEGORY = gql`
  query GetDoctorsByCategory($category: String!, $limit: Int) {
    getDoctorsByCategory(category: $category, limit: $limit) {
      id
      name
      year_of_experience
      startTime
      endTime
      about
      image
    }
  }
`;

export type GetDoctorsByCategoryData = {
  id: string;
  name: string;
  year_of_experience: string;
  startTime: string;
  endTime: string;
  about: string;
  image: string;
};

export type DoctorListProps = {
  category: string;
};

export function DoctorList({ category }: DoctorListProps) {
  const { data, loading, error } = useQuery<{
    getDoctorsByCategory: GetDoctorsByCategoryData[];
  }>(GET_DOCTORS_BY_CATEGORY, {
    variables: {
      category,
      limit: 4,
    },
  });

  if (loading)
    return (
      <View className="h-24 justify-center">
        <Loading />
      </View>
    );
  if (error) {
    console.log(error);
    Alert.alert(
      "Aviso",
      "Algo deu errado e não foi possível carregar os médicos!"
    );
    return null;
  }

  return (
    <View>
      <FlatList
        data={data?.getDoctorsByCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          paddingBottom: 150,
        }}
        renderItem={({ item }) => <DoctorCardItem data={item} />}
      />
    </View>
  );
}
