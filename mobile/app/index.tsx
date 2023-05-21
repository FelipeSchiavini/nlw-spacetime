import {  Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
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
  const router = useRouter();

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

    router.push('/memories');
  };

  useEffect(() => {
    if (response?.type === "success") { 
      const { code } = response.params;
      handleGithubOAuthCode(code);
    }
  }, [response]);



  return (
    <View
      className="relative flex-1 px-8 py-10"

    >
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

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        {" "}
        🚀 Lets do our best with what we had
      </Text>
    </View>
  );
}
