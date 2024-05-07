import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { Button } from "@/components/Button";

import { useWarmUpBrowser } from "@/hooks/warmUpBrowser";
import { colors } from "@/theme/colors";

import Logo from "@/assets/system/icon.png";

WebBrowser.maybeCompleteAuthSession();

export function SignInScreen() {
  useWarmUpBrowser();

  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const fullText = "Seu aplicativo de consulta médica";

  const typingSpeed = 100;
  const scaleValue = 0.7;

  const { width, height } = Dimensions.get("window");
  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: appleOAuth } = useOAuth({ strategy: "oauth_apple" });

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

  const signWithGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const signWithApple = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await appleOAuth();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
    translateY.value = withDelay(500, withTiming(-90, { duration: 2000 }));
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
    <View className="flex-1 bg-background-100 items-center justify-center">
      <Animated.View style={[animatedLogoStyles]}>
        <Image source={Logo} style={[{ width: 157, height: 157 }]} />
      </Animated.View>
      <Text className="text-2xl font-bold mt-52">{displayText}</Text>

      <Animated.View
        style={[
          animatedContentStyles,
          {
            width: "85%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            gap: 10,
          },
        ]}
      >
        <Button title="Entrar com google" onPress={signWithGoogle} />
        <Button
          bgColor={colors.gray[700]}
          title="Entrar com Apple"
          onPress={signWithApple}
        />
      </Animated.View>
    </View>
  );
}
