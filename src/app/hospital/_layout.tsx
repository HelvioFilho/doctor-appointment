import { Stack } from "expo-router";

export default function HospitalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="hospitalDoctorsList" />
      <Stack.Screen name="hospitalDetails" />
    </Stack>
  );
}
