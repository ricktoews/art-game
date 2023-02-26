import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  MAX_HEIGHT,
  MAX_WIDTH
} from '@/utils/constants';
import {
  isAnswerCorrect,
  makeProportionate,
  saveArtSelections,
  getArtSelections,
  fieldClasses,
  fieldStyle,
} from "@/utils/helpers";
import Layout from "@/components/Layout";
import ArtInput from "@/components/ArtInput";


function selectArtForTraining(ArtSelections, ndx) {
  const randomArt = ArtSelections[ndx];
  console.log("====> Random art", randomArt, ndx);
  return randomArt;
}

export default function Quiz() {
  const [ArtSelections, setArtSelections] = useState([]);
  const [trainingNdx, setTrainingNdx] = useState();
  const [trainArt, setTrainArt] = useState(null);
  const [imgStyle, setImgStyle] = useState({});
  const artEl = useRef(null);
  const artNameRef = useRef(null);
  const artArtistRef = useRef(null);
  const artDateRef = useRef(null);
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
        console.log("====> artEl.current (onload)", artEl.current.width);
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
    }
  }, [trainArt]);

  useEffect(() => {
    if (ArtSelections.length > 0) {
      const randomArt = selectArtForTraining(ArtSelections, trainingNdx);
      if (artNameRef.current) {
        artNameRef.current.value = "";
        /*
        artArtistRef.current.value = "";
        artDateRef.current.value = "";
        */
        artNameRef.current.focus();
      }
      setTrainArt(randomArt);
    }
  }, [trainingNdx]);

  const handleGalleryClick = (e) => {
    router.push("./gallery");
  };

  const fieldsToCheck = ["name"/*, "artist", "date"*/];
  const answers = {};
  const handleCheckField = (e) => {
    e.preventDefault();
    const el = e.target;
    const entry = el.value;
    const field = el.dataset.fieldname;
    answers[field] = entry;
    let count = 0;
    fieldsToCheck.forEach((item) => {
      // Is field correct?
      if (isAnswerCorrect(answers[item], trainArt[item])) {
        count++;
      }
    });

    // If all fields have been entered, check them.
    if (count === fieldsToCheck.length) {
      let ndx = trainingNdx + 1;
      if (ndx >= ArtSelections.length) {
        ndx = 0;
      }
      setTrainingNdx(ndx);
    }
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

    <Layout title="Quiz">
      <div className="flex flex-col items-center">
        <ArtInput placeholder="Name of artwork quiz" artNameRef={artNameRef} handleCorrect={handleCorrect} art={trainArt} />

        <div style={imgStyle} className="">
          <img ref={artEl} src={`./${trainArt.src}`} />
        </div>

      </div>

    </Layout>
  );
}
