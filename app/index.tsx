import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  InteractionManager,
  Platform,
} from "react-native";
import BlurBox from "@src/components/BlurBox";
import { AntDesign } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import RegisterModal from "@src/components/RegisterModal";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";

import { supabase } from "@lib/supabase";
import LoginModal from "@src/components/LoginModal";

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const [registerVisible, setRegisterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const redirectTo = makeRedirectUri();
  console.log("redirectTo:", redirectTo);

  const createSessionFromUrl = async (url: string | null) => {
    if (!url) return;
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode as string);

    const { access_token, refresh_token } = params as any;
    if (access_token) {
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (!error) {
        router.replace("/welcome");
      } else {
        console.error(error);
      }
    }
  };

  const url = Linking.useURL();
  useEffect(() => {
    if (url) createSessionFromUrl(url);
  }, [url]);

  const handleGoogleLogin = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) {
      console.error(error);
      return;
    }
    if (data?.url) {
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo,
        { preferEphemeralSession: false }
      );
      if (result.type === "success") {
        await createSessionFromUrl(result.url);
      }
    }
  }, []);

  const handleRegisterPress = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => {
      setRegisterVisible(true);
    }, 100);
  }, []);

  const handleLoginPress = useCallback(() => {
    setRegisterVisible(false);
    setTimeout(() => {
      setModalVisible(true);
    }, 100);
  }, []);

  const handleForgotPassword = useCallback(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 100);
    router.push("/forgotPassword");
  }, []);

  const handleLogin = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Alert.alert("Đăng nhập thành công", "Chào mừng quay lại!", [
      //   {
      //     text: "OK",
      //     onPress: () => router.push("/welcome"),
      //   },
      // ]);
      InteractionManager.runAfterInteractions(() => {
        router.replace("/welcome");
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGoogleLogin}>
          <BlurBox
            h={43}
            w={259}
            title="Đăng nhập bằng Google"
            image={require("../assets/images/google-icon.png")}
            imageSize={24}
            textSize={16}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <BlurBox h={43} w={259} title="Chơi ngay" textSize={16} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <AntDesign name="copyright" size={20} color="black" />
        <Text>2025. Memora Corp. All Rights Reserved</Text>
      </View>
      <LoginModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onRegisterPress={handleRegisterPress}
        onForgotPasswordPress={handleForgotPassword}
      />
      <RegisterModal
        visible={registerVisible}
        onClose={() => setRegisterVisible(false)}
        onLoginPress={handleLoginPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 320,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
