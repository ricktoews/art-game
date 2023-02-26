import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  MAX_HEIGHT,
  MAX_WIDTH
} from '@/utils/constants';
import {
  makeProportionate,
  saveArtSelections,
  getArtSelections,
  fieldClasses,
  fieldStyle,
} from "@/utils/helpers";
import Layout from "@/components/Layout";
import ArtInput from "@/components/ArtInput";

function ArtLabel(props) {
  const { art } = props;
  return (
    <div className="text-sm">
      <div>{art.name}</div>
      <div>{art.artist}</div>
      <div>{art.date}</div>
    </div>
  );
}

function selectArtForTraining(ArtSelections, ndx) {
  const randomArt = ArtSelections[ndx];
  return randomArt;
}

export default function Train() {
  const [ArtSelections, setArtSelections] = useState([]);
  const [trainingNdx, setTrainingNdx] = useState();
  const [trainArt, setTrainArt] = useState(null);
  const [imgStyle, setImgStyle] = useState({});
  const artEl = useRef(null);
  const artNameRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    let items = getArtSelections();
    items = items.filter((item) => item.selected);
    setArtSelections(items);
    setTrainingNdx(0);
  }, []);

  useEffect(() => {
    if (artEl.current) {
      artEl.current.onload = (e) => {
        const { width, height } = artEl.current;
        let adjustedHeight, adjustedWidth;
        if (width > height) {
          adjustedWidth = MAX_WIDTH;
          adjustedHeight = makeProportionate(adjustedWidth, width, height);
        } else {
          adjustedHeight = MAX_HEIGHT;
          adjustedWidth = makeProportionate(adjustedHeight, height, width);
        }
        setImgStyle({
          position: "relative",
          boxShadow: "gray 3px 2px 5px",
          maxHeight: `${adjustedHeight}px`,
          maxWidth: `${adjustedWidth}px`,
        });
      };
      artNameRef.current.style.color = "inherit";
      artNameRef.current.disabled = false;
    }
  }, [trainArt]);

  useEffect(() => {
    if (ArtSelections.length > 0) {
      const randomArt = selectArtForTraining(ArtSelections, trainingNdx);
      if (artNameRef.current) {
        artNameRef.current.value = "";
        artNameRef.current.focus();
      }
      setTrainArt(randomArt);
    }
  }, [trainingNdx]);

  const handleGalleryClick = (e) => {
    router.push("./gallery");
  };

  const handleCorrect = (e) => {
    let ndx = trainingNdx + 1;
    if (ndx >= ArtSelections.length) {
      ndx = 0;
    }
    setTrainingNdx(ndx);
  }

  if (!trainArt) return null;

  return (
    <Layout title="Train">
      <div className="flex flex-col items-center">
        <ArtInput placeholder="Name of artwork" artNameRef={artNameRef} handleCorrect={handleCorrect} art={trainArt} />

        <div style={imgStyle} className="m-3 p-2">
          <img ref={artEl} src={`./${trainArt.src}`} />
        </div>
        <ArtLabel art={trainArt} artNameRef={artNameRef} />

      </div>

    </Layout>
  );
}
