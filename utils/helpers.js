import Art from "@/data/art";

export const FRAME_WIDTH = 100;
export const FRAME_HEIGHT = 100;

export const MAX_WIDTH = 250;
export const MAX_HEIGHT = 250;

export const fieldClasses =
  "w-full form-control block px-2 py-1 bg-white focus:text-gray-700 focus:bg-white focus:outline-none";

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

export function handleImgLoad(src) {
  const img = new Image();
  img.src = src;
  img.onload = function (e) {
    const { height, width } = img;
    let adjustedHeight, adjustedWidth;
    if (width > height) {
      adjustedWidth = MAX_WIDTH;
      adjustedHeight = makeProportionate(adjustedWidth, width, height);
    } else {
      adjustedHeight = MAX_HEIGHT;
      adjustedWidth = makeProportionate(adjustedHeight, height, width);
    }
  };
}
