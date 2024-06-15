import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";

import { Loading } from "./Loading";
import { Hospital } from "./PremiumHospitals";
import { HospitalCardItem } from "./HospitalCardItem";

import {
  getAddressFromCoords,
  getCurrentLocation,
  getDistanceAndDuration,
  getForegroundPermissions,
} from "@/library/location";

import { useHospitalStore } from "@/store/hospitalStore";

const GET_HOSPITALS_BY_CATEGORY = gql`
  query GetHospitalsByCategory($category: String!, $limit: Int) {
    getHospitalsByCategory(category: $category, limit: $limit) {
      id
      name
      address
      email
      website
      phone
      description
      premium
      image
      operation
      day_of_week
      categories {
        id
        name
      }
    }
  }
`;

export type GetHospitalsByCategoryData = Hospital & {
  premium: boolean;
  categories: {
    id: string;
    name: string;
  }[];
  operation: string;
  day_of_week: string;
  distance?: string;
  duration?: string;
};

type HospitalCardItemProps = {
  category: string;
};

export function HospitalList({ category }: HospitalCardItemProps) {
  const { data, loading, error } = useQuery<{
    getHospitalsByCategory: GetHospitalsByCategoryData[];
  }>(GET_HOSPITALS_BY_CATEGORY, {
    variables: {
      category,
      limit: 4,
    },
  });

  const [hospitals, setHospitals] = useState<GetHospitalsByCategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();
  const { setHospitalData } = useHospitalStore();

  const fetchDistancesAndDurations = async (
    hospitals: GetHospitalsByCategoryData[]
  ) => {
    try {
      const location = await getCurrentLocation();
      const origin = await getAddressFromCoords(
        location.coords.latitude,
        location.coords.longitude
      );
      const promises = hospitals.map(async (hospital) => {
        try {
          const result = await getDistanceAndDuration(origin, hospital.address);
          if (result.status !== "ZERO_RESULTS") {
            return {
              ...hospital,
              distance: result.distance.text,
              duration: result.duration.text,
            };
          }
          return hospital;
        } catch (error) {
          console.error(
            `Erro ao obter distância e duração para o hospital ${hospital.name}:`,
            error
          );
          return hospital;
        }
      });
      const updatedHospitals = await Promise.all(promises);
      setHospitals(updatedHospitals);
    } catch (error) {
      Alert.alert(
        "Aviso",
        "Erro ao obter localização: " +
          (error instanceof Error ? error.message : "Erro desconhecido")
      );
    }
  };

  const checkPermission = async (hospitals: GetHospitalsByCategoryData[]) => {
    const hasPermission = await getForegroundPermissions();
    if (hasPermission) {
      await fetchDistancesAndDurations(hospitals);
    } else {
      setHospitals(hospitals);
      Alert.alert(
        "Aviso",
        "Sem a permissão de acessar a localização algumas funcionalidades não vão funcionar de maneira correta"
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (data) {
      checkPermission(data.getHospitalsByCategory);
    }
  }, [data]);

  if (loading || isLoading)
    return (
      <View className="h-24 justify-center">
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

  const handleNavigateToDetails = (hospital: GetHospitalsByCategoryData) => {
    setHospitalData(hospital);
    push("/hospital/hospitalDetails");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={hospitals}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          paddingBottom: 150,
        }}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleNavigateToDetails(item)}>
            <HospitalCardItem data={item} />
          </Pressable>
        )}
      />
    </View>
  );
}
