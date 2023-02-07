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

export default function Train() {
  const [trainArt, setTrainArt] = useState(null);
  const [refresh, setRefresh] = useState();
  const artEl = useRef();
  const artNameRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const artSelections = getArtSelections();
    const selected = artSelections.filter((item) => item.selected);
    const ndx = Math.floor(Math.random() * selected.length);
    const randomArt = selected[ndx];
    console.log("====> selectedArt", randomArt);
    setTrainArt(randomArt);
    setRefresh(false);
  }, [refresh]);

  const handleGalleryClick = (e) => {
    router.push("./gallery");
  };

  const handleCheckInput = (e) => {
    const el = e.target;
    const entry = el.value;
    if (entry === trainArt.name) {
      setRefresh(true);
    }
    console.log("====> handleCheckInput", entry, trainArt.src);
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
      <div class="relative flex justify-center">
        <div class="mb-3 xl:w-96">
          <label
            for="exampleFormControlInput1"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Copy name of artwork
          </label>
          <input
            ref={artNameRef}
            type="text"
            onBlur={handleCheckInput}
            class="
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
