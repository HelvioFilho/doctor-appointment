import {
  Alert,
  Linking,
  Platform,
  Pressable,
  Share,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";
import { GetHospitalsByCategoryData } from "./HospitalList";

import * as WebBrowser from "expo-web-browser";
import * as MailComposer from "expo-mail-composer";

type ActionButtonProps = {
  data: GetHospitalsByCategoryData;
};

export function ActionButton({ data }: ActionButtonProps) {
  const actionButtonList = [
    {
      id: 1,
      name: "Site",
      icon: "earth",
      action: () => handleOpenBrowser(data),
    },
    {
      id: 2,
      name: "Email",
      icon: "mail",
      action: () => handleEmail(data.email),
    },
    {
      id: 3,
      name: "Telefone",
      icon: "local-phone",
      action: () => handlePhoneCall(data.phone),
    },
    {
      id: 4,
      name: "Rotas",
      icon: "map",
      action: () => handleMapDirections(data.address),
    },
    {
      id: 5,
      name: "Compartilhar",
      icon: "share-social-sharp",
      action: () => handleShare(data),
    },
  ];

  const handleOpenBrowser = async (data: GetHospitalsByCategoryData) => {
    if (data.website) {
      try {
        await WebBrowser.openBrowserAsync(data.website);
      } catch (error) {
        const url = `https://www.google.com/search?q=${data.name}`;
        await WebBrowser.openBrowserAsync(url);
      }
    } else {
      Alert.alert("Aviso", "Nenhum site foi registrado para este hospital.");
    }
  };

  const handleEmail = async (email: string) => {
    if (email) {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (isAvailable) {
        MailComposer.composeAsync({
          recipients: [email],
          subject: "Informações de contato",
          body: "Olá, gostaria de obter mais informações.",
        });
      } else {
        Alert.alert(
          "Aviso",
          "Serviços de e-mail não estão disponíveis. Verifique se você está conectado ao aplicativo de e-mail."
        );
      }
    } else {
      Alert.alert("Aviso", "E-mail inválido!");
    }
  };

  const handlePhoneCall = (phone: string) => {
    if (phone) {
      const formattedPhone = phone.replace(/[^\d]/g, "");
      const url = `tel:+55${formattedPhone}`;
      Linking.openURL(url);
    } else {
      Alert.alert(
        "Aviso",
        "Nenhum telefone foi registrado para este hospital."
      );
    }
  };

  const handleMapDirections = (address: string) => {
    if (address) {
      const url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${address}&dirflg=d&t=h`,
        android: `geo:0,0?q=${address}`,
        web: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          address
        )}`,
      });

      url &&
        Linking.openURL(url).catch((err) =>
          Alert.alert(
            "Aviso",
            "Nenhuma aplicação encontrada para abrir o mapa."
          )
        );
    } else {
      Alert.alert("Aviso", "Endereço inválido!");
    }
  };

  const handleShare = (data: GetHospitalsByCategoryData) => {
    if (data) {
      const message = `Hospital: ${data.name}\nWebsite: ${data.website}\nEmail: ${data.email}\nTelefone: ${data.phone}\nEndereço: ${data.address}`;
      const url = `https://www.google.com/search?q=${data.name}`;
      Share.share({
        message,
        url,
      });
    } else {
      Alert.alert(
        "Aviso",
        "Ocorreu um erro inesperado ao tentar compartilhar as informações! Tente novamente mais tarde."
      );
    }
  };

  return (
    <View className="mt-4 flex-row items-center justify-between">
      {actionButtonList.map((item) => (
        <Pressable key={item.id} onPress={() => item.action()}>
          <View
            className="
            items-center 
            gap-2
          "
          >
            <View className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              {item.icon in MaterialIcons.glyphMap ? (
                <MaterialIcons
                  name={item.icon as keyof typeof MaterialIcons.glyphMap}
                  size={28}
                  color={colors.primary}
                />
              ) : (
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={28}
                  color={colors.primary}
                />
              )}
            </View>
            <Text className="text-sm font-regular">{item.name}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
