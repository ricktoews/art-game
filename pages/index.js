import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GalleryItem } from "@/components/GalleryItem";
import Layout from "@/components/Layout";
import { saveArtSelections, getArtSelections } from "../utils/helpers";
import Art from "@/data/art";
console.log(Art);

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
    setArtSelections(artSelections);
  }, []);

  const toggleItemSelect = () => {
    const setting = toggleArt(ArtSelections, popupItem.name);
    setToggleState(setting);
    setItemToggled(popupItem.name);
    saveArtSelections(ArtSelections);
    console.log('====> toggleItemSelect ', popupItem);
  }

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;

//    const setting = toggleArt(ArtSelections, identifier);
    saveArtSelections(ArtSelections);
console.log('====> handleItemClick identifier', identifier);
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
