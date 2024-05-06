import { colors } from "@/theme/colors";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = PressableProps & {
  bgColor?: string;
  textColor?: string;
  title: string;
};

export function Button({
  bgColor = colors.primary,
  textColor = colors.white,
  title,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      className="
        w-full
        h-14
        rounded-2xl 
        items-center 
        justify-center 
      "
      style={{ backgroundColor: bgColor }}
      {...rest}
    >
      <Text className="font-bold" style={{ color: textColor }}>
        {title}
      </Text>
    </Pressable>
  );
}
