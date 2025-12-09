export const productsData = [
    {
      id: 1,
      name: "CORA Kompresör",
      category: "kompresor",
      subCategory: "elektrikli",
      brand: "CORA",
      price: 7900,
      originalPrice: 8500,
      image: "/images/CORA-KOMPRESOR-2.5HP-100L.png",
      description: "Güçlü ve sessiz çalışan kompresör",
      features: ["Yüksek basınç kapasitesi", "Düşük enerji tüketimi", "Sessiz çalışma", "2 yıl garanti"],
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
      // Rating ve reviewCount kaldırıldı - Başlangıçta 0 olacak
      reviews: [], // Yeni: Ürüne ait yorumları tutacak array
      questions: [] // Yeni: Ürüne ait soruları tutacak array
    },
    {
      id: 2,
      name: "Makita Sunta Kesme Makinesi",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 5900,
      originalPrice: 6500,
      image: "/images/HS7601-SUNTA-KESME.png",
      description: "Hassas kesim için ideal makine",
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
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    },
    {
      id: 3,
      name: "Makita Dekupaj Elektronik",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 5300,
      originalPrice: 5800,
      image: "/images/MAKITA 4350CT DEKUPAJ ELEKTRONIK1.png",
      description: "Elektronik hız kontrolü ile dekupaj",
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
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    },
    {
      id: 4,
      name: "Makita Akülü Kırıcı Delici",
      category: "kirici-delici",
      subCategory: "akulu",
      brand: "Makita",
      price: 14500,
      originalPrice: 15900,
      image: "/images/MAKITA-DHR241RMJ-AKULU-KIRICI-DELICI-HILTI1.png",
      description: "Güçlü akülü kırıcı delici hilti",
      features: ["Kablosuz özgürlük", "Yüksek darbe gücü", "Uzun pil ömrü", "3 modlu çalışma"],
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
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    },
    {
      id: 5,
      name: "Makita Isıtıcı",
      category: "isitici",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 2200,
      originalPrice: 2500,
      image: "/images/MAKITA-HG5030K-ISITICI1.png",
      description: "Portatif ısıtma çözümü",
      features: ["Hızlı ısınma", "Ayarlanabilir sıcaklık", "Güvenli kullanım", "Taşınabilir tasarım"],
      specifications: {
        guc: "2000W",
        alan: "20 m²",
        termostat: "Var",
        agirlik: "2.5 kg"
      },
      inStock: false,
      isNew: false,
      isCampaign: false,
      isSponsored: false,
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    },
    {
      id: 6,
      name: "Makita Tablalı Gönye Tezgah",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 18500,
      originalPrice: 19900,
      image: "/images/MAKITA-LH1040-TABLALI-GONYE-TEZGAH.png",
      description: "Profesyonel gönye kesim tezgahı",
      features: ["Hassas açı ayarı", "Geniş kesim kapasitesi", "Sağlam yapı", "Lazer kılavuz"],
      specifications: {
        diskCap: "255 mm",
        kesimDerinlik: "90 mm",
        acı: "0-45°",
        agirlik: "12.5 kg"
      },
      inStock: true,
      isNew: false,
      isCampaign: false,
      isSponsored: false,
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    },
    {
      id: 7,
      name: "Makita Akülü Darbeli Matkap",
      category: "matkap",
      subCategory: "akulu",
      brand: "Makita",
      price: 8200,
      originalPrice: 8900,
      image: "/images/MAKITA-DHP484RTJ-AKULU-DARBELI-MATKAP1.png",
      description: "Profesyonel akülü darbeli matkap",
      features: ["Yüksek tork", "Uzun batarya ömrü", "Hızlı şarj", "LED aydınlatma"],
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
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    },
    {
      id: 8,
      name: "Makita Aküsüz Darbeli Matkap",
      category: "matkap",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 4500,
      originalPrice: 5200,
      image: "/images/akusuzdarbelimatkap1.png",
      description: "Güçlü kablolu darbeli matkap",
      features: ["Sürekli güç", "Yüksek performans", "Dayanıklı tasarım", "Emniyet kilitli"],
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
      // Rating ve reviewCount kaldırıldı
      reviews: [],
      questions: []
    }
  ];