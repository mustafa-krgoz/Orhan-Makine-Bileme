// ============================================
// MARKA VERİLERİ - ORHAN MAKİNE BİLEME
// Tüm markalar ve kategoriler
// ============================================

// ============================================
// MARKA LİSTESİ - 25 MARKA
// İkon isimleri Lucide-react icon adları olarak saklanıyor
// ============================================

export const brandsData = [
  {
    id: 1,
    name: 'Freud',
    category: 'Testereler',
    icon: 'Wrench',
    shortDescription: 'İtalyan kalitesi testere bıçakları ve kesici takımlar',
    fullDescription: 'Dünya çapında tanınan İtalyan kalitesi Freud, profesyonel testere bıçakları ve kesici takımlar konusunda sektörün lideridir. 50 yılı aşkın tecrübesiyle ahşap işleme endüstrisine yenilikçi çözümler sunmaktadır.',
    products: [
      'CNC Router Bıçakları',
      'Panel Testere Bıçakları',
      'Daire Testere Bıçakları',
      'Freze Uçları',
      'Delme Sistemleri'
    ],
    features: ['Orijinal İtalyan Üretim', 'Uzun Ömürlü', 'Yüksek Hassasiyet'],
    established: '1962',
    origin: 'İtalya'
  },
  {
    id: 2,
    name: 'Farabi',
    category: 'Testereler',
    icon: 'Wrench',
    shortDescription: 'Türkiye\'nin lider testere üreticisi',
    fullDescription: 'Türkiye\'nin en köklü testere üreticisi olan Farabi, 40 yılı aşkın süredir yerli ve uluslararası pazarlara kaliteli ürünler sunmaktadır. Geniş ürün yelpazesi ile her türlü kesim ihtiyacına çözüm üretir.',
    products: [
      'Metal Kesim Testereleri',
      'Ahşap İşleme Testereleri',
      'Endüstriyel Testereler',
      'Bantlı Testereler',
      'Hassas Kesim Sistemleri'
    ],
    features: ['Yerli Üretim', 'Uygun Fiyat', 'Geniş Ürün Yelpazesi'],
    established: '1980',
    origin: 'Türkiye'
  },
  {
    id: 3,
    name: 'Mızrak',
    category: 'Makineler',
    icon: 'Factory',
    shortDescription: 'Endüstriyel makine üretiminde Türk markası',
    fullDescription: 'Mızrak, Türkiye\'nin önde gelen endüstriyel makine üreticilerinden biridir. Modern teknoloji ile yerli mühendislik bilgisini birleştirerek dayanıklı ve verimli makineler üretir.',
    products: [
      'Panel Testereler',
      'Kenar Bantlama Makineleri',
      'CNC İşleme Merkezleri',
      'Zımpara Makineleri',
      'Kombinasyon Makineleri'
    ],
    features: ['Türk Mühendisliği', 'Sağlam Yapı', 'Kolay Bakım'],
    established: '1995',
    origin: 'Türkiye'
  },
  {
    id: 4,
    name: 'MAKİTA',
    category: 'El Aletleri',
    icon: 'Drill',
    shortDescription: 'Profesyonel elektrikli el aletleri',
    fullDescription: 'Japon teknolojisi ve kalitesiyle tanınan Makita, profesyonel elektrikli el aletleri konusunda dünya lideridir. Dayanıklılık ve performans odaklı ürünleriyle her türlü işte güvenilir çözümler sunar.',
    products: [
      'Akülü Vidalama Setleri',
      'Darbeli Matkap-Vidalama',
      'Açı Taşlama Makineleri',
      'Testere Sistemleri',
      'Şarj Sistemleri'
    ],
    features: ['Japon Teknolojisi', 'Uzun Pil Ömrü', 'Profesyonel Kullanım'],
    established: '1915',
    origin: 'Japonya'
  },
  {
    id: 5,
    name: 'BEA',
    category: 'Havalı Aletler',
    icon: 'Package',
    shortDescription: 'Havalı zımba ve çivi çakma makinaları',
    fullDescription: 'BEA, mobilya ve inşaat sektöründe havalı zımba ve çivi çakma sistemleri konusunda uzmanlaşmış uluslararası bir markadır. Hızlı montaj çözümleri ile üretim verimliliğini artırır.',
    products: [
      'Havalı Çivi Çakma Makineleri',
      'Zımba Makineleri',
      'Brad Çakma Sistemleri',
      'Yedek Çivi ve Zımbalar',
      'Kompresör Aksesuarları'
    ],
    features: ['Yüksek Hız', 'Hassas Çakma', 'Güvenli Kullanım'],
    established: '1960',
    origin: 'Almanya'
  },
  {
    id: 6,
    name: 'BIGLIFT',
    category: 'Kaldırma',
    icon: 'Truck',
    shortDescription: 'Transpalet, istifleme ve kaldırma ekipmanları',
    fullDescription: 'BigLift, depo ve lojistik sektörüne yönelik geniş ürün yelpazesi ile manuel ve elektrikli kaldırma çözümleri sunmaktadır. Güvenlik ve dayanıklılık odaklı ürünleri ile işletmelerin iş gücünü azaltır.',
    products: [
      'Manuel Transpaletler',
      'Elektrikli Transpaletler',
      'İstif Makineleri',
      'Platform Arabalar',
      'Kaldırma Aksesuarları'
    ],
    features: ['Yüksek Kapasite', 'Güvenli Taşıma', 'Ergonomik Tasarım'],
    established: '2005',
    origin: 'Türkiye'
  },
  {
    id: 7,
    name: 'CORA',
    category: 'Hava Sistemleri',
    icon: 'Droplets',
    shortDescription: 'Kompresörler ve boya tabancaları',
    fullDescription: 'CORA, basınçlı hava sistemleri ve boya uygulama ekipmanları konusunda İtalyan mühendislik kalitesini yansıtır. Endüstriyel ve atölye uygulamaları için güvenilir çözümler sunar.',
    products: [
      'Pistonlu Kompresörler',
      'Vidalı Kompresörler',
      'Boya Tabancaları',
      'Hava Filtre Sistemleri',
      'Basınç Düzenleyiciler'
    ],
    features: ['Sessiz Çalışma', 'Enerji Tasarrufu', 'Düşük Bakım'],
    established: '1980',
    origin: 'İtalya'
  },
  {
    id: 8,
    name: 'EDN',
    category: 'Testereler',
    icon: 'Wrench',
    shortDescription: 'Yüksek kalite daire testereler',
    fullDescription: 'EDN, profesyonel daire testere sistemleri üretiminde uzmanlaşmış bir markadır. Hassas kesim gerektiren işler için ideal çözümler sunar.',
    products: [
      'Daire Testere Bıçakları',
      'Karbür Uçlu Testereler',
      'Panel Kesim Bıçakları',
      'Scoring Testereler',
      'Alüminyum Kesim Bıçakları'
    ],
    features: ['Hassas Kesim', 'Uzun Ömür', 'Çok Amaçlı Kullanım'],
    established: '1990',
    origin: 'Almanya'
  },
  {
    id: 9,
    name: 'EUROMAX',
    category: 'Endüstriyel',
    icon: 'Factory',
    shortDescription: 'Palta-karol-boru işleme ve endüstriyel makinalar',
    fullDescription: 'EUROMAX, metal işleme ve endüstriyel üretim makineleri konusunda Avrupa standartlarında ürünler sunar. Özellikle palta ve boru işleme sistemlerinde uzmanlaşmıştır.',
    products: [
      'Palta İşleme Makineleri',
      'Boru Profil Makineleri',
      'Metal Kesim Sistemleri',
      'Büküm Makineleri',
      'Hidrolik Presler'
    ],
    features: ['Avrupa Standardı', 'Yüksek Verim', 'Otomatik Sistemler'],
    established: '2000',
    origin: 'Türkiye'
  },
  {
    id: 10,
    name: 'FACTOR',
    category: 'İnşaat',
    icon: 'Thermometer',
    shortDescription: 'Asfalt ve beton zemin işleme makineleri',
    fullDescription: 'FACTOR, inşaat sektörüne yönelik asfalt ve beton işleme ekipmanları üretir. Yol yapımı ve zemin düzenleme çalışmaları için profesyonel çözümler sunar.',
    products: [
      'Beton Kesme Makineleri',
      'Asfalt Kesici Testereler',
      'Zemin Düzeltme Sistemleri',
      'Vibratörler',
      'Elmas Kesim Diskler'
    ],
    features: ['Ağır Hizmet', 'Dayanıklı Yapı', 'Profesyonel Kullanım'],
    established: '1998',
    origin: 'İtalya'
  },
  {
    id: 11,
    name: 'GISON',
    category: 'Havalı Aletler',
    icon: 'Zap',
    shortDescription: 'Havalı aletler ve aksesuarlar',
    fullDescription: 'GISON, Tayvan merkezli global bir havalı el aletleri üreticisidir. Geniş ürün yelpazesi ile endüstriyel üretim tesislerine hızlı ve verimli çözümler sunar.',
    products: [
      'Havalı Taşlama Makineleri',
      'Havalı Matkaplar',
      'Havalı Tornavidalar',
      'Havalı Zımparalar',
      'Kompresör Aksesuarları'
    ],
    features: ['Geniş Ürün Yelpazesi', 'Uygun Fiyat', 'Dayanıklı'],
    established: '1973',
    origin: 'Tayvan'
  },
  {
    id: 12,
    name: 'KAMA by REİS',
    category: 'Bahçe',
    icon: 'GitBranch',
    shortDescription: 'Bahçe ve tarım makineleri, jeneratörler',
    fullDescription: 'KAMA by REİS, bahçe bakımı ve tarım ekipmanları konusunda Türkiye\'nin önde gelen markalarından biridir. Ayrıca jeneratör ve güç sistemleri üretiminde de faaliyet göstermektedir.',
    products: [
      'Çim Biçme Makineleri',
      'Çapa Makineleri',
      'Jeneratörler',
      'Su Motorları',
      'Bahçe Aletleri'
    ],
    features: ['Yerli Üretim', 'Ekonomik', 'Kolay Kullanım'],
    established: '1985',
    origin: 'Türkiye'
  },
  {
    id: 13,
    name: 'KINSAW',
    category: 'Testereler',
    icon: 'Wrench',
    shortDescription: 'Geniş yelpazede testere çeşitleri',
    fullDescription: 'KINSAW, testere teknolojisinde uzmanlaşmış bir marka olup metal ve ahşap kesim için geniş ürün yelpazesi sunar. Endüstriyel kullanım için ideal çözümler üretir.',
    products: [
      'Şerit Testereler',
      'Metal Kesim Testereleri',
      'Hassas Kesim Bıçakları',
      'Bi-metal Testereler',
      'Karbür Testereler'
    ],
    features: ['Çok Yönlü Kullanım', 'Uzun Kesim Ömrü', 'Hassas Sonuçlar'],
    established: '1992',
    origin: 'Çin'
  },
  {
    id: 14,
    name: 'LEICA',
    category: 'Ölçüm',
    icon: 'Compass',
    shortDescription: 'Lazerli ölçü aletleri ve geomatik çözümler',
    fullDescription: 'İsviçre merkezli LEICA, optik ve ölçüm teknolojisinde dünya lideridir. Lazer mesafe ölçerler ve profesyonel ölçüm ekipmanları ile inşaat ve endüstri sektörüne hizmet vermektedir.',
    products: [
      'Lazer Mesafe Ölçerler',
      'Nivelmanlar',
      'Teodolitler',
      'GPS Sistemleri',
      'Termal Kameralar'
    ],
    features: ['İsviçre Hassasiyeti', 'İleri Teknoloji', 'Profesyonel Kalite'],
    established: '1849',
    origin: 'İsviçre'
  },
  {
    id: 15,
    name: 'OZCO',
    category: 'Takım Tezgahları',
    icon: 'Wrench',
    shortDescription: 'Sütunlu matkaplar, frezeler, tornalar',
    fullDescription: 'OZCO, takım tezgahları üretiminde yerli bir marka olarak metal işleme sektörüne hizmet vermektedir. Sağlam yapısı ve uygun fiyatlarıyla küçük ve orta ölçekli işletmelerin tercihi olmaktadır.',
    products: [
      'Sütunlu Matkaplar',
      'Freze Makineleri',
      'Tornalar',
      'Tezgah Tipi Matkaplar',
      'Metal İşleme Aksesuarları'
    ],
    features: ['Yerli Üretim', 'Sağlam Yapı', 'Uygun Fiyat'],
    established: '2000',
    origin: 'Türkiye'
  },
  {
    id: 16,
    name: 'PRO-SAW',
    category: 'Kesim',
    icon: 'Scissors',
    shortDescription: 'Daire testereler, elmas testereler, karot uçları',
    fullDescription: 'PRO-SAW, kesim teknolojileri konusunda uzmanlaşmış profesyonel bir markadır. Elmas kesim diskler ve karot uçları ile inşaat ve metal sektörüne hizmet vermektedir.',
    products: [
      'Elmas Kesim Diskleri',
      'Karot Uçları',
      'Daire Testere Bıçakları',
      'Beton Kesim Diskleri',
      'Fayans Kesim Diskleri'
    ],
    features: ['Profesyonel Kalite', 'Uzun Ömürlü', 'Çok Amaçlı'],
    established: '1995',
    origin: 'ABD'
  },
  {
    id: 17,
    name: 'RAPID',
    category: 'Montaj',
    icon: 'Package',
    shortDescription: 'Zımba ve silikon tabancaları',
    fullDescription: 'İsveç kökenli RAPID, zımba ve yapıştırma sistemleri konusunda 90 yılı aşkın tecrübeye sahiptir. Ofis ve endüstriyel kullanım için geniş ürün yelpazesi sunar.',
    products: [
      'Manuel Zımba Makineleri',
      'Elektrikli Zımba Makineleri',
      'Silikon Tabancaları',
      'Zımba Telleri',
      'Yapıştırıcı Sistemler'
    ],
    features: ['İsveç Kalitesi', 'Ergonomik Tasarım', 'Güvenilir'],
    established: '1923',
    origin: 'İsveç'
  },
  {
    id: 18,
    name: 'SCHEPPACH',
    category: 'Ahşap',
    icon: 'TreePine',
    shortDescription: 'Ahşap işleme makineleri',
    fullDescription: 'Alman mühendislik kalitesi ile ahşap işleme makineleri üreten SCHEPPACH, hobi ve profesyonel kullanıcılar için geniş bir ürün yelpazesi sunmaktadır.',
    products: [
      'Daire Testereler',
      'Şerit Zımparalar',
      'Kalınlık Makineleri',
      'Kombinasyon Makineleri',
      'Torna Tezgahları'
    ],
    features: ['Alman Kalitesi', 'Hassas İşleme', 'Güvenli Kullanım'],
    established: '1927',
    origin: 'Almanya'
  },
  {
    id: 19,
    name: 'STARK',
    category: 'Metal',
    icon: 'Wrench',
    shortDescription: 'Metal işleme testereleri',
    fullDescription: 'STARK, metal kesim ve işleme konusunda uzmanlaşmış bir markadır. Endüstriyel testereler ve kesim sistemleri ile metal sektörüne hizmet vermektedir.',
    products: [
      'Metal Kesim Testereleri',
      'Şerit Testere Makineleri',
      'Daire Testere Sistemleri',
      'Soğutma Sistemleri',
      'Testere Bıçakları'
    ],
    features: ['Endüstriyel Kalite', 'Yüksek Verim', 'Dayanıklı'],
    established: '1985',
    origin: 'Türkiye'
  },
  {
    id: 20,
    name: 'TOPSHOP',
    category: 'El Aletleri',
    icon: 'Hammer',
    shortDescription: 'El aletleri ve freze bıçakları',
    fullDescription: 'TOPSHOP, profesyonel el aletleri ve freze bıçakları üretiminde kaliteli ürünler sunar. Özellikle CNC freze uygulamaları için geniş ürün yelpazesine sahiptir.',
    products: [
      'Freze Bıçakları',
      'Router Bitleri',
      'El Aletleri',
      'Ölçüm Aletleri',
      'Tutucu Sistemler'
    ],
    features: ['Geniş Seçenek', 'Kaliteli Malzeme', 'Uygun Fiyat'],
    established: '1990',
    origin: 'Türkiye'
  },
  {
    id: 21,
    name: 'TURCOBOOR',
    category: 'Delme',
    icon: 'Zap',
    shortDescription: 'Manyetik matkaplar ve aksesuarları',
    fullDescription: 'TURCOBOOR, manyetik matkap teknolojisinde öncü bir markadır. Metal delme işlemlerinde yüksek hassasiyet ve hız sağlayan profesyonel ekipmanlar üretir.',
    products: [
      'Manyetik Matkaplar',
      'Anüler Kesiciler',
      'HSS Matkaplar',
      'Matkap Aksesuarları',
      'Soğutma Sistemleri'
    ],
    features: ['Güçlü Manyetik Tutuş', 'Hızlı Delme', 'Portatif'],
    established: '2005',
    origin: 'Türkiye'
  },
  {
    id: 22,
    name: 'VIRAX',
    category: 'Boru',
    icon: 'Droplets',
    shortDescription: 'Boru işleme ekipmanları',
    fullDescription: 'Fransız markası VIRAX, boru kesme, büküm ve işleme ekipmanları konusunda 75 yılı aşkın tecrübeye sahiptir. Tesisat ve metal işleme sektörünün vazgeçilmezidir.',
    products: [
      'Boru Kesme Makineleri',
      'Boru Bükme Makineleri',
      'Pres Makineleri',
      'Kaynak Makineleri',
      'Boru Aksesuarları'
    ],
    features: ['Fransız Teknolojisi', 'Hassas İşleme', 'Dayanıklı'],
    established: '1954',
    origin: 'Fransa'
  },
  {
    id: 23,
    name: 'WELDER',
    category: 'Kaynak',
    icon: 'Flame',
    shortDescription: 'Kaynak makineleri ve aksesuarları',
    fullDescription: 'WELDER, inverter kaynak teknolojisinde yerli bir marka olarak elektrik kaynağı ve TIG kaynağı konusunda geniş ürün yelpazesi sunmaktadır.',
    products: [
      'İnverter Kaynak Makineleri',
      'TIG Kaynak Makineleri',
      'MIG/MAG Kaynak',
      'Kaynak Aksesuarları',
      'Koruyucu Ekipmanlar'
    ],
    features: ['Yerli Üretim', 'İnverter Teknoloji', 'Ekonomik'],
    established: '2008',
    origin: 'Türkiye'
  },
  {
    id: 24,
    name: 'WELLER',
    category: 'Elektronik',
    icon: 'Zap',
    shortDescription: 'Lehim havyaları ve el aletleri',
    fullDescription: 'WELLER, lehimleme teknolojisinde dünya lideri konumundadır. Elektronik üretim ve onarım için profesyonel lehim istasyonları ve aksesuarlar üretmektedir.',
    products: [
      'Lehim İstasyonları',
      'Lehim Havyaları',
      'Sıcak Hava Üfleyiciler',
      'Lehim Uçları',
      'Lehimleme Aksesuarları'
    ],
    features: ['Alman Teknolojisi', 'Hassas Sıcaklık', 'Profesyonel'],
    established: '1945',
    origin: 'Almanya'
  },
  {
    id: 25,
    name: 'KNIPEX',
    category: 'El Aletleri',
    icon: 'Wrench',
    shortDescription: 'Alman kalitesi penseler ve sıkma aletleri',
    fullDescription: 'KNIPEX, 135 yılı aşkın bir geçmişe sahip Alman el aletleri üreticisidir. Özellikle penseler ve sıkma aletleri konusunda dünya standardı belirleyen kalite sunmaktadır.',
    products: [
      'Profesyonel Penseler',
      'Su Pompası Anahtarları',
      'Kablo Kesiciler',
      'İzoleli El Aletleri',
      'Özel Uygulamalar'
    ],
    features: ['Alman Hassasiyeti', 'Ergonomik', 'Ömür Boyu Kalite'],
    established: '1882',
    origin: 'Almanya'
  }
];

