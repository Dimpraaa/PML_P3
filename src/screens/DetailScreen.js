import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KOPI_LIST } from '../constants/coffeeData';

export default function DetailScreen({ route, navigation }) {
  // Ambil parameter dari route.params
  const {
    id,
    nama = 'Kopi Pilihan',
    harga = 25000,
    kategori = 'Kopi',
    deskripsi = 'Kopi nikmat berkualitas tinggi diseduh oleh barista berpengalaman.',
  } = route.params || {};

  // Cari gambar berdasarkan ID atau default ke item pertama
  const matchedItem = KOPI_LIST.find((item) => item.id === id);
  const coffeeImage = matchedItem ? matchedItem.image : KOPI_LIST[0].image;

  // Terapkan useState 'jumlah' dengan nilai awal 1
  const [jumlah, setJumlah] = useState(1);

  const kurangiJumlah = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  const tambahJumlah = () => {
    setJumlah(jumlah + 1);
  };

  const formatRupiah = (val) => {
    return 'Rp ' + Number(val).toLocaleString('id-ID');
  };

  const subtotal = harga * jumlah;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Foto Produk */}
        <View style={styles.heroImageWrapper}>
          <Image source={coffeeImage} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.badgeCategory}>
            <Text style={styles.badgeCategoryText}>{kategori}</Text>
          </View>
        </View>

        {/* Informasi Produk */}
        <View style={styles.infoCard}>
          <Text style={styles.namaKopi}>{nama}</Text>
          <Text style={styles.hargaSatuan}>{formatRupiah(harga)} / cup</Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Deskripsi Menu</Text>
          <Text style={styles.deskripsiText}>{deskripsi}</Text>

          <View style={styles.separator} />

          {/* Pengatur Jumlah Pesanan */}
          <Text style={styles.sectionTitle}>Jumlah Pesanan</Text>
          <View style={styles.counterRow}>
            <View style={styles.counterControl}>
              {/* Tombol [-] */}
              <TouchableOpacity
                style={[styles.btnCounter, jumlah <= 1 && styles.btnCounterDisabled]}
                onPress={kurangiJumlah}
                activeOpacity={0.7}
                disabled={jumlah <= 1}
              >
                <Text style={styles.btnCounterText}>-</Text>
              </TouchableOpacity>

              {/* Tampilan Jumlah */}
              <View style={styles.jumlahContainer}>
                <Text style={styles.jumlahText}>{jumlah}</Text>
              </View>

              {/* Tombol [+] */}
              <TouchableOpacity
                style={styles.btnCounter}
                onPress={tambahJumlah}
                activeOpacity={0.7}
              >
                <Text style={styles.btnCounterText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.subtotalBox}>
              <Text style={styles.labelSubtotal}>Subtotal</Text>
              <Text style={styles.valSubtotal}>{formatRupiah(subtotal)}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {/* Tombol Lanjut ke Checkout */}
          <TouchableOpacity
            style={styles.btnCheckout}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Checkout', {
                nama,
                harga,
                jumlah,
              })
            }
          >
            <Text style={styles.btnCheckoutText}>Lanjut ke Checkout</Text>
          </TouchableOpacity>

          {/* Tombol Kembali */}
          <TouchableOpacity
            style={styles.btnKembali}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnKembaliText}>Kembali ke Menu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F2',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  heroImageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#EFEBE9',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  badgeCategory: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(44, 24, 16, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeCategoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDE7E1',
  },
  namaKopi: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C1810',
    marginBottom: 6,
  },
  hargaSatuan: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A04000',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0ECE9',
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4E342E',
    marginBottom: 8,
  },
  deskripsiText: {
    fontSize: 14,
    color: '#6D4C41',
    lineHeight: 20,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  counterControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EBE0',
    borderRadius: 10,
    padding: 4,
  },
  btnCounter: {
    width: 38,
    height: 38,
    backgroundColor: '#4E342E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCounterDisabled: {
    backgroundColor: '#D7CCC8',
  },
  btnCounterText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  jumlahContainer: {
    paddingHorizontal: 16,
    minWidth: 42,
    alignItems: 'center',
  },
  jumlahText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  subtotalBox: {
    alignItems: 'flex-end',
  },
  labelSubtotal: {
    fontSize: 11,
    color: '#8D6E63',
    textTransform: 'uppercase',
  },
  valSubtotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  actionContainer: {
    gap: 10,
  },
  btnCheckout: {
    backgroundColor: '#4E342E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  btnCheckoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  btnKembali: {
    backgroundColor: '#EFEBE9',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7CCC8',
  },
  btnKembaliText: {
    color: '#4E342E',
    fontSize: 14,
    fontWeight: '600',
  },
});
