import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  makeProportionate,
  saveArtSelections,
  getArtSelections,
  fieldClasses,
} from "../utils/helpers";
import NavMenu from "@/components/NavMenu";
const CORRECT_COLOR = "green";

function fixString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
function isAnswerCorrect(actual, expected) {
  let result = false;
  if (actual && expected) {
    result = fixString(actual) === fixString(expected);
  }
  return result;
}

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
      artArtistRef.current.style.color = "inherit";
      artArtistRef.current.disabled = false;
      artDateRef.current.style.color = "inherit";
      artDateRef.current.disabled = false;
    }
  }, [trainArt]);

  useEffect(() => {
    if (ArtSelections.length > 0) {
      const randomArt = selectArtForTraining(ArtSelections, trainingNdx);
      if (artNameRef.current) {
        artNameRef.current.value = "";
        artArtistRef.current.value = "";
        artDateRef.current.value = "";
        artNameRef.current.focus();
      }
      setTrainArt(randomArt);
    }
  }, [trainingNdx]);

  const handleGalleryClick = (e) => {
    router.push("./gallery");
  };

  const fieldsToCheck = ["name", "artist", "date"];
  const correct = {};
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
        correct[item] = true;
        count++;
        if (item === "name") {
          artNameRef.current.style.color = CORRECT_COLOR;
          artNameRef.current.disabled = true;
        }
        if (item === "artist") {
          artArtistRef.current.style.color = CORRECT_COLOR;
          artArtistRef.current.disabled = true;
        }
        if (item === "date") {
          artDateRef.current.style.color = CORRECT_COLOR;
          artDateRef.current.disabled = true;
        }
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

  if (!trainArt) return null;

  return (
    <div className="bg-white text-black">
      <NavMenu />
      <div className="ml-[50px] flex flex-col items-center">
        <div className="text-[24pt] mb-5">Train</div>

        <div className="flex flex-col items-center">
          <div style={imgStyle} className="m-3 p-2">
            <img ref={artEl} src={`./${trainArt.src}`} />
          </div>
          <ArtLabel art={trainArt} />

          <div className="mb-3 xl:w-96">
            <input
              ref={artNameRef}
              autoComplete="off"
              type="text"
              data-fieldname="name"
              onInput={handleCheckField}
              style={{ borderBottom: "1px solid gray" }}
              className={fieldClasses}
              placeholder="Name of artwork"
            />
            <input
              ref={artArtistRef}
              autoComplete="off"
              type="text"
              data-fieldname="artist"
              onInput={handleCheckField}
              style={{ borderBottom: "1px solid gray" }}
              className={fieldClasses}
              placeholder="Artist"
            />
            <input
              ref={artDateRef}
              autoComplete="off"
              type="text"
              data-fieldname="date"
              onInput={handleCheckField}
              style={{ borderBottom: "1px solid gray" }}
              className={fieldClasses}
              placeholder="Date"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
