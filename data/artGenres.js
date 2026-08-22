const titlesByGenre = {
  "Portraits & Figures": [
    "Girl with a Pearl Earring", "Whistler's Mother", "Les Demoiselles d'Avignon",
    "Mona Lisa", "Arnolfini Portrait", "The Kiss", "American Gothic", "Boreas",
    "Flaming June", "Grande Odalisque", "Lady Godiva", "Lady With An Ermine",
    "Las Meninas", "Olympia", "Portrait of Adele Bloch-Bauer", "The Lady of Shalott",
    "The Swing", "Ginevra de’ Benci", "Saint John the Baptist", "Ophelia", "Proserpine",
    "The Scream", "The Blue Boy", "The Toilet of Venus (The Rokeby Venus)",
    "The Two Sisters (Mesdemoiselles Chassériau)",
    "Madame X (Virginie Amélie Avegno Gautreau)",
    "Jean de Dinteville and Georges de Selve (The Ambassadors)",
    "Self-Portrait with Chinese Lantern Plant", "The Kiss"
  ],
  "Landscapes & Seascapes": [
    "The Starry Night", "Almond Blossoms", "Breezing Up (A Fair Wind)",
    "Impression, Sunrise", "Irises", "The Avenue in the Rain", "Wanderer above the Sea of Fog",
    "Wheat Field with Cypresses", "The Storm on the Sea of Galilee", "The Ninth Wave",
    "The Black Sea", "The Little Street", "Garden at Sainte-Adresse",
    "Monet - women-in-the-garden", "Monet - The Magpie", "La Grenouillère",
    "Regatta at Sainte-Adresse", "The Fighting Temeraire",
    "Snow Storm: Steam-Boat off a Harbour's Mouth", "Sunrise with Sea Monsters",
    "Fishermen at Sea", "Monk by the Sea", "The Hunters in the Snow (Winter)",
    "The Sea of Ice", "Rain, Steam, and Speed – The Great Western Railway",
    "Paris Street; Rainy Day", "The Isle of the Dead (Third Version)"
  ],
  "Everyday Life": [
    "A Sunday Afternoon on the Island of La Grande Jatte", "A Bar at the Folies-Bergère",
    "A Cotton Office in New Orleans", "Bal du moulin de la Galette", "Café Terrace at Night",
    "Dance at Bougival", "Le Déjeuner sur l'herbe", "Luncheon of the Boating Party",
    "The Night Café", "The Milkmaid", "The Astronomer",
    "Girl Reading a Letter at an Open Window", "Woman Holding a Balance",
    "Woman in Blue Reading a Letter", "Nighthawks", "The Anatomy Lesson of Dr Nicolaes Tulp",
    "The Merry Family", "The Gleaners", "The Child's Bath", "The Sick Child", "The Cradle",
    "Ball on Shipboard"
  ],
  "Sacred Art": [
    "Annunciation", "Salvator Mundi", "The Last Supper", "Virgin and Child with an Angel",
    "The Resurrection", "The Death of the Virgin", "The-last-supper-leonardo-da-vinci",
    "Benois Madonna", "Adoration of the Magi", "Calling of Saint Matthew",
    "Magdalen with the Smoking Flame"
  ],
  "History, Myth & Allegory": [
    "The Birth of Venus", "The Garden of Earthly Delights", "Dante and Virgil",
    "Liberty Leading the People", "Napoleon Crossing the Alps", "The Night Watch",
    "Oath of the Horatii", "Saturn Devouring His Son", "The Raft of the Medusa",
    "The School of Athens", "The Third of May 1808", "Head of Medusa", "Medusa",
    "The Fortune Teller", "Judith Beheading Holofernes", "The Battle of Trafalgar",
    "Snow Storm, Hannibal and his Army Crossing the Alps", "The Beguiling of Merlin",
    "The Sleep of Reason Produces Monsters", "Portrait of Dr. Samuel D. Gross (The Gross Clinic)",
    "The Horse Fair", "The Tower of Babel", "The Dream", "Ivan the Terrible and His Son Ivan",
    "Guernica"
  ],
  "Still Life": ["Flowers in a Glass Vase", "The ray"],
  "Modern & Abstract": ["Composition 8", "Twittering Machine", "Black Square"]
};

const genreByTitle = Object.fromEntries(
  Object.entries(titlesByGenre).flatMap(([genre, titles]) => titles.map((title) => [title, genre]))
);

export const genreOrder = [
  "Portraits & Figures",
  "Landscapes & Seascapes",
  "Everyday Life",
  "History, Myth & Allegory",
  "Sacred Art",
  "Still Life",
  "Modern & Abstract",
  "Other"
];

export function getArtGenre(artwork) {
  return genreByTitle[artwork.name] || "Other";
}
