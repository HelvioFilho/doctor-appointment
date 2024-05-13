import { Pressable, PressableProps, Text, View } from "react-native";

type SubHeaderProps = PressableProps & {
  title: string;
  subtitle: string;
};
export function SubHeader({ title, subtitle, ...rest }: SubHeaderProps) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="font-bold text-xl">{title}</Text>
      <Pressable className="flex-row items-center gap-1" {...rest}>
        <Text className="font-regular text-primary">{subtitle}</Text>
      </Pressable>
    </View>
  );
}
