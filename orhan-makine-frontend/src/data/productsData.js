export const productsData = [
  /* ============================================================
     1) MEVCUT ÜRÜNLER 
  ============================================================ */
  {
    id: 1,
    name: "CORA Kompresör",
    productCode: "CORA100LT",
    category: "kompresor",
    subCategory: "elektrikli",
    brand: "CORA",
    price: 17040,
    originalPrice: 17040,
    showDiscount: true,
    image: "/images/products/CORA-KOMPRESOR-2.5HP-100L.png",
    description: "Yüksek performanslı, sessiz ve enerji tasarruflu kompresör.",
    features: [
      "Yüksek basınç kapasitesi",
      "Düşük enerji tüketimi",
      "Sessiz çalışma",
      "Dayanıklı gövde"
    ],
    specifications: {
      guc: "2.5 HP",
      kapasite: "100 Litre",
      basinc: "8 Bar",
      agirlik: "45 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 2,
    name: "Makita Sunta Kesme Makinesi",
    productCode: "HS7601",
    category: "kesme-makineleri",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 8000,
    originalPrice: 8000,
    showDiscount: false,
    image: "/images/products/HS7601-SUNTA-KESME.png",
    description: "Hassas ve güçlü sunta kesme makinesi.",
    features: ["Hassas kesim", "Ergonomik tasarım", "Güçlü motor", "Toz emme bağlantısı"],
    specifications: {
      diskCap: "190 mm",
      devir: "5000 rpm",
      guc: "1200W",
      agirlik: "3.8 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 3,
    name: "Makita Dekupaj Elektronik",
    productCode: "4350CT",
    category: "kesme-makineleri",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 12800,
    originalPrice: 13500,
    showDiscount: true,
    image: "/images/products/MAKITA-4350CT-DEKUPAJ-ELEKTRONIK1.png",
    description: "Hassas kesimler için elektronik hız kontrollü dekupaj testeresi.",
    features: ["Değişken hız", "Kolay bıçak değişimi", "Hassas kesim", "Pendulum ayarı"],
    specifications: {
      strok: "26 mm",
      devir: "500-3100 rpm",
      guc: "450W",
      agirlik: "2.1 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 4,
    name: "Makita Akülü Kırıcı Delici",
    productCode: "DHR241RMJ",
    category: "kirici-delici",
    subCategory: "akulu",
    brand: "Makita",
    price: 24000,
    originalPrice: 25000,
    showDiscount: true,
    image: "/images/products/MAKITA-DHR241RMJ-AKULU-KIRICI-DELICI-HILTI1.png",
    description: "Yüksek darbe gücüne sahip akülü kırıcı-delici hilti.",
    features: ["Kablosuz kullanım", "Yüksek darbe performansı", "Uzun pil ömrü", "3 modlu çalışma"],
    specifications: {
      darbeGucu: "2.7 J",
      batarya: "18V 5Ah",
      maxDelme: "13 mm",
      agirlik: "2.8 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 5,
    name: "Makita Isıtıcı",
    productCode: "HG5030K",
    category: "isitici",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 4800,
    originalPrice: 4800,
    showDiscount: false,
    image: "/images/products/MAKITA-HG5030K-ISITICI1.png",
    description: "Profesyonel kullanım için portatif sıcak hava ısıtıcısı.",
    features: ["Hızlı ısınma", "Ayarlanabilir sıcaklık", "Güvenli kullanım", "Taşınabilir tasarım"],
    specifications: {
      guc: "2000W",
      alan: "20 m²",
      termostat: "Var",
      agirlik: "2.5 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 6,
    name: "Makita Tablalı Gönye Tezgah",
    productCode: "LH1040",
    category: "kesme-makineleri",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 32500,
    originalPrice: 35000,
    showDiscount: true,
    image: "/images/products/MAKITA-LH1040-TABLALI-GONYE-TEZGAH.png",
    description: "Profesyonel gönye kesim tezgahı.",
    features: ["Hassas açı ayarı", "Geniş kesim kapasitesi", "Sağlam yapı", "Lazer kılavuz"],
    specifications: {
      diskCap: "255 mm",
      kesimDerinlik: "90 mm",
      aci: "0-45°",
      agirlik: "12.5 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 7,
    name: "Makita Akülü Darbeli Matkap",
    productCode: "DHP484RTJ",
    category: "matkap",
    subCategory: "akulu",
    brand: "Makita",
    price: 24000,
    originalPrice: 24000,
    showDiscount: false,
    image: "/images/products/MAKITA-DHP484RTJ-AKULU-DARBELI-MATKAP1.png",
    description: "Profesyonel sınıf darbeli matkap.",
    features: ["Yüksek tork", "LED ışık", "Uzun batarya ömrü", "Ergonomik tasarım"],
    specifications: {
      tork: "50 Nm",
      batarya: "18V 4Ah",
      maxDelme: "13 mm",
      agirlik: "1.5 kg"
    },
    inStock: true,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 8,
    name: "Makita Aküsüz Darbeli Matkap",
    productCode: "DF332DZ",
    category: "matkap",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 6850,
    originalPrice: 6850,
    showDiscount: false,
    image: "/images/products/akusuzdarbelimatkap1.png",
    description: "Kablolu yüksek performanslı darbeli matkap.",
    features: ["Sürekli güç", "Dayanıklı gövde", "Ergonomik yapı", "Yüksek devir"],
    specifications: {
      guc: "600W",
      devir: "0-2800 rpm",
      maxDelme: "10 mm",
      agirlik: "1.8 kg"
    },
    inStock: false,
    isNew: false,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },
  {
    id: 9,
    name: "KAMA KMR46 Motorlu Testere",
    productCode: "KMR46",
    category: "testere",
    subCategory: "benzinli",
    brand: "KAMA",
    price: 6000,
    originalPrice: 6500,
    showDiscount: true,
    image: "/images/products/KAMAKMR46-KAMA-BY-REIS-46CC-MOTORLU-TESTERE.png",
    description: "46cc güçlü motoruyla profesyonel kullanım için ideal benzinli testere.",
    features: ["46cc motor", "Yüksek kesim performansı", "Dayanıklı zincir", "Kolay çalıştırma"],
    specifications: {
      motor: "46cc",
      zincir: "Profesyonel",
      agirlik: "6 kg",
      yakit: "Benzin"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 10,
    name: "Makita Hızlı Şarj Cihazı",
    productCode: "DC40RA",
    category: "sarj-cihazlari",
    subCategory: "akulu",
    brand: "Makita",
    price: 7000,
    originalPrice: 7600,
    showDiscount: true,
    image: "/images/products/MAA191E07-8-MAKITA-DC40RA-HIZLI-SARJ-CIHAZI.png",
    description: "Makita 40V Max bataryalar için yüksek hızlı şarj cihazı.",
    features: ["40V Max uyumlu", "Hızlı şarj", "Isı kontrol sistemi", "Uzun ömürlü kullanım"],
    specifications: {
      gerilim: "40V Max",
      sarjSuresi: "Hızlı",
      agirlik: "1.2 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 11,
    name: "Makita Kırıcı",
    productCode: "HM1812",
    category: "kirici-delici",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 70000,
    originalPrice: 74900,
    showDiscount: true,
    image: "/images/products/MAKITA-HM1812-KIRICI.png",
    description: "Ağır hizmet tipi profesyonel kırıcı.",
    features: ["Yüksek darbe gücü", "AVT titreşim azaltma", "Sağlam yapı", "Ağır iş kullanımına uygun"],
    specifications: {
      darbeGucu: "72.8 J",
      guc: "2000W",
      agirlik: "31 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 12,
    name: "Makita Gönye Kesme Tezgahı",
    productCode: "LS1040N",
    category: "kesme-makineleri",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 25000,
    originalPrice: 27000,
    showDiscount: true,
    image: "/images/products/MAKITA-LS1040N-GONYE-KESME-TEZGAHI.png",
    description: "Profesyonel gönye kesimler için yüksek hassasiyetli tezgah.",
    features: ["Hassas gönye ayarı", "Lazer kılavuz", "Profesyonel kullanım", "Geniş kesim kapasitesi"],
    specifications: {
      diskCap: "260 mm",
      aci: "0-45°",
      agirlik: "11 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 13,
    name: "Makita Gönye Kesme",
    productCode: "LS1219",
    category: "kesme-makineleri",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 60000,
    originalPrice: 64000,
    showDiscount: true,
    image: "/images/products/MAKITA-LS1219-GONYE-KESME.png",
    description: "Büyük boy gönye kesimler için üstün performans.",
    features: ["Çift kızaklı sistem", "Lazer kılavuz", "Yüksek hassasiyet"],
    specifications: {
      diskCap: "305 mm",
      aci: "0-45°",
      agirlik: "29 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 14,
    name: "Makita Lazerli Gönye Kesme",
    productCode: "LS1219L",
    category: "kesme-makineleri",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 65000,
    originalPrice: 69000,
    showDiscount: true,
    image: "/images/products/MAKITA-LS1219L-GONYE-KESME.png",
    description: "Lazer kılavuzlu hassas gönye kesim makinesi.",
    features: ["Lazer kılavuz", "Yüksek kesim kapasitesi", "Sessiz çalışma"],
    specifications: {
      diskCap: "305 mm",
      aci: "0-45°",
      agirlik: "29 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 15,
    name: "Makita Elektrikli Zincir Testere",
    productCode: "UC4041A",
    category: "testere",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 11000,
    originalPrice: 12500,
    showDiscount: true,
    image: "/images/products/MAKITA-UC4041A-ELEKTRIKLI-ZINCIR-TESTERE.png",
    description: "Hızlı ve güvenli kesim için elektrikli zincir testere.",
    features: ["Yüksek kesim performansı", "Otomatik yağlama", "Ergonomik tasarım"],
    specifications: {
      guc: "1800W",
      zincir: "40 cm",
      agirlik: "4.7 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  },

  {
    id: 16,
    name: "Makita Freze Makinesi",
    productCode: "M3602B",
    category: "freze",
    subCategory: "elektrikli",
    brand: "Makita",
    price: 10000,
    originalPrice: 11500,
    showDiscount: true,
    image: "/images/products/MAKITA-M3602B-FREZE-MAKINASI.png",
    description: "Profesyonel freze işçilikleri için güçlü Makita freze makinesi.",
    features: ["Derinlik ayarı", "Yüksek devir", "Güçlü motor", "Dayanıklı yapı"],
    specifications: {
      devir: "23000 rpm",
      guc: "1650W",
      agirlik: "5.5 kg"
    },
    inStock: true,
    isNew: true,
    isCampaign: false,
    isSponsored: false,
    reviews: [],
    questions: []
  }
];