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
    zise: { size: 10, type: "GB"},
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
    features: [
      "Prueba",
      "No es un juego",
      "Something in the way",
    ],
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

export { games, gamesDetails };
