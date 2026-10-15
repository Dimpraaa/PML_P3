import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const METODE_PEMBAYARAN = [
  { id: "cash", label: "Tunai", keterangan: "Bayar di kasir" },
  { id: "qris", label: "QRIS", keterangan: "Scan kode QRIS" },
  { id: "debit", label: "Kartu Debit", keterangan: "Visa / Mastercard" },
  { id: "ewallet", label: "E-Wallet", keterangan: "GoPay / OVO / Dana" },
];

export default function CheckoutScreen({ route, navigation }) {
  // Ambil data via route.params
  const { nama = "Kopi Pilihan", harga = 0, jumlah = 1 } = route.params || {};

  // Hitung total pembayaran = harga * jumlah
  const totalPembayaran = harga * jumlah;

  // Terapkan useState 'isSubmitted' (default: false)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transactionCode, setTransactionCode] = useState("");
  const [selectedMetode, setSelectedMetode] = useState(null);

  const handleKonfirmasi = () => {
    if (!selectedMetode) return;
    setTransactionCode(`#KL-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSubmitted(true);
  };

  const formatRupiah = (val) => {
    return "Rp " + Number(val).toLocaleString("id-ID");
  };

  const metodeLabel =
    METODE_PEMBAYARAN.find((m) => m.id === selectedMetode)?.label || "-";

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Status */}
        <View style={styles.headerCard}>
          <Text style={styles.headerCategory}>KALA KOPI & ROASTERY</Text>
          <Text style={styles.headerTitle}>
            {isSubmitted ? "Konfirmasi Pesanan" : "Ringkasan Pesanan"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isSubmitted
              ? "Terima kasih, pesanan Anda siap diproses."
              : "Periksa kembali detail pesanan Anda sebelum melakukan konfirmasi."}
          </Text>
        </View>

        {/* Feedback Visual ketika isSubmitted === true */}
        {isSubmitted && (
          <View style={styles.successBanner}>
            <View style={styles.badgeSuccess}>
              <Text style={styles.badgeSuccessText}>BERHASIL</Text>
            </View>
            <Text style={styles.successTitle}>Pesanan Berhasil!</Text>
            <Text style={styles.successDesc}>
              Pesanan anda sedang disiapkan.
            </Text>
          </View>
        )}

        {/* Kartu Rincian Pesanan */}
        <View style={styles.cardRincian}>
          <Text style={styles.cardTitle}>Rincian Pembayaran</Text>

          <View style={styles.rowItem}>
            <Text style={styles.itemLabel}>Menu Kopi</Text>
            <Text style={styles.itemValueBold}>{nama}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.itemLabel}>Harga Satuan</Text>
            <Text style={styles.itemValue}>{formatRupiah(harga)}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.itemLabel}>Jumlah Pesanan</Text>
            <Text style={styles.itemValue}>{jumlah} cup</Text>
          </View>

          {isSubmitted && (
            <View style={styles.rowItem}>
              <Text style={styles.itemLabel}>Metode Pembayaran</Text>
              <Text style={styles.itemValueBold}>{metodeLabel}</Text>
            </View>
          )}

          <View style={styles.separator} />

          <View style={styles.rowItemTotal}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>
              {formatRupiah(totalPembayaran)}
            </Text>
          </View>

          {isSubmitted && (
            <View style={styles.infoAntrean}>
              <View style={styles.badgeAntrean}>
                <Text style={styles.labelAntrean}>Kode Transaksi</Text>
                <Text style={styles.valAntrean}>
                  {transactionCode || "#KL-8080"}
                </Text>
              </View>
              <View style={styles.badgeAntrean}>
                <Text style={styles.labelAntrean}>Status</Text>
                <Text style={styles.statusDiproses}>Sedang Disiapkan</Text>
              </View>
            </View>
          )}
        </View>

        {/* Pemilihan Metode Pembayaran */}
        {!isSubmitted && (
          <View style={styles.cardMetode}>
            <Text style={styles.cardTitle}>Metode Pembayaran</Text>
            <View style={styles.metodeGrid}>
              {METODE_PEMBAYARAN.map((metode) => {
                const isActive = selectedMetode === metode.id;
                return (
                  <TouchableOpacity
                    key={metode.id}
                    style={[styles.metodeItem, isActive && styles.metodeItemActive]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedMetode(metode.id)}
                  >
                    <Text
                      style={[
                        styles.metodeLabel,
                        isActive && styles.metodeLabelActive,
                      ]}
                    >
                      {metode.label}
                    </Text>
                    <Text
                      style={[
                        styles.metodeKeterangan,
                        isActive && styles.metodeKeteranganActive,
                      ]}
                    >
                      {metode.keterangan}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {!selectedMetode && (
              <Text style={styles.warningMetode}>
                Pilih metode pembayaran untuk melanjutkan.
              </Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {!isSubmitted ? (
            // Tombol Konfirmasi Pesanan (mengubah isSubmitted menjadi true)
            <TouchableOpacity
              style={[
                styles.btnKonfirmasi,
                !selectedMetode && styles.btnKonfirmasiDisabled,
              ]}
              activeOpacity={selectedMetode ? 0.8 : 1}
              onPress={handleKonfirmasi}
              disabled={!selectedMetode}
            >
              <Text style={styles.btnKonfirmasiText}>Konfirmasi Pesanan</Text>
            </TouchableOpacity>
          ) : (
            // Pesan Informasi setelah submit
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>
                Silakan menuju meja kasir / pickup counter Kala Kopi untuk
                mengambil pesanan Anda.
              </Text>
            </View>
          )}

          {/* Tombol Kembali ke Home */}
          <TouchableOpacity
            style={[styles.btnHome, isSubmitted && styles.btnHomeSuccess]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={[
                styles.btnHomeText,
                isSubmitted && styles.btnHomeSuccessText,
              ]}
            >
              Kembali ke Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F2",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    backgroundColor: "#2C1810",
    borderRadius: 16,
    padding: 22,
    marginBottom: 16,
  },
  headerCategory: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D7CCC8",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#D7CCC8",
    marginTop: 6,
    lineHeight: 18,
  },
  successBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    alignItems: "center",
  },
  badgeSuccess: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeSuccessText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 4,
  },
  successDesc: {
    fontSize: 13,
    color: "#2E7D32",
    textAlign: "center",
  },
  cardRincian: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#2C1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EDE7E1",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C1810",
    marginBottom: 14,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 14,
    color: "#6D4C41",
  },
  itemValue: {
    fontSize: 14,
    color: "#2C1810",
    fontWeight: "500",
  },
  itemValueBold: {
    fontSize: 14,
    color: "#2C1810",
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0ECE9",
    marginVertical: 12,
  },
  rowItemTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2C1810",
  },
  totalValue: {
    fontSize: 19,
    fontWeight: "700",
    color: "#A04000",
  },
  infoAntrean: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F5EBE0",
  },
  badgeAntrean: {
    backgroundColor: "#F5EBE0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    flex: 0.48,
  },
  labelAntrean: {
    fontSize: 10,
    color: "#8D6E63",
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 2,
  },
  valAntrean: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2C1810",
  },
  statusDiproses: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A04000",
  },
  // --- Metode Pembayaran ---
  cardMetode: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#2C1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EDE7E1",
  },
  metodeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metodeItem: {
    width: "47%",
    borderWidth: 1.5,
    borderColor: "#D7CCC8",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAF8",
  },
  metodeItemActive: {
    borderColor: "#4E342E",
    backgroundColor: "#F5EBE0",
  },
  metodeLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4E342E",
    marginBottom: 2,
  },
  metodeLabelActive: {
    color: "#2C1810",
  },
  metodeKeterangan: {
    fontSize: 11,
    color: "#8D6E63",
  },
  metodeKeteranganActive: {
    color: "#6D4C41",
  },
  warningMetode: {
    marginTop: 12,
    fontSize: 12,
    color: "#B25000",
    textAlign: "center",
    fontWeight: "500",
  },
  // --- Action Buttons ---
  actionContainer: {
    gap: 12,
  },
  btnKonfirmasi: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  btnKonfirmasiDisabled: {
    backgroundColor: "#BCAAA4",
    shadowOpacity: 0,
    elevation: 0,
  },
  btnKonfirmasiText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  noteBox: {
    backgroundColor: "#FFF8E1",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FFE082",
    alignItems: "center",
  },
  noteText: {
    color: "#7F5F00",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  btnHome: {
    backgroundColor: "#EFEBE9",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7CCC8",
  },
  btnHomeSuccess: {
    backgroundColor: "#4E342E",
    borderColor: "#2C1810",
  },
  btnHomeText: {
    color: "#4E342E",
    fontSize: 14,
    fontWeight: "600",
  },
  btnHomeSuccessText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
