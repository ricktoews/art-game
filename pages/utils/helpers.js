export const FRAME_WIDTH = 100;
export const FRAME_HEIGHT = 100;

export const MAX_WIDTH = 400;
export const MAX_HEIGHT = 400;

// Helper function
export const makeProportionate = (newX, x, y) => {
  return Math.round((newX / x) * y);
};

export function saveArtSelections(ArtSelections) {
  window.localStorage.setItem("art-game", JSON.stringify(ArtSelections));
}

export function getArtSelections() {
  let artSelections = window.localStorage.getItem("art-game") || Art;

  try {
    artSelections = JSON.parse(artSelections);
  } catch (e) {
    console.log("Error JSON.parse art selection", artSelections);
  }
  return artSelections;
}
