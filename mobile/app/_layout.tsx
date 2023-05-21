import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { styled } from "nativewind";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { SplashScreen, Stack, useRouter } from "expo-router";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import Logo from "../src/assets/logo.svg";

import { api } from "../src/lib/axios";

const StyledStrypes = styled(Stripes);
const StlyedLogo = styled(Logo);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/0b183199b64ad26eee11",
};

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)
  const router = useRouter();

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticated(!!token)
    })

  },[]);

  const [, response, signInWithGitHub] = useAuthRequest(
    {
      clientId: "0b183199b64ad26eee11",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "SpaceTimes",
      }),
    },
    discovery
  );

  const handleGithubOAuthCode = async (code: string) => {
    const response = await api.post("/register", {
      code,
    });

    const { token } = response.data;
    await SecureStore.setItemAsync("token", token);

    router.push('/memories');    <View className="flex-1 items-center justify-center gap-6">
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
    <TouchableOpacity
      activeOpacity={0.7}
      className="rounded-full bg-green-500 px-5 py-2"
      onPress={() => signInWithGitHub()}
    >
      <Text className="font-alt text-sm uppercase text-black">
        {" "}
        Cadastrar lembrança
      </Text>
    </TouchableOpacity>
  </View>
  };

  useEffect(() => {
    if (response?.type === "success") { 
      const { code } = response.params;
      handleGithubOAuthCode(code);
    }
  }, [response]);

  if (!hasLoadedFonts) {
    return <SplashScreen/>;
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{
        position: "absolute",
        left: "-100%",
      }}
    >
      <StatusBar style="light" translucent />
      <StyledStrypes className="absolute left-2" />
   
      {/* Conteudo da pagina pode ser usado */}
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'transparent'}
      }}>
        <Stack.Screen name='index' redirect={isUserAuthenticated}/>
        <Stack.Screen name='new'/>  
        <Stack.Screen name='memories'/>  
      </Stack>
    </ImageBackground>
  );
}
