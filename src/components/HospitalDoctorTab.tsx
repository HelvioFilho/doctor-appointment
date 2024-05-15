import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function HospitalDoctorTab() {
  const [active, setActive] = useState(true);

  return (
    <View className="p-2">
      <View className="flex-row align-center justify-around">
        <Pressable
          onPress={() => setActive(true)}
          className={`
            p-1 
            border-b-2
            ${active === true ? "border-primary" : "border-gray-400"} 
          `}
        >
          <Text
            className={`
              font-regular 
              text-lg 
              text-center 
              ${active === true ? "text-primary" : "text-gray-600"} 
            `}
          >
            Hospital
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActive(false)}
          className={`
            
            p-1 
            border-b-2
            ${active === false ? "border-primary" : "border-gray-400"} 
          `}
        >
          <Text
            className={`
              font-regular 
              text-lg 
              text-center 
              ${active === false ? "text-primary" : "text-gray-600"} 
            `}
          >
            Médicos
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
