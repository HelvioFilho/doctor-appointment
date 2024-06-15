import { SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { HospitalDoctorTab } from "@/components/HospitalDoctorTab";
import { HospitalList } from "@/components/HospitalList";

import { useState } from "react";
import { DoctorList } from "@/components/DoctorList";
import { BackHeader } from "@/components/BackHeader";

type HospitalDoctorsParams = {
  category: string;
};

export default function hospitalDoctorsList() {
  const { category } = useLocalSearchParams() as HospitalDoctorsParams;

  const [activeTab, setActiveTab] = useState<"hospital" | "doctors">(
    "hospital"
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      <BackHeader title={category} />
      <HospitalDoctorTab setActiveTab={setActiveTab} />
      {activeTab === "hospital" ? (
        <HospitalList category={category} />
      ) : (
        <DoctorList category={category} />
      )}
    </SafeAreaView>
  );
}
