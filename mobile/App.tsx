import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, Touchable, TouchableOpacity, View, ViewComponent } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import blurBg from "./src/assets/bg-blur.png";
import Stripes from "./src/assets/stripes.svg";
import Logo from "./src/assets/logo.svg";

import { styled } from "nativewind";

const StyledStrypes = styled(Stripes);
const StlyedLogo = styled(Logo);

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900 px-8 py-10"
      imageStyle={{
        position: "absolute",
        left: "-100%",
      }}
    >
      <StatusBar style="light" translucent />
      <StyledStrypes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <StlyedLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} className="rounded-full bg-green-500 px-5 py-2">
              <Text className="font-alt text-sm uppercase text-black"> Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200"> 🚀 Lets do our best with what we had</Text>
    </ImageBackground>
  );
}
