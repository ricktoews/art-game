import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GalleryItem } from "@/components/GalleryItem";
import Masthead from "@/components/Masthead";
import Layout from "@/components/Layout";
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
  } else {
    item.selected = true;
    return true;
  }
}

export default function Gallery() {
  const [itemToggled, setItemToggled] = useState("");
  const [itemToggleState, setItemToggleState] = useState(null);
  const [ArtSelections, setArtSelections] = useState(Art);
  const router = useRouter();

  useEffect(() => {
    const artSelections = getArtSelections();
    setArtSelections(artSelections);
  }, []);

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;
    const setting = toggleArt(ArtSelections, identifier);
    console.log("====> handleItemClick", el, identifier, setting);
    setItemToggleState(setting);
    setItemToggled(identifier);
    saveArtSelections(ArtSelections);
  };

  if (!ArtSelections) return null;

  return (
    <Layout title="Art Gallery">
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