// ============================================
// MARKA KATEGORİLERİ
// ============================================

export const brandCategories = [
  {
    id: 'testereler',
    name: 'Testere Sistemleri',
    icon: 'Wrench',
    brands: ['Freud', 'Farabi', 'EDN', 'KINSAW', 'PRO-SAW', 'STARK'],
    description: 'Profesyonel kesim çözümleri'
  },
  {
    id: 'el-aletleri',
    name: 'El Aletleri',
    icon: 'Hammer',
    brands: ['MAKİTA', 'TOPSHOP', 'WELLER', 'KNIPEX'],
    description: 'Profesyonel el aletleri'
  },
  {
    id: 'endustriyel',
    name: 'Endüstriyel Makineler',
    icon: 'Factory',
    brands: ['Mızrak', 'EUROMAX', 'SCHEPPACH', 'OZCO'],
    description: 'Ağır sanayi makineleri'
  },
  {
    id: 'havali-aletler',
    name: 'Havalı Aletler',
    icon: 'Zap',
    brands: ['BEA', 'GISON', 'CORA', 'TURCOBOOR', 'RAPID'],
    description: 'Basınçlı hava sistemleri'
  },
  {
    id: 'is-makineleri',
    name: 'İş Makineleri',
    icon: 'Truck',
    brands: ['BIGLIFT', 'FACTOR', 'KAMA by REİS', 'VIRAX'],
    description: 'Kaldırma ve taşıma ekipmanları'
  },
  {
    id: 'olcum-aletleri',
    name: 'Ölçüm Aletleri',
    icon: 'Compass',
    brands: ['LEICA'],
    description: 'Hassas ölçüm teknolojileri'
  }
];

// ============================================
// YARDIMCI FONKSİYONLAR
// ============================================

// Markaları kategoriye göre getir
export const getBrandsByCategory = (categoryId) => {
  const category = brandCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return brandsData.filter(brand => 
    category.brands.includes(brand.name)
  );
};

// Belirli bir markayı getir
export const getBrandByName = (brandName) => {
  return brandsData.find(brand => brand.name === brandName);
};

// Tüm kategorileri getir
export const getAllCategories = () => {
  return brandCategories;
};

// İkon adını al (Lucide-react için)
export const getIconName = (iconString) => {
  return iconString;
};