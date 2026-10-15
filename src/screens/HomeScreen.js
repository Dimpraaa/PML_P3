import { useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { KATEGORI_LIST, KOPI_LIST } from "../constants/coffeeData";

export default function HomeScreen({ navigation }) {
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  const filteredKopi =
    selectedKategori === "Semua"
      ? KOPI_LIST
      : KOPI_LIST.filter((item) => item.kategori === selectedKategori);

  const formatRupiah = (val) => {
    return "Rp " + Number(val).toLocaleString("id-ID");
  };

  const renderKopiItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Detail", {
          id: item.id,
          nama: item.nama,
          harga: item.harga,
          kategori: item.kategori,
          deskripsi: item.deskripsi,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.badgeKategori}>
          <Text style={styles.badgeKategoriText}>{item.kategori}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.namaKopi}>{item.nama}</Text>
        <Text style={styles.deskripsiKopi} numberOfLines={2}>
          {item.deskripsi}
        </Text>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.labelHarga}>Harga</Text>
            <Text style={styles.hargaKopi}>{formatRupiah(item.harga)}</Text>
          </View>
          <View style={styles.btnDetail}>
            <Text style={styles.btnDetailText}>Lihat Detail</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />

      {/* Hero / Header Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroGreeting}>CAFE & ROASTERY</Text>
        <Text style={styles.heroTitle}>Kala Kopi</Text>
        <Text style={styles.heroSubtitle}>
          Selamat Datang. Mau ngopi apa hari ini?
        </Text>
      </View>

      {/* Filter Kategori */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={KATEGORI_LIST}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isSelected = selectedKategori === item;
            return (
              <TouchableOpacity
                style={[styles.chip, isSelected && styles.chipActive]}
                onPress={() => setSelectedKategori(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.chipText, isSelected && styles.chipTextActive]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* List Kopi */}
      <FlatList
        data={filteredKopi}
        keyExtractor={(item) => item.id}
        renderItem={renderKopiItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F2",
  },
  heroSection: {
    backgroundColor: "#2C1810",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroGreeting: {
    fontSize: 12,
    color: "#D7CCC8",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#BCAAA4",
    marginTop: 6,
    lineHeight: 18,
  },
  filterSection: {
    marginTop: 14,
    marginBottom: 6,
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#EFEBE9",
    borderWidth: 1,
    borderColor: "#D7CCC8",
  },
  chipActive: {
    backgroundColor: "#4E342E",
    borderColor: "#2C1810",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4E342E",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#2C1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EDE7E1",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
    backgroundColor: "#EFEBE9",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  badgeKategori: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(44, 24, 16, 0.82)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeKategoriText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  cardContent: {
    padding: 16,
  },
  namaKopi: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C1810",
    marginBottom: 4,
  },
  deskripsiKopi: {
    fontSize: 13,
    color: "#6D4C41",
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F5EBE0",
    paddingTop: 12,
  },
  labelHarga: {
    fontSize: 11,
    color: "#8D6E63",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  hargaKopi: {
    fontSize: 17,
    fontWeight: "700",
    color: "#A04000",
    marginTop: 1,
  },
  btnDetail: {
    backgroundColor: "#4E342E",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },
  btnDetailText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
