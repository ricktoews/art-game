import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GalleryItem } from "@/components/GalleryItem";
import { saveArtSelections, getArtSelections } from "../utils/helpers";
import styles from "@/styles/ArtGame.module.css";
import Art from "@/data/art";
console.log(Art);
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

const selectedArt = {};

function toggleArt(ArtSelections, identifier) {
  const item = ArtSelections.find((item) => item.name === identifier);

  if (item.selected) {
    delete item.selected;
    return false;
  }

  else {
    item.selected = true;
    return true;
  }
}

export default function Gallery() {
  const [itemToggled, setItemToggled] = useState("");
  const [itemToggleState, setItemToggleState] = useState(null);
  const [ArtSelections, setArtSelections] = useState(Art);
  const router = useRouter();
  const menuOptionsRef = useRef(null);

  useEffect(() => {
    const artSelections = getArtSelections();
    setArtSelections(artSelections);
  }, []);

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;
    const setting = toggleArt(ArtSelections, identifier);
    console.log("====> handleItemClick", identifier), setting;
    setItemToggleState(setting);
    setItemToggled(identifier);
    saveArtSelections(ArtSelections);
  };

  const handleMenuClick = (e) => {
    if (menuOptionsRef.current) {
      console.log('====> menu options state', menuOptionsRef.current.style.display)
      let currentState = menuOptionsRef.current.style.display === 'none' ? 0 : 1;
      if (currentState) {
        menuOptionsRef.current.style.display = 'none';
      } else {
        menuOptionsRef.current.style.display = 'block';
      }
    }
  };

  if (!ArtSelections) return null;

  return (
    <div className="relative bg-white text-black">

      <div onClick={handleMenuClick} className="fixed cursor-pointer p-1.5 z-10 flex flex-col justify-center items-center rounded-full top-1 left-1 w-9 h-9 bg-white">
        <svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="15" rx="10"></rect>
          <rect y="30" width="80" height="15" rx="10"></rect>
          <rect y="60" width="100" height="15" rx="10"></rect>
        </svg>
      </div>

      <div ref={menuOptionsRef} className="fixed hidden left-2 top-10 bg-white text-black">
        <div className="flex flex-col justify-around">
          <div><a href="./train">Train</a></div>
          <div><a href="./quiz">Quiz</a></div>
        </div>
      </div>

      <div style={{ marginLeft: '50px' }} className="flex justify-center flex-wrap">
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
    </div>
  );
}
