const artwork = [
  {
    src: "girl-with-a-pearl-earring.jpeg",
    name: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    date: "1665",
    location: "Mauritshuis"
  },
  {
    src: "a-sunday-afternoon-on-the-island-of-la-grande-jatte.jpeg",
    name: "A Sunday Afternoon on the Island of La Grande Jatte",
    artist: "Georges Seurat",
    date: "1886",
    location: "Art Institute of Chicago"
  },
  {
    src: "arrangement-in-grey-and-black-no-1.jpeg",
    name: "Whistler's Mother",
    artist: "James Abbott McNeill Whistler",
    date: "1871",
    location: "Musée d'Orsay"
  },
  {
    src: "les-demoiselles-d-avignon.jpeg",
    name: "Les Demoiselles d'Avignon",
    artist: "Pablo Picasso",
    date: "1907",
    location: "Museum of Modern Art"
  },
  {
    src: "mona-lisa.jpeg",
    name: "Mona Lisa",
    artist: "Leonardo da Vinci",
    date: "1503",
    location: "Louvre Museum"
  },
  {
    src: "starry-night.jpeg",
    name: "The Starry Night",
    artist: "Vincent van Gogh",
    date: "1889",
    location: "Museum of Modern Art"
  },
  {
    src: "the-arnolfini-portrait.jpeg",
    name: "Arnolfini Portrait",
    artist: "Jan van Eyck",
    date: "1434",
    location: "National Gallery"
  },
  {
    src: "the-birth-of-venus.jpeg",
    name: "The Birth of Venus",
    artist: "Sandro Botticelli",
    date: "1486",
    location: "Uffizi Gallery"
  },
  {
    src: "the-garden-of-earthly-delights.jpeg",
    name: "The Garden of Earthly Delights",
    artist: "Hieronymus Bosch",
    date: "1515",
    location: "Museo Nacional del Prado"
  },
  {
    src: "the-kiss.jpeg",
    name: "The Kiss",
    artist: "Gustav Klimt",
    date: "1908",
    location: "Austrian Gallery Belvedere"
  },
  {
    src: "a-bar-at-the-folies-bergere.jpeg",
    name: "A Bar at the Folies-Bergère",
    artist: "Édouard Manet",
    date: "1882",
    location: "The Courtauld Gallery"
  },
  {
    src: "a-cotton-office-in-new-orleans.jpeg",
    name: "A Cotton Office in New Orleans",
    artist: "Edgar Degas",
    date: "1873",
    location: "Musée des beaux-arts de Pau"
  },
  {
    src: "almond-blossoms.jpeg",
    name: "Almond Blossoms",
    artist: "Vincent van Gogh",
    date: "1890",
    location: "Van Gogh Museum"
  },
  {
    src: "american-gothic.jpeg",
    name: "American Gothic",
    artist: "Grant Wood",
    date: "1930",
    location: "School of the Art Institute of Chicago"
  },
  {
    src: "annunciation.jpeg",
    name: "Annunciation",
    artist: "Leonardo da Vinci",
    date: "1472",
    location: "Uffizi Gallery"
  },
  {
    src: "bal-du-moulin-de-la-galette.jpeg",
    name: "Bal du moulin de la Galette",
    artist: "Pierre-Auguste Renoir",
    date: "1876",
    location: "Musée d'Orsay"
  },
  {
    src: "boreas.jpeg",
    name: "Boreas",
    artist: "John William Waterhouse",
    date: "1903",
    location: "Private"
  },
  {
    src: "breezing-up.jpeg",
    name: "Breezing Up (A Fair Wind)",
    artist: "Winslow Homer",
    date: "1873–1876",
    location: ""
  },
  {
    src: "cafe-terrace-at-night.jpeg",
    name: "Café Terrace at Night",
    artist: "Vincent van Gogh",
    date: "1888",
    location: ""
  },
  {
    src: "composition-8.jpeg",
    name: "Composition 8",
    artist: "Wassily Kandinsky",
    date: "1923",
    location: ""
  },
  {
    src: "dance-at-bougival.jpeg",
    name: "Dance at Bougival",
    artist: "Pierre-Auguste Renoir",
    date: "1883",
    location: ""
  },
  {
    src: "dante-and-virgile.jpeg",
    name: "Dante and Virgil",
    artist: "William-Adolphe Bouguereau",
    date: "1850",
    location: ""
  },
  {
    src: "flaming-june.jpeg",
    name: "Flaming June",
    artist: "Frederic Leighton",
    date: "1895",
    location: ""
  },
  {
    src: "grande-odalisque.jpeg",
    name: "Grande Odalisque",
    artist: "Jean Auguste Dominique Ingres",
    date: "1814",
    location: ""
  },
  {
    src: "impression-sunrise.jpeg",
    name: "Impression, Sunrise",
    artist: "Claude Monet",
    date: "1872",
    location: ""
  },
  {
    src: "irises.jpeg",
    name: "Irises",
    artist: "Vincent van Gogh",
    date: "1889",
    location: ""
  },
  {
    src: "lady-godiva.jpeg",
    name: "Lady Godiva",
    artist: "John Collier",
    date: "1898",
    location: ""
  },
  {
    src: "lady-with-an-ermine.jpeg",
    name: "Lady With An Ermine",
    artist: "Leonardo da Vinci",
    date: "1489",
    location: ""
  },
  {
    src: "las-meninas.jpeg",
    name: "Las Meninas",
    artist: "Diego Velázquez",
    date: "1656",
    location: ""
  },
  {
    src: "le-dejeuner-sur-l-herbe.jpeg",
    name: "Le Déjeuner sur l'herbe",
    artist: "Édouard Manet",
    date: "1862–1863",
    location: ""
  },
  {
    src: "liberty-leading-the-people.jpeg",
    name: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    date: "1830",
    location: ""
  },
  {
    src: "luncheon-of-the-boarding-party.jpeg",
    name: "Luncheon of the Boating Party",
    artist: "Pierre-Auguste Renoir",
    date: "1880–1881",
    location: ""
  },
  {
    src: "napoleon-crossing-the-alps.jpeg",
    name: "Napoleon Crossing the Alps",
    artist: "Jacques-Louis David",
    date: "1801–1805",
    location: ""
  },
  {
    src: "night-watch.jpeg",
    name: "The Night Watch",
    artist: "Rembrandt",
    date: "1642",
    location: ""
  },
  {
    src: "oath-of-the-horatii.jpeg",
    name: "Oath of the Horatii",
    artist: "Jacques-Louis David",
    date: "1784",
    location: ""
  },
  {
    src: "olympia.jpeg",
    name: "Olympia",
    artist: "Édouard Manet",
    date: "1863",
    location: ""
  },
  {
    src: "portrait-of-adele-bloch-bauer.jpeg",
    name: "Portrait of Adele Bloch-Bauer",
    artist: "Gustav Klimt",
    date: "1903–1907",
    location: ""
  },
  {
    src: "salvator-mundi.jpeg",
    name: "Salvator Mundi",
    artist: "Leonardo da Vinci",
    date: "1490–1500",
    location: ""
  },
  {
    src: "saturn-devouring-his-son.jpeg",
    name: "Saturn Devouring His Son",
    artist: "Francisco Goya",
    date: "1819–1823",
    location: ""
  },
  {
    src: "the-astronomer.jpeg",
    name: "The Astronomer",
    artist: "Johannes Vermeer",
    date: "1668",
    location: ""
  },
  {
    src: "the-avenue-in-the-rain.jpeg",
    name: "The Avenue in the Rain",
    artist: "Childe Hassam",
    date: "1917",
    location: ""
  },
  {
    src: "the-lady-of-shalott.jpeg",
    name: "The Lady of Shalott",
    artist: "John William Waterhouse",
    date: "1888",
    location: ""
  },
  {
    src: "the-last-supper.jpeg",
    name: "The Last Supper",
    artist: "Leonardo da Vinci",
    date: "1495–1498",
    location: ""
  },
  {
    src: "the-night-cafe.jpeg",
    name: "The Night Café",
    artist: "Vincent van Gogh",
    date: "1888",
    location: ""
  },
  {
    src: "the-raft-of-the-medusa.jpeg",
    name: "The Raft of the Medusa",
    artist: "Théodore Géricault",
    date: "1818–1819",
    location: ""
  },
  {
    src: "the-school-of-athens.jpeg",
    name: "The School of Athens",
    artist: "Raphael",
    date: "1509-1511",
    location: ""
  },
  {
    src: "the-storm-on-the-sea-of-galilee.jpeg",
    name: "The Storm on the Sea of Galilee",
    artist: "Rembrandt",
    date: "1633",
    location: ""
  },
  {
    src: "the-swing.jpeg",
    name: "The Swing",
    artist: "Jean-Honoré Fragonard",
    date: "1767",
    location: ""
  },
  {
    src: "the-third-of-may-1808.jpeg",
    name: "The Third of May 1808",
    artist: "Francisco Goya",
    date: "1814",
    location: ""
  },
  {
    src: "wanderer-above-the-sea-of-fog.jpeg",
    name: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    date: "1818",
    location: ""
  },
  {
    src: "wheat-field-with-cypresses.jpeg",
    name: "Wheat Field with Cypresses",
    artist: "Vincent van Gogh",
    date: "1889",
    location: ""
  }
];

export default artwork;
