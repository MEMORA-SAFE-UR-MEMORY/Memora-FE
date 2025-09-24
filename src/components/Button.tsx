import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  w: number;
  h: number;
  title: string;
  color: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  w,
  h,
  title,
  color,
  onPress,
  disabled = false,
  loading = false,
  textStyle,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          width: w,
          height: h,
          backgroundColor: `#${color}`,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
        {loading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#666",
  },
});

export default Button;
