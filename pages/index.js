import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GalleryItem } from "@/components/GalleryItem";
import Layout from "@/components/Layout";
import { saveArtSelections, getArtSelections } from "../utils/helpers";
import Art from "@/data/art";

/* Defaults, and functions to check for an empty selection pool and supply the defaults. */
const defaultArt = [
  'The Starry Night',
  'American Gothic',
  'Napoleon Crossing The Alps',
  'The Last Supper',
  'The Night Watch'
];

function isSelectionPoolEmpty(art) {
  const selections = art.filter(item => item.selected);
  const result = selections.length === 0;
  return result;
}

function addDefaultSelections(art, defaultArt) {
  for (let artName of defaultArt) {
    const defaultItem = art.find(item => item.name.toLowerCase() === artName.toLowerCase());
    defaultItem.selected = true;
  }
}
/* End setting defaults if selection pool empty. */


function toggleArt(ArtSelections, identifier) {
  const item = ArtSelections.find((item) => item.name === identifier);

  if (item.selected) {
    delete item.selected;
    return false;
  } else {
    item.selected = true;
    return true;
  }
}

export default function Gallery() {
  const [itemToggled, setItemToggled] = useState("");
  const [toggleState, setToggleState] = useState(null);
  const [ArtSelections, setArtSelections] = useState(Art);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const artSelections = getArtSelections();

    // Set default paintings, to make sure we don't start with an empty selection pool.
    if (isSelectionPoolEmpty(artSelections)) {
      addDefaultSelections(artSelections, defaultArt);
      saveArtSelections(artSelections);
    }

    setArtSelections(artSelections);
  }, []);

  const toggleItemSelect = () => {
    const setting = toggleArt(ArtSelections, popupItem.name);
    setToggleState(setting);
    setItemToggled(popupItem.name);
    saveArtSelections(ArtSelections);
    const item = ArtSelections.find((item) => item.name === popupItem.name);
    setPopupItem(item);
    console.log('====> toggleItemSelect ', popupItem);
  }

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;

    //    const setting = toggleArt(ArtSelections, identifier);
    //    saveArtSelections(ArtSelections);
    const item = ArtSelections.find((item) => item.name === identifier);
    setPopupOpen(true);
    setPopupItem(item);
  };

  if (!ArtSelections) return null;

  return (
    <Layout title="Art Gallery" toggleItemSelect={toggleItemSelect} setPopupOpen={setPopupOpen} popupOpen={popupOpen} popupItem={popupItem}>
      <div className="flex justify-center flex-wrap">
        {ArtSelections.map((item, key) => {
          return (
            <GalleryItem
              handleItemClick={handleItemClick}
              item={item}
              key={key}
              itemkey={key}
            ></GalleryItem>
          );
        })}
      </div>

    </Layout>
  );
}
