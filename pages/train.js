import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { saveArtSelections, getArtSelections } from "../utils/helpers";


function ArtLabel(props) {
  const { art } = props;
  return (
    <div className="absolute bg-white border-black p-3">
      <div className="text-black">{art.name}</div>
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

  const handleCheckInput = (e) => {
    e.preventDefault();
    const el = e.target;
    const entry = el.value;
    if (entry === trainArt.name) {
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
      <div className="relative flex justify-center">
        <div className="mb-3 xl:w-96">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Copy name of artwork
          </label>
          <input
            ref={artNameRef}
            autoComplete="off"
            type="text"
            onBlur={handleCheckInput}
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlInput1"
            placeholder="Name of artwork"
          />
        </div>
      </div>
      <div className="relative flex flex-wrap">
        <ArtLabel art={trainArt} />
        <div>
          <img ref={artEl} src={`./${trainArt.src}`} />
        </div>
      </div>
    </div>
  );
}
