import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "@src/components/Button";
import ConfirmBuyModal from "@src/components/ConfirmBuyItemModal";
import ShopCategory from "@src/components/ShopCategory";
import { useShopItem } from "@src/hooks/useShopItem";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Shop = () => {
  const puzzle = 10;
  const { items, categories, getItemsByCategory } = useShopItem();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectItem, setSelectItem] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const filteredItems = getItemsByCategory(selectedCategory);

  const openCategory = () => {
    setCategoryOpen(true);
  };

  const handleSelectItem = (item) => {
    setSelectItem(item);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ width: 307, backgroundColor: "#B1E2FF" }}>
        <SafeAreaView>
          {selectItem ? (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Image
                source={selectItem.image}
                style={{ width: 155, height: 202, marginBottom: 10 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 30,
                  marginBottom: 5,
                  textAlign: "center",
                }}
              >
                {selectItem.name}
              </Text>
              <View style={{ marginTop: 10 }}>
                <Button
                  color={"FEEAF4"}
                  h={30}
                  w={100}
                  title={selectItem.price}
                  textStyle={{ marginRight: "10" }}
                  onPress={() => setOpenConfirmModal(true)}
                />
                <View style={{ position: "absolute", right: 25, bottom: 8 }}>
                  <Ionicons name="extension-puzzle" size={15} color="#FB8CAC" />
                </View>
              </View>
              <ConfirmBuyModal visible={openConfirmModal} />
            </View>
          ) : (
            <View></View>
          )}
        </SafeAreaView>
      </View>

      <ScrollView
        style={{ width: 624, backgroundColor: "#FEE3F4", paddingTop: 10 }}
      >
        <View style={{ position: "absolute", left: 50, zIndex: 1 }}>
          <Ionicons name="extension-puzzle" size={35} color="#FB8CAC" />
        </View>
        <View
          style={{
            height: 33,
            width: 118,
            backgroundColor: "white",
            borderRadius: 10,
            marginLeft: 60,
            marginTop: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>{puzzle}</Text>
        </View>
        <FlatList
          numColumns={4}
          data={filteredItems}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => handleSelectItem(item)}>
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 100,
                    backgroundColor: "white",
                    marginHorizontal: 30,
                    marginVertical: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image source={item.image} resizeMode="contain" />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{item.price}</Text>
                  <Ionicons name="extension-puzzle" size={20} color="#FB8CAC" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <View
        style={{
          width: 624,
          height: 67,
          backgroundColor: "#E9D8FF",
          position: "absolute",
          bottom: 0,
          left: 307,
        }}
      >
        <View
          style={{ position: "absolute", bottom: -15, right: -50, width: 600 }}
        >
          <ShopCategory
            isOpen={categoryOpen}
            onToggle={openCategory}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onClose={() => setCategoryOpen(false)}
          />
        </View>
      </View>
    </View>
  );
};

export default Shop;
