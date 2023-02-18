import Art from "@/data/art";

export const FRAME_WIDTH = 100;
export const FRAME_HEIGHT = 100;

export const MAX_WIDTH = 250;
export const MAX_HEIGHT = 250;

export const fieldClasses =
  "w-full form-control block px-2 py-1 bg-white focus:text-gray-700 focus:bg-white focus:outline-none";
export const fieldStyle = { fontSize: "18pt", borderBottom: "1px solid gray", marginBottom: "16px" };

// Helper function
export const makeProportionate = (newX, x, y) => {
  return Math.round((newX / x) * y);
};

export function saveArtSelections(ArtSelections) {
  window.localStorage.setItem("art-game", JSON.stringify(ArtSelections));
}

function updateArt(savedArt, loadedArt) {
  const artToAdd = [];

  // Update saved art; note new art pieces to be added.
  loadedArt.forEach((item) => {
    let src = item.src;
    let currentArt = savedArt.find((savedItem) => savedItem.src === src);
    if (!currentArt) {
      artToAdd.push(item);
    } else {
      currentArt.name = item.name;
      currentArt.artist = item.artist;
      currentArt.date = item.date;
    }
  });

  // Delete art no longer in collection.
  savedArt.forEach((item) => {
    let src = item.src;
    if (!loadedArt.find((loadedItem) => loadedItem.src === src)) {
      item.delete = true;
    }
  });
  savedArt = savedArt.filter((item) => !item.delete);

  // Add new art pieces previously noted.
  if (artToAdd.length > 0) {
    savedArt = savedArt.concat(artToAdd);
  }

  saveArtSelections(savedArt);

  return savedArt;
}

export function getArtSelections() {
  let selections = window.localStorage.getItem("art-game") || "";
  let updatedArt = [];
  try {
    selections = JSON.parse(selections);
  } catch (e) {
    console.log("Error JSON.parse art selection", updatedArt);
    selections = [];
  }
  updatedArt = updateArt(selections, Art);

  return updatedArt;
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
