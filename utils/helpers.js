import Art from "@/data/art";
import { MAX_WIDTH, MAX_HEIGHT } from './constants';

export const fieldClasses =
  "w-full form-control block px-2 py-1 bg-white focus:text-gray-700 focus:bg-white focus:outline-none";
export const fieldStyle = { fontSize: "18pt", borderBottom: "1px solid gray", marginBottom: "16px", outline: "none" };

export function fixString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function isAnswerCorrect(actual, expected) {
  let result = false;
  if (actual && expected) {
    result = fixString(actual) === fixString(expected);
  }
  return result;
}


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
    const filename = item.src.split("/").pop();
    let currentArt = savedArt.find(
      (savedItem) =>
        savedItem.src === item.src ||
        savedItem.src?.split("/").pop() === filename
    );
    if (!currentArt) {
      artToAdd.push(item);
    } else {
      currentArt.src = item.src;
      currentArt.name = item.name;
      currentArt.artist = item.artist;
      currentArt.date = item.date;
      currentArt.location = item.location;
      currentArt.source = item.source;
      currentArt.sourceUrl = item.sourceUrl;
      currentArt.license = item.license;
      currentArt.isPublicDomain = item.isPublicDomain;
      if (item.museumId) {
        currentArt.museumId = item.museumId;
      } else {
        delete currentArt.museumId;
      }
    }
  });

  // Delete art no longer in collection.
  savedArt.forEach((item) => {
    const filename = item.src?.split("/").pop();
    if (
      !loadedArt.find(
        (loadedItem) => loadedItem.src?.split("/").pop() === filename
      )
    ) {
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


function makeNameSortable(n = "") {
  const nameParts = n.split(' ');
  let last = nameParts.pop();
  if (last.indexOf("'") !== -1) {
    last = last.substring(last.indexOf("'") + 1);
  }
  const rest = nameParts.join(' ');
  const sortableName = `${last}, ${rest}`;
  return sortableName;
}

function _sortByArtist(a, b) {
  const aArtist = makeNameSortable(a.artist);
  const bArtist = makeNameSortable(b.artist);
  return `${aArtist}:${a.name}`.localeCompare(`${bArtist}:${b.name}`, undefined, {
    sensitivity: "base",
  });
}


export function sortGallery(art) {
  return [...art].sort(_sortByArtist);
}
