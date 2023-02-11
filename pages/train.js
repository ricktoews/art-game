import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MAX_HEIGHT, MAX_WIDTH, makeProportionate, saveArtSelections, getArtSelections } from "../utils/helpers";
import { Artifika } from "@next/font/google";


function ArtLabel(props) {
  const { art } = props;
  return (
    <div className="relative z-10 bg-transparent border-black p-3">
      <div className="text-white">{art.name}</div>
      <div className="text-white">{art.artist}</div>
      <div className="text-white">{art.date}</div>
    </div>
  );
}

function selectArtForTraining(ArtSelections, ndx) {
  const randomArt = ArtSelections[ndx];
  console.log('====> Random art', randomArt, ndx);
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
    items = items.filter(item => item.selected);
    setArtSelections(items);
    setTrainingNdx(0);
  }, []);

  useEffect(() => {
    if (artEl.current) {
      artEl.current.onload = e => {
        console.log('====> artEl.current (onload)', artEl.current.width);
        const { width, height } = artEl.current;
        let adjustedHeight, adjustedWidth;
        if (width > height) {
            adjustedWidth = MAX_WIDTH;
            adjustedHeight = makeProportionate(adjustedWidth, width, height);
        } else {
            adjustedHeight = MAX_HEIGHT;
            adjustedWidth = makeProportionate(adjustedHeight, height, width);
        }
        setImgStyle({ position: 'relative', maxHeight: `${adjustedHeight}px`, maxWidth: `${adjustedWidth}px`});
  }
    }
  }, [trainArt]);

  useEffect(() => { 
    if (ArtSelections.length > 0) {
      const randomArt = selectArtForTraining(ArtSelections, trainingNdx);
      if (artNameRef.current) {
        let artField = artNameRef.current;
        artField.value = '';
        artField.focus();
      }
      setTrainArt(randomArt);
    }
  }, [trainingNdx]);

  const handleGalleryClick = (e) => {
    router.push("./gallery");
  };

  const handleCheckField = (e) => {
    e.preventDefault();
    const el = e.target;
    const entry = el.value;
    const field = el.dataset.fieldname;
    if (entry === trainArt[field] && field === 'artist') {
      let ndx = trainingNdx + 1;
      if (ndx >= ArtSelections.length) {
        ndx = 0;
      }
      setTrainingNdx(ndx);
    }
  };

  if (!trainArt) return null;


  
  return (
    <div className="flex w-2/4 flex-col">
      <div className="flex justify-between">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleGalleryClick}
        >
          Gallery
        </button>
      </div>
      <div className="relative flex flex-wrap">
        <ArtLabel art={trainArt} />
        <div style={imgStyle}>
          <img ref={artEl} src={`./${trainArt.src}`} />
        </div>
      </div>

      <div className="relative flex">
        <div className="mb-3 xl:w-96">
          <label htmlFor="exampleFormControlInput1"
            className="form-label inline-block mb-2 text-gray-700">
            Copy name of artwork
          </label>
          <input
            ref={artNameRef}
            autoComplete="off"
            type="text"
            data-fieldname="name"
            onInput={handleCheckField}
            className="form-control block px-3 py-1.5 bg-white border border-solid border-gray-300 rounded 
        focus:text-gray-700 focus:bg-white focus:outline-none"
            placeholder="Name of artwork"
          />
          <input
            autoComplete="off"
            type="text"
            data-fieldname="artist"
            onInput={handleCheckField}
            className="form-control block px-3 py-1.5 bg-white border border-solid border-gray-300 rounded 
        focus:text-gray-700 focus:bg-white focus:outline-none"
            placeholder="Artist"
          />
          <input
            autoComplete="off"
            type="text"
            data-fieldname="date"
            onInput={handleCheckField}
            className="form-control block px-3 py-1.5 bg-white border border-solid border-gray-300 rounded 
        focus:text-gray-700 focus:bg-white focus:outline-none"
            placeholder="Gallery"
          />
        </div>
      </div>
    </div>
  );
}
