export type Role = "household" | "waste_bank" | "government";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  points: number;
}

export interface WasteTransaction {
  id: string;
  userId: string; // Household user ID
  wasteBankId: string; // Waste Bank user ID
  type: string;
  weight: number; // in Kg
  pointsEarned: number;
  date: string;
}

export interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  image: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  points_per_question: number;
  content?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  completedAt: string;
}

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alex Gustafo",
    email: "agustafo@warga.com",
    password: "123",
    role: "household",
    points: 50,
  },
  {
    id: "u2",
    name: "Bank Sampah Jaya Barokah",
    email: "admin@maju.com",
    password: "123",
    role: "waste_bank",
    points: 0,
  },
  {
    id: "u3",
    name: "Dinas Lingkungan Hidup",
    email: "admin@dlh.go.id",
    password: "123",
    role: "government",
    points: 0,
  },
];

export const MOCK_REWARDS: Reward[] = [
  {
    id: "r1",
    name: "Voucher Listrik 20k",
    pointsCost: 200,
    description: "Token listrik prabayar senilai Rp 20.000",
    image: "⚡",
  },
  {
    id: "r2",
    name: "Pulsa All Operator 10k",
    pointsCost: 100,
    description: "Pulsa reguler untuk semua operator",
    image: "📱",
  },
  {
    id: "r3",
    name: "Minyak Goreng 1L",
    pointsCost: 150,
    description: "Minyak goreng kemasan premium 1 liter",
    image: "🍳",
  },
  {
    id: "r4",
    name: "Uang Tunai Rp 50.000",
    pointsCost: 500,
    description: "Transfer ke dompet digital (GoPay/OVO)",
    image: "💵",
  },
];

