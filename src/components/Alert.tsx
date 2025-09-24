import { BlurView } from "expo-blur";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AlertModal = ({ title, onClose }: any) => {
  return (
    <BlurView intensity={20} style={StyleSheet.absoluteFill}>
      <View style={styles.alertContainer}>
        <Text style={styles.alertTitle}>{title}</Text>
        <TouchableOpacity style={styles.alertButton} onPress={onClose}>
          <Text style={styles.alertButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  // ...existing styles...
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

export default AlertModal;
