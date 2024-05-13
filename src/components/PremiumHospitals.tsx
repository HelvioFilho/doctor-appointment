import { Alert, FlatList, View } from "react-native";
import { SubHeader } from "./SubHeader";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { HospitalItem } from "./HospitalItem";

export type Hospital = {
  id: string;
  name: string;
  address: string;
  email: string;
  website: string;
  phone: string;
  description: string;
  image: string;
};

const GET_HOSPITALS = gql`
  query GetHospitals(
    $limit: Int
    $orderBy: String
    $orderDirection: String
    $where: String
    $whereValue: Boolean
    $random: Boolean
  ) {
    getHospitals(
      limit: $limit
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      whereValue: $whereValue
      random: $random
    ) {
      id
      name
      address
      email
      website
      phone
      description
      image
    }
  }
`;

export function PremiumHospitals() {
  const { data, loading, error } = useQuery<{ getHospitals: Hospital[] }>(
    GET_HOSPITALS,
    {
      variables: {
        limit: 4,
        orderBy: "name",
        orderDirection: "ASC",
        where: "premium",
        whereValue: true,
        random: true,
      },
    }
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
      "Algo deu errado e não foi possível carregar os hospitais!"
    );
    return null;
  }

  return (
    <View className="mt-4">
      <SubHeader title="Nossos Hospitais Premium" subtitle="Ver todos" />
      <FlatList
        data={data?.getHospitals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HospitalItem data={item} />}
      />
    </View>
  );
}
