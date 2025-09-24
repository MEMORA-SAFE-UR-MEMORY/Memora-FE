import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert } from "react-native";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import AlertModal from "./Alert";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginPress: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  visible,
  onClose,
  onLoginPress,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const showCustomAlert = (message: string) => {
    setAlertMessage(message);
  };

  // Hàm gọi API register
  const handleRegister = async () => {
    setLoading(true);
    console.log(username, password);
    const apiUrl = `https://memora.somee.com/api/User/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Đọc response text để debug

      // Kiểm tra response
      if (response.ok) {
        const data = await response.json();
        showCustomAlert("Đăng ký tài khoản thành công!");
      } else {
        let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Nếu không parse được JSON thì dùng message mặc định
        }

        showCustomAlert(errorMessage);
      }
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert(
        "Lỗi",
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderAlert = () => {
    if (!showAlert) return null;

    return (
      <AlertModal
        title={"Điền đầy đủ thông tin"}
        onClose={() => setShowAlert(false)}
      />
      // <BlurView intensity={20} style={StyleSheet.absoluteFill}>
      //   <View style={styles.alertContainer}>
      //     <Text style={styles.alertTitle}>Điền đầy đủ thông tin</Text>
      //     <TouchableOpacity
      //       style={styles.alertButton}
      //       onPress={() => setShowAlert(false)}
      //     >
      //       <Text style={styles.alertButtonText}>OK</Text>
      //     </TouchableOpacity>
      //   </View>
      // </BlurView>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
          supportedOrientations={["portrait", "landscape"]}
        >
          {alertMessage && (
            <AlertModal
              title={alertMessage}
              onClose={() => {
                // Nếu đăng ký thành công thì chuyển trang
                if (alertMessage.includes("thành công")) {
                  router.replace("/");
                }
                setAlertMessage(null);
              }}
            />
          )}

          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Tạo tài khoản mới!</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Nhập username của bạn"
                    keyboardType="email-address"
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mật khẩu</Text>
                  <View>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Nhập mật khẩu của bạn"
                      secureTextEntry={!showPassword}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Xác nhận mật khẩu</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Nhập lại mật khẩu của bạn"
                    secureTextEntry={!showConfirmPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIconConfirm}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onLoginPress}>
                  <Text style={styles.linkText}>
                    Đã có tài khoản? Đăng nhập
                  </Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <Button
                    h={44}
                    w={493}
                    title={loading ? "Chờ xử lí" : "Đăng ký"}
                    color="A6E3FF"
                    onPress={handleRegister}
                    disabled={false}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            {renderAlert()}
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    width: 557,
    height: 368,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 32,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    height: 46,
    width: 493,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  eyeIconConfirm: {
    position: "absolute",
    right: 20,
    top: 36,
  },
  linkText: {
    textDecorationLine: "underline",
    marginTop: 10,
    marginLeft: 300,
  },
  buttonContainer: {
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 8,
    zIndex: 1,
  },
  alertContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -75 }],
    width: 300,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: "#A6E3FF",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  alertButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RegisterModal;
