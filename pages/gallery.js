import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GalleryItem } from "@/components/GalleryItem";
import { saveArtSelections, getArtSelections } from "./utils/helpers";
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
  } else {
    item.selected = true;
  }
}

export default function Gallery() {
  const [itemToggled, setItemToggled] = useState("");
  const [ArtSelections, setArtSelections] = useState(Art);
  const router = useRouter();

  useEffect(() => {
    const artSelections = getArtSelections();
    setArtSelections(artSelections);
  }, []);

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;
    toggleArt(ArtSelections, identifier);
    console.log("====> handleItemClick", identifier);
    setItemToggled(identifier);
    saveArtSelections(ArtSelections);
  };

  const handleTrainClick = (e) => {
    console.log("====> handleTrainClick", e);
    router.push("./train");
  };

  const handleLearnClick = (e) => {
    console.log("====> handleLearnClick", e);
  };

  if (!ArtSelections) return null;

  return (
    <div className="flex w-2/4 flex-col">
      <div className="flex justify-between">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleTrainClick}
        >
          Train
        </button>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Learn
        </button>
      </div>
      <div className="flex flex-wrap">
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
