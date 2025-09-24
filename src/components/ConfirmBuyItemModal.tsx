import { Modal, Text, View } from "react-native";

const ConfirmBuyModal = ({ visible }: any) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      <View style={{ width: 100, height: 100 }}>
        <Text>abc</Text>
      </View>
    </Modal>
  );
};

export default ConfirmBuyModal;
