import { Stack } from "expo-router";

export default function HospitalLayout() {
  return (
    <Stack>
      <Stack.Screen name="hospitalDoctorsList" />
      <Stack.Screen name="hospitalDetails" />
    </Stack>
  );
}
