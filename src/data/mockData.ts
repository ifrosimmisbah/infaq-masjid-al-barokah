export interface Donatur {
  id: string;
  nama: string;
  tipe: "Perorangan" | "Lembaga" | "Hamba Allah";
  noHp: string;
  email: string;
  totalDonasi: number;
  frekuensi: number;
  terakhirDonasi: string;
  status: "Aktif" | "Non-Aktif";
}

export interface TransaksiPenerimaan {
  id: string;
  kodeTransaksi: string;
  tanggal: string;
  namaDonatur: string;
  kategori: "Infaq Subuh" | "Infaq Jumat" | "Kotak Amal Masjid" | "Infaq Pembangunan" | "Infaq Yatim & Dhuafa" | "Infaq Operasional";
  metodePembayaran: "QRIS" | "Transfer Bank" | "Tunai";
  jumlah: number;
  keterangan: string;
  petugasAmil: string;
  status: "Terkonfirmasi" | "Pending";
}

export interface TransaksiPenyaluran {
  id: string;
  kodePenyaluran: string;
  tanggal: string;
  program: "Santunan Yatim & Dhuafa" | "Renovasi Kubah & Tempat Wudhu" | "Kajian & Operasional Dakwah" | "Bantuan Kesehatan Umat" | "Honor Pengajar Al-Qur'an";
  penerimaManfaat: string;
  jumlahMustahik: number;
  alokasiDana: number;
  penanggungJawab: string;
  buktiDokumentasi: string;
  status: "Selesai" | "Dalam Proses";
}

export interface Pengguna {
  id: string;
  nama: string;
  email: string;
  role: "Ketua DKM" | "Bendahara Utama" | "Amil Penerimaan" | "Amil Penyaluran";
  noHp: string;
  terakhirMasuk: string;
  status: "Aktif" | "Nonaktif";
}

export interface Notifikasi {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  tipe: "penerimaan" | "penyaluran" | "sistem";
  dibaca: boolean;
}

export const MOCK_DONATUR: Donatur[] = [
  {
    id: "DON-001",
    nama: "H. Bambang Sugianto",
    tipe: "Perorangan",
    noHp: "0812-3456-7890",
    email: "bambang.sugianto@example.com",
    totalDonasi: 15500000,
    frekuensi: 14,
    terakhirDonasi: "2026-10-12",
    status: "Aktif",
  },
  {
    id: "DON-002",
    nama: "PT Berkah Mandiri Abadi",
    tipe: "Lembaga",
    noHp: "0821-9876-5432",
    email: "csr@berkahmandiri.co.id",
    totalDonasi: 45000000,
    frekuensi: 6,
    terakhirDonasi: "2026-10-10",
    status: "Aktif",
  },
  {
    id: "DON-003",
    nama: "Hamba Allah (Anonim)",
    tipe: "Hamba Allah",
    noHp: "-",
    email: "-",
    totalDonasi: 8750000,
    frekuensi: 9,
    terakhirDonasi: "2026-10-13",
    status: "Aktif",
  },
  {
    id: "DON-004",
    nama: "dr. Hj. Siti Fatimah, Sp.A",
    tipe: "Perorangan",
    noHp: "0813-7788-9900",
    email: "siti.fatimah@example.com",
    totalDonasi: 12200000,
    frekuensi: 11,
    terakhirDonasi: "2026-10-08",
    status: "Aktif",
  },
  {
    id: "DON-005",
    nama: "Keluarga Besar Alm. H. Ridwan",
    tipe: "Lembaga",
    noHp: "0856-1122-3344",
    email: "kel.ridwan@example.com",
    totalDonasi: 25000000,
    frekuensi: 4,
    terakhirDonasi: "2026-09-28",
    status: "Aktif",
  },
  {
    id: "DON-006",
    nama: "Ahmad Fauzan Nugraha",
    tipe: "Perorangan",
    noHp: "0878-5544-3322",
    email: "ahmad.fauzan@example.com",
    totalDonasi: 3400000,
    frekuensi: 7,
    terakhirDonasi: "2026-10-05",
    status: "Aktif",
  },
  {
    id: "DON-007",
    nama: "Majelis Taklim Khadijah",
    tipe: "Lembaga",
    noHp: "0819-3322-1100",
    email: "mt.khadijah@example.com",
    totalDonasi: 18600000,
    frekuensi: 8,
    terakhirDonasi: "2026-10-01",
    status: "Aktif",
  },
];