export const MOCK_TRANSACTIONS: WasteTransaction[] = [
  {
    id: "t1",
    userId: "u1",
    wasteBankId: "u2",
    type: "Plastik",
    weight: 2.5,
    pointsEarned: 25,
    date: "2023-10-25",
  },
  {
    id: "t2",
    userId: "u1",
    wasteBankId: "u2",
    type: "Kertas",
    weight: 5,
    pointsEarned: 50,
    date: "2023-10-26",
  },
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: "q1",
    title: "Dasar Pengelolaan Sampah",
    description: "Pelajari konsep dasar pengelolaan sampah yang berkelanjutan",
    icon: "♻️",
    points_per_question: 5,
    content: `# Dasar Pengelolaan Sampah Berkelanjutan

## Pengenalan Sampah
Sampah adalah sisa dari kegiatan manusia yang sudah tidak digunakan lagi. Pengelolaan sampah yang baik adalah kunci untuk menjaga lingkungan kita tetap sehat dan berkelanjutan.

## Jenis-Jenis Sampah

### 1. Sampah Organik
Sampah organik adalah sampah yang berasal dari makhluk hidup dan dapat terurai secara alami. Contohnya:
- Sisa makanan (nasi, sayuran, buah-buahan)
- Daun dan ranting
- Kertas yang terbuat dari serat tumbuhan
- Kotoran hewan

Sampah organik biasanya membutuhkan waktu 2-6 minggu hingga beberapa bulan untuk terurai sepenuhnya.

### 2. Sampah Anorganik
Sampah anorganik adalah sampah buatan manusia yang sulit atau tidak dapat terurai secara alami. Contohnya:
- Plastik (200-300 tahun untuk terurai)
- Logam dan kaleng (50-200 tahun)
- Kaca (1 juta tahun atau lebih)
- Kain sintetis (40-200 tahun)

## Strategi 3R dalam Pengelolaan Sampah

### Reduce (Mengurangi)
Langkah pertama adalah mengurangi jumlah barang yang kita beli dan gunakan. Dengan mengurangi konsumsi, kita juga mengurangi jumlah sampah yang dihasilkan.

**Tips:**
- Pikirkan sebelum membeli barang yang tidak penting
- Gunakan tas belanja yang dapat digunakan kembali
- Hindari membeli produk dengan kemasan berlebihan

### Reuse (Menggunakan Kembali)
Sebelum membuang barang, pikirkan apakah masih bisa digunakan untuk keperluan lain.

**Contoh:**
- Gunakan botol plastik bekas untuk tempat air minum
- Ubah tas bekas menjadi tas tangan
- Gunakan sisa kain untuk lap atau pembersih

### Recycle (Mendaur Ulang)
Mendaur ulang adalah mengubah sampah menjadi produk baru yang bermanfaat.

**Manfaat Daur Ulang:**
- Mengurangi limbah ke tempat pembuangan akhir (TPA)
- Menghemat sumber daya alam
- Mengurangi emisi karbon (hanya perlu 5% energi untuk membuat kaleng baru dari kaleng bekas)
- Menciptakan lapangan kerja baru

## Dampak Penumpukan Sampah

Jika sampah tidak dikelola dengan baik, akan terjadi berbagai dampak negatif:
- **Polusi Udara:** Sampah yang membusuk menghasilkan gas metana dan H2S
- **Pencemaran Air:** Lindi (cairan dari sampah) mencemari air tanah
- **Penyakit:** Sampah menjadi sarang berbagai penyakit menular
- **Perubahan Iklim:** Gas metana merupakan gas rumah kaca yang memperkuat pemanasan global
- **Kerusakan Ekosistem:** Terutama limbah plastik yang berbahaya bagi kehidupan laut

## Bank Sampah

Bank sampah adalah lembaga yang mengumpulkan, memilah, dan mendaur ulang sampah. Peran bank sampah sangat penting dalam mengurangi volume sampah ke TPA dan memberikan nilai ekonomi kepada masyarakat.

## Komitmen Kita
Setiap orang memiliki peran penting dalam pengelolaan sampah. Mulai dari rumah, dengan memisahkan sampah organik dan anorganik, kita sudah berkontribusi untuk lingkungan yang lebih baik.`,
    questions: [
      {
        id: "q1-1",
        question: "Apa yang dimaksud dengan sampah organik?",
        options: [
          "Sampah yang berasal dari makhluk hidup yang dapat terurai secara alami",
          "Sampah yang berasal dari plastik dan logam",
          "Sampah yang berasal dari rumah sakit",
          "Sampah yang tidak dapat didaur ulang"
        ],
        correctAnswer: 0,
        explanation: "Sampah organik adalah sampah yang berasal dari makhluk hidup seperti sisa makanan, daun, ranting, dan sejenisnya yang dapat terurai secara alami oleh mikroorganisme."
      },
      {
        id: "q1-2",
        question: "Berapa lama waktu yang dibutuhkan plastik untuk terurai di alam?",
        options: [
          "5-10 tahun",
          "100-200 tahun",
          "Tidak dapat terurai",
          "50 tahun"
        ],
        correctAnswer: 2,
        explanation: "Plastik sangat sulit terurai di alam dan dapat membutuhkan waktu ratusan tahun atau bahkan tidak terurai sama sekali, menjadikannya salah satu sampah paling berbahaya."
      },
      {
        id: "q1-3",
        question: "Apa manfaat utama mendaur ulang sampah?",
        options: [
          "Mengurangi biaya pembuangan sampah saja",
          "Menghemat sumber daya alam dan mengurangi pencemaran lingkungan",
          "Membuat sampah hilang sepenuhnya",
          "Hanya untuk industri besar"
        ],
        correctAnswer: 1,
        explanation: "Mendaur ulang sampah membantu menghemat sumber daya alam yang terbatas, mengurangi emisi karbon, dan meminimalkan dampak pencemaran lingkungan."
      },
      {
        id: "q1-4",
        question: "Sampah anorganik adalah sampah yang berasal dari?",
        options: [
          "Makanan dan daun-daunan",
          "Bahan buatan manusia seperti plastik, logam, dan kaca",
          "Limbah pertanian",
          "Kotoran hewan"
        ],
        correctAnswer: 1,
        explanation: "Sampah anorganik adalah sampah buatan manusia yang sulit atau tidak dapat terurai secara alami, termasuk plastik, logam, kaca, dan kain sintetis."
      },
      {
        id: "q1-5",
        question: "Berapa persen dari sampah yang dapat didaur ulang?",
        options: [
          "Kurang dari 10%",
          "Sekitar 30-40%",
          "Sekitar 60-75%",
          "Semua sampah tidak dapat didaur ulang"
        ],
        correctAnswer: 2,
        explanation: "Penelitian menunjukkan bahwa 60-75% dari sampah yang kita hasilkan sebenarnya dapat didaur ulang atau dikelola dengan lebih baik."
      },
      {
        id: "q1-6",
        question: "Apa tujuan utama dari bank sampah?",
        options: [
          "Menyimpan sampah agar tidak tersebar",
          "Mengumpulkan, memilah, dan mendaur ulang sampah sambil memberikan nilai ekonomi",
          "Membakar semua sampah",
          "Mengekspor sampah ke luar negeri"
        ],
        correctAnswer: 1,
        explanation: "Bank sampah berfungsi mengumpulkan sampah dari masyarakat, memilahnya berdasarkan jenisnya, dan mendaur ulangnya untuk menciptakan nilai ekonomi bagi penggemar lingkungan."
      },
      {
        id: "q1-7",
        question: "Sampah apa yang paling berbahaya untuk ekosistem laut?",
        options: [
          "Kertas basah",
          "Plastik, terutama mikroplastik",
          "Makanan busuk",
          "Kayu lapuk"
        ],
        correctAnswer: 1,
        explanation: "Plastik, khususnya mikroplastik, sangat berbahaya untuk ekosistem laut karena dapat dimakan oleh ikan dan hewan laut lainnya, meracuni rantai makanan."
      },
      {
        id: "q1-8",
        question: "Berapa jumlah sampah plastik yang masuk ke laut setiap tahunnya?",
        options: [
          "Kurang dari 1 juta ton",
          "5-10 juta ton",
          "Ratusan juta ton",
          "Tidak ada data yang pasti"
        ],
        correctAnswer: 1,
        explanation: "Diperkirakan 5-10 juta ton sampah plastik masuk ke laut setiap tahunnya, menciptakan pulau sampah raksasa dan mengancam kehidupan laut."
      },
      {
        id: "q1-9",
        question: "Apa yang dimaksud dengan 3R dalam pengelolaan sampah?",
        options: [
          "Reduce, Reuse, Recycle - mengurangi, menggunakan kembali, dan mendaur ulang",
          "Reject, Refuse, Return",
          "Receive, Reorganize, Reset",
          "Reapply, Redo, Reflect"
        ],
        correctAnswer: 0,
        explanation: "3R adalah strategi pengelolaan sampah yang meliputi: Reduce (mengurangi konsumsi), Reuse (menggunakan kembali), dan Recycle (mendaur ulang)."
      },
      {
        id: "q1-10",
        question: "Apa dampak negatif utama dari penumpukan sampah?",
        options: [
          "Hanya mengganggu pemandangan",
          "Menghasilkan gas metana yang berkontribusi pada perubahan iklim dan menciptakan bau tidak sedap",
          "Tidak ada dampak yang signifikan",
          "Hanya berdampak pada area sekitar tempat pembuangan"
        ],
        correctAnswer: 1,
        explanation: "Penumpukan sampah menghasilkan gas metana dari dekomposisi anaerob, menciptakan bau busuk, mengkontaminasi air tanah, dan berkontribusi pada perubahan iklim global."
      }
    ]
  },
  {
    id: "q2",
    title: "Jenis-Jenis Sampah dan Penanganannya",
    description: "Kenali berbagai jenis sampah dan cara penanganannya yang benar",
    icon: "🗑️",
    points_per_question: 5,
    content: `# Jenis-Jenis Sampah dan Penanganannya

## Klasifikasi Sampah Berdasarkan Sumbernya

### 1. Sampah Rumah Tangga
Sampah yang dihasilkan dari kegiatan sehari-hari di rumah. Jenis sampah ini paling banyak dihasilkan oleh masyarakat dan mencakup:
- Sisa makanan
- Kemasan plastik dan kertas
- Kaca, logam
- Kain bekas
- Serbuk gergaji (dari kayu)

### 2. Sampah Komersial
Sampah dari kegiatan perdagangan dan layanan, seperti:
- Sampah dari toko dan mall
- Sampah dari restoran dan hotel
- Kemasan dari pusat distribusi
- Limbah dari kantor perkantoran

### 3. Sampah Industri
Sampah dari proses produksi industri yang dapat berupa:
- Limbah berenergi tinggi
- Limbah beracun dan berbahaya (B3)
- Limbah cair dan padat
- Abu hasil pembakaran

### 4. Sampah Medis/Klinis
Sampah dari rumah sakit, klinik, dan laboratorium yang sangat berbahaya karena dapat mengandung:
- Darah dan cairan tubuh
- Jarum bekas pakai
- Obat-obatan kadaluarsa
- Limbah kimia berbahaya

### 5. Sampah Konstruksi dan Demolisi
Sampah dari kegiatan bangunan, seperti:
- Sisa beton dan batu bata
- Kayu bekas
- Puing-puing bangunan
- Logam dari struktur bangunan

## Penanganan Sampah Spesifik

### Sampah Plastik
**Waktu Dekomposisi:** 200-500 tahun

**Cara Penanganan:**
1. **Reduce:** Kurangi penggunaan plastik sekali pakai
2. **Reuse:** Gunakan kembali tas plastik untuk keperluan lain
3. **Recycle:** Pisahkan plastik berdasarkan jenis (PET, LDPE, PP, dll)
4. **Proper Disposal:** Serahkan ke pusat daur ulang

### Sampah Kaca
**Waktu Dekomposisi:** Lebih dari 1 juta tahun

**Cara Penanganan:**
- Kaca dapat didaur ulang berkali-kali tanpa penurunan kualitas
- Simpan terpisah dari sampah lain
- Kemasan kaca dapat digunakan kembali sebagai wadah
- Serahkan ke pusat daur ulang untuk dipoles dan dibuat ulang

### Sampah Logam
**Waktu Dekomposisi:** 50-200 tahun

**Cara Penanganan:**
- Logam berharga dapat dijual sebagai besi tua
- Kaleng aluminium hanya perlu 5% energi untuk didaur ulang dibanding buat baru
- Pisahkan dari sampah lain
- Kirim ke pusat pengolahan logam

### Sampah Elektronik (E-Waste)
**Waktu Dekomposisi:** Tidak terurai + Sangat Berbahaya

**Zat Berbahaya yang Dikandung:**
- Merkuri (thermometer digital, lampu hemat energi)
- Timbal (layar CRT, aki)
- Kadmium (baterai)
- Arsen

**Cara Penanganan:**
1. Jangan dibuang ke tempat sampah biasa
2. Kumpulkan dan pisahkan berdasarkan jenis
3. Serahkan ke pusat daur ulang e-waste resmi
4. Atau kembalikan ke toko yang menjual produk baru

### Sampah Minyak Bekas
**Dampak:** Sangat berbahaya bagi lingkungan dan air tanah

**Cara Penanganan:**
1. Simpan dalam wadah tertutup yang aman
2. Jangan dikucurkan ke saluran air atau tanah
3. Serahkan ke pusat daur ulang atau bengkel yang telah ditunjuk
4. Minyak bekas dapat didaur ulang untuk bahan bakar atau pelumas baru

### Sampah Medis/Klinis
**Cara Penanganan:**
1. Harus ditangani oleh fasilitas khusus dengan standar kesehatan
2. Disinfeksi dan sterilisasi terlebih dahulu
3. Dipisahkan berdasarkan jenis (tajam, terkontaminasi, padat)
4. Dibakar di incinerator khusus atau diolah secara khusus

## Komitmen Pemisahan Sampah di Rumah

Dengan memisahkan sampah sejak dari rumah:
- **Mempermudah proses daur ulang** di pusat pengolahan
- **Mengurangi beban TPA** (Tempat Pembuangan Akhir)
- **Meningkatkan efisiensi pengolahan**
- **Menciptakan nilai ekonomi** dari limbah
- **Melindungi petugas** yang menangani sampah`,
    questions: [
      {
        id: "q2-1",
        question: "Berapa lama waktu yang dibutuhkan kertas untuk terurai?",
        options: [
          "2-6 minggu",
          "1-2 bulan",
          "6 bulan",
          "1 tahun"
        ],
        correctAnswer: 0,
        explanation: "Kertas biasanya terurai dalam 2-6 minggu di alam, menjadikannya salah satu sampah organik yang mudah didegradasi."
      },
      {
        id: "q2-2",
        question: "Kaleng aluminium dapat didaur ulang berapa kali tanpa mengurangi kualitas?",
        options: [
          "Hanya 1-2 kali",
          "Maksimal 5 kali",
          "Unlimited/Tidak terbatas",
          "10 kali"
        ],
        correctAnswer: 2,
        explanation: "Kaleng aluminium dapat didaur ulang berkali-kali tanpa mengurangi kualitasnya, hanya membutuhkan 5% energi dibandingkan membuat baru dari bauksit."
      },
      {
        id: "q2-3",
        question: "Sampah elektronik (e-waste) mengandung zat apa yang sangat berbahaya?",
        options: [
          "Hanya debu biasa",
          "Logam berat seperti merkuri, timbal, dan kadmium",
          "Hanya plastik",
          "Tidak ada zat berbahaya"
        ],
        correctAnswer: 1,
        explanation: "E-waste mengandung logam berat seperti merkuri, timbal, dan kadmium yang sangat beracun dan dapat mencemari lingkungan jika tidak ditangani dengan benar."
      },
      {
        id: "q2-4",
        question: "Bagaimana cara yang tepat membuang minyak bekas pakai?",
        options: [
          "Menuang ke saluran air",
          "Buang ke tempat sampah biasa",
          "Kumpulkan dalam wadah tertutup dan serahkan ke pusat daur ulang khusus",
          "Bakar di halaman rumah"
        ],
        correctAnswer: 2,
        explanation: "Minyak bekas harus dikumpulkan dalam wadah tertutup dan diserahkan ke pusat daur ulang khusus karena sangat berbahaya bagi lingkungan dan air tanah."
      },
      {
        id: "q2-5",
        question: "Sampah medis dari rumah sakit sebaiknya ditangani oleh?",
        options: [
          "Pemulung sampah biasa",
          "Langsung dibuang ke TPA umum",
          "Fasilitas pengelolaan sampah medis khusus",
          "Dipendam dalam tanah"
        ],
        correctAnswer: 2,
        explanation: "Sampah medis harus ditangani oleh fasilitas khusus yang memiliki sterilisasi dan prosedur keamanan yang ketat untuk mencegah penyebaran penyakit."
      },
      {
        id: "q2-6",
        question: "Berapa lama waktu yang dibutuhkan botol kaca untuk terurai?",
        options: [
          "1-5 tahun",
          "50-100 tahun",
          "1 juta tahun atau lebih",
          "Tidak pernah terurai"
        ],
        correctAnswer: 2,
        explanation: "Botol kaca membutuhkan waktu 1 juta tahun atau lebih untuk sepenuhnya terurai, tetapi bisa didaur ulang berkali-kali tanpa penurunan kualitas."
      },
      {
        id: "q2-7",
        question: "Apa manfaat dari pemisahan sampah sejak dari rumah?",
        options: [
          "Tidak ada manfaat signifikan",
          "Memudahkan proses daur ulang dan meningkatkan efisiensi pengolahan",
          "Hanya untuk membuat rumah lebih rapi",
          "Membuat sampah cepat terurai"
        ],
        correctAnswer: 1,
        explanation: "Pemisahan sampah sejak dari rumah memudahkan proses daur ulang, mengurangi beban fasilitas pengolahan sampah, dan meningkatkan efisiensi dari awal prosesnya."
      },
      {
        id: "q2-8",
        question: "Limbah tekstil (kain) yang tidak terpakai bisa didaur ulang menjadi?",
        options: [
          "Hanya bisa dibakar",
          "Tas, karpet, insulasi, dan produk tekstil baru",
          "Tidak bisa didaur ulang",
          "Hanya bisa dipendam"
        ],
        correctAnswer: 1,
        explanation: "Limbah tekstil dapat didaur ulang menjadi tas, karpet, insulasi untuk bangunan, dan bahkan pakaian baru melalui proses recycling yang modern."
      },
      {
        id: "q2-9",
        question: "Material apa yang TIDAK bisa didaur ulang?",
        options: [
          "Plastik tipe 1 (PET)",
          "Plastik laminasi atau plastik berlapis",
          "Gelas/Kaca",
          "Kertas berkualitas tinggi"
        ],
        correctAnswer: 1,
        explanation: "Plastik laminasi atau berlapis sangat sulit bahkan tidak bisa didaur ulang karena terdiri dari kombinasi berbagai material yang tidak bisa dipisahkan."
      },
      {
        id: "q2-10",
        question: "Kompos adalah hasil dari penguraian alami sampah apa?",
        options: [
          "Sampah plastik",
          "Sampah logam",
          "Sampah organik seperti makanan, daun, dan rumput",
          "Sampah elektronik"
        ],
        correctAnswer: 2,
        explanation: "Kompos adalah hasil dari penguraian alami sampah organik yang kaya nutrisi dan bisa digunakan sebagai pupuk tanaman yang sangat baik."
      }
    ]
  },
  {
    id: "q3",
    title: "Ekonomi Sirkular dan Gaya Hidup Berkelanjutan",
    description: "Memahami ekonomi sirkular dan cara hidup yang berkelanjutan untuk masa depan",
    icon: "🌍",
    points_per_question: 5,
    content: `# Ekonomi Sirkular dan Gaya Hidup Berkelanjutan

## Apa itu Ekonomi Sirkular?

Ekonomi sirkular adalah model ekonomi yang dirancang untuk menghilangkan konsep pemborosan dengan terus mendaur ulang dan menggunakan kembali produk. Berbeda dengan ekonomi linear yang bersifat "ambil-buat-buang" (take-make-waste), ekonomi sirkular menjaga nilai produk, material, dan sumber daya selama mungkin dalam sistem.

### Prinsip Ekonomi Sirkular:
1. **Preserve and Enhance:** Mempertahankan dan meningkatkan kapital alami
2. **Optimize Resource Yields:** Mengoptimalkan hasil dengan mendaur ulang produk
3. **Rotate Responsibly:** Memutar produk dalam sistem dengan bertanggung jawab

## Dampak Fashion Industry terhadap Lingkungan

### Statistik Mencengangkan:
- **15-20%** dari limbah global berasal dari fashion industry
- **92 juta ton** tekstil berakhir di tempat pembuangan sampah setiap tahunnya
- **Penggunaan air:** 2,700 liter untuk membuat satu kaos katun
- **Emisi karbon:** Fashion industry menghasilkan 10% emisi karbon global

### Fast Fashion vs. Sustainable Fashion:

**Fast Fashion (Cepat & Buruk):**
- Produksi masif dengan harga murah
- Kualitas rendah, cepat rusak
- Bahan kimia berbahaya dalam produksi
- Kondisi kerja tidak layak
- Limbah tekstil yang sangat besar

**Sustainable Fashion (Berkelanjutan):**
- Produksi berkualitas tinggi dengan daya tahan lama
- Menggunakan bahan ramah lingkungan (organik, daur ulang)
- Praktik produksi etis dan fair trade
- Desain yang timeless dan dapat digunakan bertahun-tahun
- Mendukung ekonomi sirkular

## Program Zero Waste

Zero Waste adalah filosofi hidup yang bertujuan mengirim sesedikit mungkin limbah ke tempat pembuangan sampah dengan mengubah pola produksi dan konsumsi.

### Tujuan Zero Waste:
1. **Mencegah** limbah sebelum terbentuk
2. **Mengurangi** jumlah barang yang dikonsumsikan
3. **Menggunakan kembali** produk dalam kondisi asli
4. **Mendaur ulang** material yang tidak bisa digunakan kembali
5. **Mengembalikan** ke alam dengan cara yang aman

### Langkah Implementasi Zero Waste:
- Membeli hanya kebutuhan yang benar-benar diperlukan
- Memilih produk dengan kemasan minimal
- Membawa wadah sendiri saat berbelanja
- Mendaur ulang dengan benar
- Mengedukasi keluarga dan komunitas

## Konsumsi Berkelanjutan

Konsumsi berkelanjutan adalah pembelian dan penggunaan produk dengan cara yang meminimalkan dampak lingkungan dan sosial.

### Cara Berbelanja Berkelanjutan:
1. **Buy Less, Choose Well:** Beli lebih sedikit, pilih kualitas lebih baik
2. **Ask Questions:** Tanyakan asal produk dan bagaimana dibuat
3. **Choose Certified:** Pilih produk dengan sertifikasi lingkungan
4. **Extend Life:** Rawat produk agar tahan lama
5. **Second Hand First:** Pertimbangkan produk bekas sebelum membeli baru

### Keuntungan Membeli Second Hand:
- **Mengurangi limbah:** Memperpanjang umur produk
- **Hemat uang:** Harga lebih murah
- **Mengurangi demand produksi:** Kurangi limbah industri
- **Unik dan berkualitas:** Sering menemukan item berkualitas tinggi

## Pertanian Organik vs. Konvensional

### Pertanian Konvensional (Masalah):
- Menggunakan pestisida sintetis
- Mengguna herbisida yang meracuni tanah
- Mengurangi kesuburan tanah dalam jangka panjang
- Mencemari air tanah dan air permukaan
- Membahayakan serangga penyerbuk (lebah)

### Pertanian Organik (Solusi):
- Tidak menggunakan pestisida sintetis
- Menggunakan pupuk alami dan kompos
- Menjaga kesuburan tanah
- Melindungi ekosistem tanah
- Produk lebih sehat dan bergizi
- Mendukung petani lokal

## Carbon Footprint dan Cara Menguranginya

### Carbon Footprint:
Total emisi gas rumah kaca (CO2, metana, nitrous oxide) yang dihasilkan dari produksi, transportasi, dan konsumsi barang atau layanan.

### Cara Mengurangi Carbon Footprint:
1. **Transportasi:**
   - Gunakan transportasi publik
   - Berkendara motor/mobil bersama (carpool)
   - Bersepeda atau jalan kaki untuk jarak dekat
   - Kurangi perjalanan udara

2. **Energi Rumah:**
   - Gunakan lampu LED
   - Matikan perangkat yang tidak digunakan
   - Gunakan energi terbarukan (solar panel)
   - Isolasi rumah dengan baik

3. **Diet:**
   - Kurangi konsumsi daging sapi (paling banyak emisi)
   - Makan sayuran dan buah lokal
   - Hindari makanan olahan

4. **Belanja:**
   - Membeli produk lokal
   - Hindari produk dengan kemasan berlebihan
   - Pilih produk yang bertahan lama
   - Dukung bisnis yang berkelanjutan

## Hubungan dengan Sustainable Development Goals (SDGs)

Pengelolaan sampah dan gaya hidup berkelanjutan mendukung beberapa SDGs:

- **SDG 12:** Responsible Consumption and Production - Pola produksi dan konsumsi yang berkelanjutan
- **SDG 13:** Climate Action - Aksi nyata untuk mengatasi perubahan iklim
- **SDG 14:** Life Below Water - Menjaga kelestarian kehidupan laut dari plastik dan polusi
- **SDG 15:** Life on Land - Menjaga ekosistem darat
- **SDG 9:** Industry, Innovation and Infrastructure - Industri yang ramah lingkungan

## Komitmen untuk Masa Depan

Setiap individu memiliki kekuatan untuk membuat perbedaan. Dengan mengadopsi gaya hidup berkelanjutan:
- Kita melindungi planet untuk generasi mendatang
- Kita mendukung ekonomi lokal dan adil
- Kita menginspirasi orang lain untuk berbuat hal yang sama
- Kita berkontribusi pada pembangunan berkelanjutan global`,
    questions: [
      {
        id: "q3-1",
        question: "Apa yang dimaksud dengan ekonomi sirkular?",
        options: [
          "Ekonomi yang hanya fokus pada pertumbuhan GDP",
          "Sistem ekonomi yang meminimalkan limbah dengan terus mendaur ulang dan menggunakan kembali produk",
          "Ekonomi yang tidak berkaitan dengan lingkungan",
          "Sistem ekonomi linier tradisional"
        ],
        correctAnswer: 1,
        explanation: "Ekonomi sirkular adalah model ekonomi yang dirancang untuk menghilangkan pemborosan melalui daur ulang berkelanjutan, penggunaan kembali, dan desain produk yang lebih baik."
      },
      {
        id: "q3-2",
        question: "Berapa persentase limbah global yang berasal dari fashion industry?",
        options: [
          "5%",
          "10%",
          "15-20%",
          "30%"
        ],
        correctAnswer: 2,
        explanation: "Fashion industry menghasilkan 15-20% dari limbah global dan 92 juta ton tekstil berakhir di tempat pembuangan sampah setiap tahunnya."
      },
      {
        id: "q3-3",
        question: "Apa tujuan utama dari program 'Zero Waste'?",
        options: [
          "Menghilangkan semua sampah dalam seminggu",
          "Mengubah pola pikir masyarakat agar meminimalkan dan mengelola sampah dengan bijak",
          "Hanya berlaku untuk industri besar",
          "Tidak memiliki dampak yang berarti"
        ],
        correctAnswer: 1,
        explanation: "Program Zero Waste bertujuan untuk mengubah cara kita memproduksi dan mengkonsumsi dengan meminimalkan limbah melalui pendekatan 'Reduce, Reuse, Recycle'."
      },
      {
        id: "q3-4",
        question: "Apa dampak dari fast fashion terhadap lingkungan?",
        options: [
          "Tidak ada dampak signifikan",
          "Hanya meningkatkan bisnis",
          "Menghasilkan limbah besar, polusi air, dan emisi karbon tinggi",
          "Dampaknya hanya bersifat lokal"
        ],
        correctAnswer: 2,
        explanation: "Fast fashion menghasilkan limbah tekstil besar, mencemari air dengan pewarna berbahaya, dan menghasilkan emisi karbon tinggi dari produksi dan pengiriman."
      },
      {
        id: "q3-5",
        question: "Bagaimana cara konsumsi berkelanjutan dapat membantu lingkungan?",
        options: [
          "Dengan membeli lebih banyak produk",
          "Dengan memilih produk ramah lingkungan, memperpanjang umur produk, dan mengurangi konsumsi",
          "Tidak ada cara efektif",
          "Hanya dengan mendaur ulang saja"
        ],
        correctAnswer: 1,
        explanation: "Konsumsi berkelanjutan melalui pembelian sadar, memilih produk ramah lingkungan, dan memperpanjang umur produk dapat mengurangi dampak negatif terhadap lingkungan."
      },
      {
        id: "q3-6",
        question: "Apa manfaat dari pertanian organik dibandingkan pertanian konvensional?",
        options: [
          "Produksinya lebih banyak",
          "Harganya lebih murah",
          "Mengurangi penggunaan pestisida kimia berbahaya dan menjaga kesehatan tanah",
          "Tidak ada manfaat yang signifikan"
        ],
        correctAnswer: 2,
        explanation: "Pertanian organik menghindari pestisida sintetis, menjaga kesuburan tanah, mengurangi polusi air, dan menghasilkan produk yang lebih sehat."
      },
      {
        id: "q3-7",
        question: "Apa yang dimaksud dengan 'carbon footprint'?",
        options: [
          "Jejak kaki yang ditinggalkan di lingkungan",
          "Total emisi gas rumah kaca yang dihasilkan dari aktivitas manusia",
          "Jumlah pohon yang ditanam",
          "Tingkat polusi udara di kota"
        ],
        correctAnswer: 1,
        explanation: "Carbon footprint adalah total emisi gas rumah kaca (CO2 dan gas lainnya) yang dihasilkan dari produksi, transportasi, dan konsumsi barang atau layanan."
      },
      {
        id: "q3-8",
        question: "Bagaimana cara individu dapat mengurangi carbon footprint mereka?",
        options: [
          "Hanya bisa dilakukan oleh pemerintah",
          "Menggunakan transportasi publik, mengurangi konsumsi energi, dan memilih produk lokal",
          "Tidak mungkin untuk individu mengubah sesuatu",
          "Hanya dengan tidak membeli apapun"
        ],
        correctAnswer: 1,
        explanation: "Individu dapat mengurangi carbon footprint dengan menggunakan transportasi publik, menghemat energi, memilih produk lokal, dan mengurangi konsumsi daging."
      },
      {
        id: "q3-9",
        question: "Apa keuntungan dari membeli produk secondhand atau bekas?",
        options: [
          "Hanya untuk orang yang tidak mampu",
          "Mengurangi limbah, menghemat uang, dan mengurangi demand produksi baru",
          "Produknya pasti rusak dan tidak berkualitas",
          "Tidak ada keuntungan"
        ],
        correctAnswer: 1,
        explanation: "Membeli produk secondhand mengurangi limbah, menghemat uang, mengurangi permintaan produksi baru, dan memperpanjang umur produk di lingkungan."
      },
      {
        id: "q3-10",
        question: "Apa hubungan antara pengelolaan sampah dengan SDGs (Sustainable Development Goals)?",
        options: [
          "Tidak ada hubungan",
          "Pengelolaan sampah mendukung beberapa SDGs seperti SDG 12 (Responsible Consumption) dan SDG 13 (Climate Action)",
          "Hanya relevan untuk negara maju",
          "Sudah terlalu terlambat untuk implementasi"
        ],
        correctAnswer: 1,
        explanation: "Pengelolaan sampah yang baik mendukung SDG 12 (Konsumsi dan Produksi Bertanggung Jawab) dan SDG 13 (Aksi Iklim), serta SDGs lainnya untuk pembangunan berkelanjutan."
      }
    ]
  }
];

