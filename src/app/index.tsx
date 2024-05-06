import React, { useState, useEffect } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";

import Logo from "@/assets/system/icon.png";

export default function Index() {
  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const fullText = "Seu aplicativo de consulta médica";

  const typingSpeed = 100;
  const scaleValue = 0.7;

  const { width, height } = Dimensions.get("window");

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const handleAnimationComplete = () => {
    setStartTyping(true);
  };

  useDerivedValue(() => {
    if (scale.value === scaleValue) {
      runOnJS(handleAnimationComplete)();
    }
  });

  const animatedLogoStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
      position: "absolute",
      left: width / 2 - 78.5,
      top: height / 2 - 78.5,
    };
  });

  const animatedContentStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    scale.value = withDelay(500, withTiming(scaleValue, { duration: 1500 }));
    translateY.value = withDelay(500, withTiming(-300, { duration: 2000 }));
    opacity.value = withDelay(6000, withTiming(1, { duration: 1500 }));
  }, []);

  useEffect(() => {
    if (startTyping) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText((prev) => prev + fullText[index]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, typingSpeed);

      return () => clearInterval(intervalId);
    }
  }, [startTyping]);

  return (
    <View className="flex-1 bg-background-100 items-center justify-center pt-32">
      <Animated.Image
        source={Logo}
        style={[{ width: 157, height: 157 }, animatedLogoStyles]}
      />
      <Text className="text-2xl font-bold relative -top-32">{displayText}</Text>
      <Animated.View
        style={[
          animatedContentStyles,
          {
            marginTop: 16,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Pressable
          className="
            w-5/6 
            h-12 
            bg-primary 
            rounded-2xl 
            items-center 
            justify-center 
            mt-4
            relative
            -top-32
          "
        >
          <Text className="text-white font-bold">Entrar com o google</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
