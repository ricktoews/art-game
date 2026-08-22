import { getArtMovement } from "@/data/artMovements";

export const styleOrder = [
  "Detailed & Realistic",
  "Painterly & Atmospheric",
  "Decorative & Ornamental",
  "Dreamlike & Distorted",
  "Shapes & Geometry",
  "Minimal & Mysterious"
];

const styleByMovement = {
  "Academic Art": "Detailed & Realistic",
  "Aestheticism": "Minimal & Mysterious",
  "American Realism": "Detailed & Realistic",
  "American Regionalism": "Detailed & Realistic",
  "Art Nouveau / Vienna Secession": "Decorative & Ornamental",
  "Baroque": "Detailed & Realistic",
  "Dutch Golden Age": "Detailed & Realistic",
  "Early Renaissance": "Decorative & Ornamental",
  "High Renaissance": "Detailed & Realistic",
  "Impressionism": "Painterly & Atmospheric",
  "Naïve Art / Post-Impressionism": "Dreamlike & Distorted",
  "Neoclassicism": "Detailed & Realistic",
  "Northern Renaissance": "Detailed & Realistic",
  "Pre-Raphaelite": "Decorative & Ornamental",
  "Realism": "Detailed & Realistic",
  "Realism / Impressionism": "Painterly & Atmospheric",
  "Rococo": "Decorative & Ornamental",
  "Romanticism": "Painterly & Atmospheric",
  "Symbolism": "Dreamlike & Distorted",
  "Abstract Art": "Shapes & Geometry",
  "Suprematism": "Shapes & Geometry",
  "Expressionism": "Dreamlike & Distorted",
  "Post-Impressionism": "Painterly & Atmospheric"
};

const styleOverrides = {
  "The Garden of Earthly Delights": "Dreamlike & Distorted",
  "Les Demoiselles d'Avignon": "Dreamlike & Distorted",
  "Guernica": "Dreamlike & Distorted",
  "Saturn Devouring His Son": "Dreamlike & Distorted",
  "The Sleep of Reason Produces Monsters": "Dreamlike & Distorted",
  "The Birth of Venus": "Decorative & Ornamental",
  "Composition 8": "Shapes & Geometry",
  "Twittering Machine": "Shapes & Geometry",
  "Black Square": "Shapes & Geometry",
  "Monk by the Sea": "Minimal & Mysterious",
  "The Sea of Ice": "Minimal & Mysterious",
  "Wanderer above the Sea of Fog": "Minimal & Mysterious",
  "Nighthawks": "Minimal & Mysterious",
  "The Little Street": "Minimal & Mysterious",
  "The Isle of the Dead (Third Version)": "Minimal & Mysterious",
  "The Scream": "Dreamlike & Distorted",
  "Gustav Klimt|The Kiss": "Decorative & Ornamental",
  "Edvard Munch|The Kiss": "Dreamlike & Distorted"
};

export function getArtStyle(artwork) {
  return styleOverrides[`${artwork.artist}|${artwork.name}`] || styleOverrides[artwork.name] || styleByMovement[getArtMovement(artwork)] || "Detailed & Realistic";
}