export const MOCK_PENERIMAAN: TransaksiPenerimaan[] = [
  {
    id: "RCV-2026-1001",
    kodeTransaksi: "INF-IN-20261014-001",
    tanggal: "2026-10-14 05:45",
    namaDonatur: "Hamba Allah (Anonim)",
    kategori: "Infaq Subuh",
    metodePembayaran: "QRIS",
    jumlah: 250000,
    keterangan: "Infaq subuh berkah berjamaah",
    petugasAmil: "Ustadz H. Ahmad Dahlan",
    status: "Terkonfirmasi",
  },
  {
    id: "RCV-2026-1002",
    kodeTransaksi: "INF-IN-20261013-004",
    tanggal: "2026-10-13 14:20",
    namaDonatur: "H. Bambang Sugianto",
    kategori: "Infaq Pembangunan",
    metodePembayaran: "Transfer Bank",
    jumlah: 5000000,
    keterangan: "Dukungan penyelesaian ruang wudhu wanita",
    petugasAmil: "Rahmat Hidayat, S.E.",
    status: "Terkonfirmasi",
  },
  {
    id: "RCV-2026-1003",
    kodeTransaksi: "INF-IN-20261012-002",
    tanggal: "2026-10-12 19:15",
    namaDonatur: "dr. Hj. Siti Fatimah, Sp.A",
    kategori: "Infaq Yatim & Dhuafa",
    metodePembayaran: "Transfer Bank",
    jumlah: 2500000,
    keterangan: "Santunan santri yatim penghafal Qur'an",
    petugasAmil: "Rahmat Hidayat, S.E.",
    status: "Terkonfirmasi",
  },
  {
    id: "RCV-2026-1004",
    kodeTransaksi: "INF-IN-20261011-008",
    tanggal: "2026-10-11 12:30",
    namaDonatur: "Kotak Amal Utama Masjid",
    kategori: "Kotak Amal Masjid",
    metodePembayaran: "Tunai",
    jumlah: 4850000,
    keterangan: "Perhitungan kotak infaq salat Jumat pekan ke-2",
    petugasAmil: "Ustadz H. Ahmad Dahlan",
    status: "Terkonfirmasi",
  },
  {
    id: "RCV-2026-1005",
    kodeTransaksi: "INF-IN-20261010-001",
    tanggal: "2026-10-10 10:00",
    namaDonatur: "PT Berkah Mandiri Abadi",
    kategori: "Infaq Yatim & Dhuafa",
    metodePembayaran: "Transfer Bank",
    jumlah: 15000000,
    keterangan: "Program CSR Berkah Pendidikan Santri",
    petugasAmil: "Rahmat Hidayat, S.E.",
    status: "Terkonfirmasi",
  },
  {
    id: "RCV-2026-1006",
    kodeTransaksi: "INF-IN-20261008-003",
    tanggal: "2026-10-08 16:45",
    namaDonatur: "Ahmad Fauzan Nugraha",
    kategori: "Infaq Subuh",
    metodePembayaran: "QRIS",
    jumlah: 500000,
    keterangan: "Sedekah subuh istiqomah",
    petugasAmil: "Ustadz H. Ahmad Dahlan",
    status: "Terkonfirmasi",
  },
  {
    id: "RCV-2026-1007",
    kodeTransaksi: "INF-IN-20261005-002",
    tanggal: "2026-10-05 09:30",
    namaDonatur: "Majelis Taklim Khadijah",
    kategori: "Infaq Operasional",
    metodePembayaran: "Tunai",
    jumlah: 3200000,
    keterangan: "Pengumpulan infaq bulanan pengajian",
    petugasAmil: "Ustadz H. Ahmad Dahlan",
    status: "Terkonfirmasi",
  },
];

export const MOCK_PENYALURAN: TransaksiPenyaluran[] = [
  {
    id: "DIS-2026-1001",
    kodePenyaluran: "INF-OUT-20261013-001",
    tanggal: "2026-10-13",
    program: "Santunan Yatim & Dhuafa",
    penerimaManfaat: "45 Anak Yatim & Piatu Binaan Al Barokah",
    jumlahMustahik: 45,
    alokasiDana: 9000000,
    penanggungJawab: "Ustadz H. Ahmad Dahlan",
    buktiDokumentasi: "Kwitansi & Foto Penyerahan Tahap 1",
    status: "Selesai",
  },
  {
    id: "DIS-2026-1002",
    kodePenyaluran: "INF-OUT-20261011-002",
    tanggal: "2026-10-11",
    program: "Renovasi Kubah & Tempat Wudhu",
    penerimaManfaat: "Jamaah Masjid & Warga Sekitar",
    jumlahMustahik: 350,
    alokasiDana: 6500000,
    penanggungJawab: "Ir. Fauzi Ramadhan",
    buktiDokumentasi: "Faktur Material Toko Bangunan Berkah",
    status: "Selesai",
  },
  {
    id: "DIS-2026-1003",
    kodePenyaluran: "INF-OUT-20261009-001",
    tanggal: "2026-10-09",
    program: "Bantuan Kesehatan Umat",
    penerimaManfaat: "Ibu Marwah (Operasi Katarak Lansia Dhuafa)",
    jumlahMustahik: 1,
    alokasiDana: 3200000,
    penanggungJawab: "Rahmat Hidayat, S.E.",
    buktiDokumentasi: "Surat Keterangan RSUD & Kwitansi Obat",
    status: "Selesai",
  },
  {
    id: "DIS-2026-1004",
    kodePenyaluran: "INF-OUT-20261005-003",
    tanggal: "2026-10-05",
    program: "Honor Pengajar Al-Qur'an",
    penerimaManfaat: "8 Guru TPQ Masjid Al Barokah",
    jumlahMustahik: 8,
    alokasiDana: 4800000,
    penanggungJawab: "Ustadz H. Ahmad Dahlan",
    buktiDokumentasi: "Tanda Terima Bisyarah Oktober 2026",
    status: "Selesai",
  },
  {
    id: "DIS-2026-1005",
    kodePenyaluran: "INF-OUT-20261002-001",
    tanggal: "2026-10-02",
    program: "Kajian & Operasional Dakwah",
    penerimaManfaat: "Jamaah Pengajian Ahad Pagi",
    jumlahMustahik: 120,
    alokasiDana: 1850000,
    penanggungJawab: "Ustadz H. Ahmad Dahlan",
    buktiDokumentasi: "Nota Konsumsi & Transport Penceramah",
    status: "Selesai",
  },
];

