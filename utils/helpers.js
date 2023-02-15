import Art from '@/data/art';

export const FRAME_WIDTH = 100;
export const FRAME_HEIGHT = 100;

export const MAX_WIDTH = 250;
export const MAX_HEIGHT = 250;

// Helper function
export const makeProportionate = (newX, x, y) => {
  return Math.round((newX / x) * y);
};

export function saveArtSelections(ArtSelections) {
  window.localStorage.setItem("art-game", JSON.stringify(ArtSelections));
}

function updateArt(savedArt, loadedArt) {
  const artToAdd = [];
  const artToDelete = [];
  loadedArt.forEach(item => {
    let src = item.src;
    if (!savedArt.find(savedItem => savedItem.src === src)) {
      artToAdd.push(item);
    }
  });
  savedArt.forEach(item => {
    let src = item.src;
    if (!loadedArt.find(loadedItem => loadedItem.src === src)) {
      item.delete = true;
    }
  });
  if (artToAdd.length > 0) {
    savedArt = savedArt.concat(artToAdd); 
  }
  savedArt = savedArt.filter(item => !item.delete);
  saveArtSelections(savedArt);
  console.log('====> updated savedArt', savedArt);
  return savedArt;
}


export function getArtSelections() {
console.log('====> getArtSelections', Art.map(item => item.src));
  let artSelections = window.localStorage.getItem("art-game") || Art;

  try {
    artSelections = JSON.parse(artSelections);
    artSelections = updateArt(artSelections, Art);
  } catch (e) {
    console.log("Error JSON.parse art selection", artSelections);
  }
  console.log('====> returning artSelections', artSelections);
  return artSelections;
}

export function handleImgLoad(src) {
  const img = new Image();
  img.src = src;
  img.onload = function(e) {
      const { height, width } = img;
      let adjustedHeight, adjustedWidth;
      if (width > height) {
          adjustedWidth = MAX_WIDTH;
          adjustedHeight = makeProportionate(adjustedWidth, width, height);
      } else {
          adjustedHeight = MAX_HEIGHT;
          adjustedWidth = makeProportionate(adjustedHeight, height, width);
      }
      
  }
}
