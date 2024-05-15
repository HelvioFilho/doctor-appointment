import * as Location from "expo-location";

type DistanceMatrixElement = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
};

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export async function getForegroundPermissions(): Promise<boolean> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

export async function getCurrentLocation(): Promise<Location.LocationObject> {
  let location = await Location.getCurrentPositionAsync({});
  return location;
}

export async function getAddressFromCoords(
  latitude: number,
  longitude: number
): Promise<string> {
  const apiKey = GOOGLE_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].formatted_address;
  } else {
    throw new Error("Erro ao obter o endereço a partir das coordenadas");
  }
}

export async function getDistanceAndDuration(
  origin: string,
  destination: string,
  mode: string = "driving"
): Promise<DistanceMatrixElement> {
  const apiKey = GOOGLE_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&mode=${mode}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (
    data.rows &&
    data.rows.length > 0 &&
    data.rows[0].elements &&
    data.rows[0].elements.length > 0
  ) {
    return data.rows[0].elements[0] as DistanceMatrixElement;
  } else {
    throw new Error("Erro ao obter a distância e o tempo");
  }
}