export const MOCK_PENGGUNA: Pengguna[] = [
  {
    id: "USR-001",
    nama: "Ustadz H. Ahmad Dahlan",
    email: "ahmad.dahlan@albarokah.id",
    role: "Ketua DKM",
    noHp: "0812-8899-1122",
    terakhirMasuk: "Hari ini, 10:15 WIB",
    status: "Aktif",
  },
  {
    id: "USR-002",
    nama: "Rahmat Hidayat, S.E.",
    email: "rahmat.bendahara@albarokah.id",
    role: "Bendahara Utama",
    noHp: "0813-2233-4455",
    terakhirMasuk: "Hari ini, 09:30 WIB",
    status: "Aktif",
  },
  {
    id: "USR-003",
    nama: "Faisal Amir, S.Kom.",
    email: "faisal.amil@albarokah.id",
    role: "Amil Penerimaan",
    noHp: "0857-6677-8899",
    terakhirMasuk: "Kemarin, 16:45 WIB",
    status: "Aktif",
  },
  {
    id: "USR-004",
    nama: "Nurul Aisyah, S.Pd.",
    email: "nurul.penyaluran@albarokah.id",
    role: "Amil Penyaluran",
    noHp: "0878-1122-9988",
    terakhirMasuk: "12 Okt 2026",
    status: "Aktif",
  },
];

export const MOCK_NOTIFIKASI: Notifikasi[] = [
  {
    id: "NOTIF-1",
    judul: "Infaq QRIS Baru Masuk",
    pesan: "Penerimaan Infaq Subuh Rp 250.000 dari Hamba Allah melalui QRIS.",
    waktu: "10 menit lalu",
    tipe: "penerimaan",
    dibaca: false,
  },
  {
    id: "NOTIF-2",
    judul: "Penyaluran Santunan Berhasil",
    pesan: "Penyaluran dana Rp 9.000.000 untuk 45 Anak Yatim telah diverifikasi.",
    waktu: "2 jam lalu",
    tipe: "penyaluran",
    dibaca: false,
  },
  {
    id: "NOTIF-3",
    judul: "Rekap Laporan Bulanan Tersedia",
    pesan: "Draft laporan pembukuan kas infaq per September 2026 siap dicetak.",
    waktu: "1 hari lalu",
    tipe: "sistem",
    dibaca: true,
  },
];

export const RINGKASAN_KAS = {
  totalPenerimaan: 128450000,
  totalPenyaluran: 76350000,
  saldoInfaq: 52100000,
  jumlahTransaksi: 184,
  persentasePenerimaanBulanLalu: "+14.8%",
  persentasePenyaluranBulanLalu: "+8.2%",
  donaturAktif: 87,
  mustahikTerbantu: 524,
};

export const GRAFIK_BULANAN = [
  { bulan: "Mei", penerimaan: 18500000, penyaluran: 12200000 },
  { bulan: "Jun", penerimaan: 22400000, penyaluran: 15100000 },
  { bulan: "Jul", penerimaan: 26800000, penyaluran: 19400000 },
  { bulan: "Agu", penerimaan: 19700000, penyaluran: 11800000 },
  { bulan: "Sep", penerimaan: 24200000, penyaluran: 13500000 },
  { bulan: "Okt (Berjalan)", penerimaan: 16850000, penyaluran: 14350000 },
];

export const DISTRIBUSI_KATEGORI = [
  { nama: "Infaq Pembangunan", persentase: 35, warna: "#065f46" },
  { nama: "Yatim & Dhuafa", persentase: 30, warna: "#047857" },
  { nama: "Kotak Amal Jumat", persentase: 18, warna: "#10b981" },
  { nama: "Infaq Subuh QRIS", persentase: 12, warna: "#d97706" },
  { nama: "Operasional Dakwah", persentase: 5, warna: "#f59e0b" },
];
