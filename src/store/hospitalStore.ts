import { create } from "zustand";
import { GetHospitalsByCategoryData } from "@/components/HospitalList";

type HospitalStoreProps = {
  hospitalData: GetHospitalsByCategoryData;
  setHospitalData: (hospitalData: GetHospitalsByCategoryData) => void;
};

export const useHospitalStore = create<HospitalStoreProps>((set) => ({
  hospitalData: {} as GetHospitalsByCategoryData,
  setHospitalData: (hospitalData: GetHospitalsByCategoryData) =>
    set({ hospitalData }),
}));
