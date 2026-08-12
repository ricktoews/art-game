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
  },
  {
    src: "virgin-and-child-with-an-angel.jpeg",
    name: "Virgin and Child with an Angel",
    artist: "Sandro Botticelli",
    date: "1475–85",
    location: "Art Institute of Chicago",
    museumId: 80530,
    source: "Art Institute of Chicago",
    isPublicDomain: true
  },
  {
    src: "the-resurrection.jpeg",
    name: "The Resurrection",
    artist: "Cecco del Caravaggio",
    date: "c. 1619-20",
    location: "Art Institute of Chicago",
    museumId: 19336,
    source: "Art Institute of Chicago",
    isPublicDomain: true
  },
  {
    src: "head-of-medusa.jpeg",
    name: "Head of Medusa",
    artist: "Antonio Canova",
    date: "c. 1801",
    location: "Art Institute of Chicago",
    museumId: 160236,
    source: "Art Institute of Chicago",
    isPublicDomain: true
  },
  {
    src: "medusa.jpeg",
    name: "Medusa",
    artist: "Caravaggio",
    date: "1595–1596",
    location: "Uffizi Gallery",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AMedusa_by_Carvaggio.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "death-of-virgin.jpeg",
    name: "The Death of the Virgin",
    artist: "Caravaggio",
    date: "1605-1606",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AMichelangelo_Caravaggio_069.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "fortune-teller.jpeg",
    name: "The Fortune Teller",
    artist: "Caravaggio",
    date: "circa 1594",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AThe_Fortune_Teller-Caravaggio_(Rome).jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "judith-beheading-holofernes.jpeg",
    name: "Judith Beheading Holofernes",
    artist: "Caravaggio",
    date: "circa 1598-1599",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AJudith_Beheading_Holofernes_by_Caravaggio.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "ninth-wave.jpeg",
    name: "The Ninth Wave",
    artist: "Ivan Aivazovsky",
    date: "1850",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AIvan_Constantinovich_Aivazovsky_-_The_Ninth_Wave_(detail).JPG",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "black-sea.jpeg",
    name: "The Black Sea",
    artist: "Ivan Aivazovsky",
    date: "1881",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AAivazovsky_-_The_Black_Sea.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "milkmaid.jpeg",
    name: "The Milkmaid",
    artist: "Johannes Vermeer",
    date: "circa 1658",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AVermeer%2C_Johannes_-_The_Milkmaid%2C_detail_table_-_c._1658.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "astronomer.jpeg",
    name: "The Astronomer",
    artist: "Johannes Vermeer",
    date: "circa 1668",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AJan_Vermeer_-_The_Astronomer.JPG",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "little-street.jpeg",
    name: "The Little Street",
    artist: "Johannes Vermeer",
    date: "between 1657 and 1658",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AJohannes_Vermeer_-_The_Little_Street_-_WGA24617.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "girl-reading-letter-at-open-window.jpeg",
    name: "Girl Reading a Letter at an Open Window",
    artist: "Johannes Vermeer",
    date: "circa 1657",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AJohannes_Vermeer_-_Girl_Reading_a_Letter_at_an_Open_Window_-_WGA24614.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "woman-holding-balance.jpeg",
    name: "Woman Holding a Balance",
    artist: "Johannes Vermeer",
    date: "circa 1665",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AJan_Vermeer_van_Delft_015.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "woman-in-blue-reading-letter.jpeg",
    name: "Woman in Blue Reading a Letter",
    artist: "Johannes Vermeer",
    date: "between 1663 and 1664",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AJohannes_Vermeer_-_Woman_in_Blue_Reading_a_Letter_-_WGA24657.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "last-supper-leonardo-da-vinci.jpeg",
    name: "The-last-supper-leonardo-da-vinci",
    artist: "Leonardo da Vinci",
    date: "2014-06-06 09:51:25",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AThe-last-supper-leonardo-da-vinci.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "ginevra-de-benci.jpeg",
    name: "Ginevra de’ Benci",
    artist: "Leonardo da Vinci",
    date: "1474-1478",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3AGinevra_de'_Benci_by_Leonardo_da_Vinci.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "benois-madonna.jpeg",
    name: "Benois Madonna",
    artist: "Leonardo da Vinci",
    date: "between 1478 and 1480",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3ALeonardo_da_Vinci_Benois_Madonna.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "saint-john-baptist.jpeg",
    name: "Saint John the Baptist",
    artist: "Leonardo da Vinci",
    date: "from 1513 until 1516",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3ALeonardo_da_Vinci_-_Saint_John_the_Baptist_C2RMF_retouched.jpg",
    license: "Public domain",
    isPublicDomain: true
  },
  {
    src: "adoration-of-magi.jpeg",
    name: "Adoration of the Magi",
    artist: "Leonardo da Vinci",
    date: "from 1480 until 1482",
    location: "",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File%3ALeonardo_da_Vinci_-_Adorazione_dei_Magi_-_Google_Art_Project.jpg",
    license: "Public domain",
    isPublicDomain: true
  }
];

export default artwork;
