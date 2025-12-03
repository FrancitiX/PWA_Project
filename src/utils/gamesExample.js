const games = [
  {
    id: 1,
    name: "EchoesTime",
    description:
      "Un thriller noir temporal donde un joven busca al asesino de sus padres entre las sombras de una ciudad corrupta.",
    labels: ["Noir", "Historia", "Pixel Art", "Misterio"],
    images: [
      "src/assets/images/Covers/EchoesTimeBG.jpg",
      "src/assets/images/Covers/EchoesTimeBG.jpg",
    ], // sin screenshots por ahora
    image: "src/assets/images/Covers/EchoesTimeBG.jpg",
    rating: "Muy Positivo",
    platform: ["PC"],
    discount: 20,
    totalPrice: 199,
    price: 179,
    date: ["2025", "12", "01"],
    developer: "FrancitiX",
    publisher: "FrancitiX",
  },
  {
    id: 2,
    name: "Chicharron prensado",
    description:
      "Un thriller noir temporal donde un joven busca al asesino de sus padres entre las sombras de una ciudad corrupta.",
    labels: ["Chicharron", "Prensado", "Si", "Hola mundo"],
    images: [], // sin screenshots por ahora
    image: "src/assets/images/GameTest2/ChicharronPrensadoBG.png",
    rating: "Muy Positivo",
    platform: ["PC"],
    discount: 0,
    totalPrice: 199,
    price: 179,
    date: ["2025", "12", "01"],
    developer: "FrancitiX",
    publisher: "FrancitiX",
  },
  {
    id: 3,
    name: "Juego de prueba",
    description:
      "No sé es un juego de prueba, esto es una prueba... qué es rojo y parece un cubo? así es, un cubo azul pintado de rojo, juas juas, equisde, equisde.",
    labels: [
      "Test",
      "Propaganda republicana",
      "Free to play",
      "Esternocleidomastoideo",
    ],
    images: ["src/assets/images/GameTest/TestimageGame.png"],
    image: "src/assets/images/GameTest/TestimageGame.png",
    rating: "Muy Positivo",
    platform: ["PC"],
    discount: 0,
    totalPrice: 0,
    price: 0,
    date: ["2025", "25", "25"],
    developer: "FrancitiX",
    publisher: "FrancitiX",
  },
];

const gamesDetails = [
  {
    gameID: 1,
    salesPackages: [
      {
        name: "Standard Edition",
        price: 200,
        discount: 10,
        features: ["Base Game", "Digital Soundtrack"],
      },
    ],
    features: [
      "Single-player campaign",
      "Juego RPG",
      "Multiple endings based on player choices",
    ],
    control: true,
    languages: [
      { name: "English", subtitles: false, voice: false, interface: true },
      { name: "Spanish", subtitles: true, voice: false, interface: true },
    ],
    achievements: [
      {
        name: "Primera vez?",
        description: "Completa el juego.",
        image: "",
        value: 10,
        gp: 0,
      },
    ],
    category: ["RPG", "Indie", "Historia"],
    version: "1.0.0",
    beta: { status: false, date: "" },
    notes: [""],
    zise: { size: 10, type: "GB" },
  },
  {
    gameID: 2,
    salesPackages: [
      {
        name: "Standard Edition",
        price: 200,
        discount: 10,
        features: ["Base Game", "Digital Soundtrack"],
      },
    ],
    features: [
      "Single-player campaign",
      "Juego RPG",
      "Multiple endings based on player choices",
    ],
    control: true,
    languages: [
      { name: "English", subtitles: false, voice: false, interface: true },
      { name: "Spanish", subtitles: true, voice: false, interface: true },
    ],
    achievements: [
      {
        name: "Primera vez?",
        description: "Completa el juego.",
        image: "",
        value: 10,
        gp: 0,
      },
    ],
    category: ["RPG", "Indie", "Historia"],
    version: "1.0.0",
    beta: { status: false, date: "" },
    notes: [""],
  },
  {
    gameID: 3,
    salesPackages: [
      {
        name: "Standard Edition",
        price: 0,
        discount: 0,
        features: ["Juego Base"],
      },
      {
        name: "Prueba",
        price: 99,
        discount: 0,
        features: ["Juego Base", "Orden de 3 tacos de asada"],
      },
    ],
    features: ["Prueba", "No es un juego", "Something in the way"],
    control: true,
    languages: [
      { name: "English", subtitles: false, voice: false, interface: true },
      { name: "Spanish", subtitles: true, voice: false, interface: true },
    ],
    achievements: [
      {
        name: "Prueba",
        description: "Prueba.",
        image: "",
        value: 10,
        gp: 0,
      },
      {
        name: "Hola mundo",
        description: "Si",
        image: "",
        value: 10,
        gp: 0,
      },
    ],
    category: ["Test", "Indie", "Prueba"],
    version: "1.0.0",
    beta: { status: false, date: "" },
    notes: [""],
  },
];

const userDataExample = {
  username: "FrancitiX",
  realName: "フランシスコ",
  country: "Mexico",
  flagCode: "mx",
  description:
    "La vida es un sube y baja (o un elevador) dicen por ahí, pero parece que el mío esta descompuesto porque no sube por mas que intento",
  level: 7,
  xp: 236,
  badgeTitle: "Apilador Perspicaz",
  recentHours: "20.9 h",
  gamesCount: 43,
  badgesCount: 5,
  avatarUrl:
    "https://avatars.cloudflare.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg", // Tu avatar de ejemplo
  badgeIconUrl:
    "https://community.cloudflare.steamstatic.com/public/images/badges/02_xp/25.png", // Icono de la insignia 25+
  recentActivity: [
    {
      id: 550,
      name: "Left 4 Dead 2",
      cover:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/header.jpg",
      hoursTotal: 51,
      lastPlayed: "27 NOV",
      achievements: { unlocked: 25, total: 101 },
    },
    {
      id: 431960,
      name: "Wallpaper Engine",
      cover:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/431960/header.jpg",
      hoursTotal: 532,
      lastPlayed: "24 NOV",
      achievements: { unlocked: 7, total: 17 },
    },
  ],
  badges: [
    "https://community.cloudflare.steamstatic.com/public/images/badges/01_community/community02_54.png",
    "https://community.cloudflare.steamstatic.com/public/images/badges/02_xp/25.png",
    "https://community.cloudflare.steamstatic.com/public/images/badges/13_years/6_54.png",
    "https://community.cloudflare.steamstatic.com/public/images/badges/30_steamawards/2023_nominations_54.png",
  ],
};

export { games, gamesDetails };
