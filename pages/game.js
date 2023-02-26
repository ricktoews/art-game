import { useEffect, useRef, useState } from "react";
import Masthead from "@/components/Masthead";
import Layout from "@/components/Layout";
import {
  MAX_WIDTH,
  MAX_HEIGHT,
  getArtSelections,
  fieldClasses,
  fieldStyle,
} from "@/utils/helpers";

const FRAME_WIDTH = 100;
const FRAME_HEIGHT = 100;

const artworks = [];

// Helper function
const makeProportionate = (newX, x, y) => {
  return Math.round((newX / x) * y);
};

export default function Game() {
  const [ArtSelections, setArtSelections] = useState([]);
  const baseImgStyle = { position: "relative" };
  const artEl = useRef();
  const artFrameRef = useRef(null);
  const [artworkNdx, setArtworkNdx] = useState(-1);
  const [artSpecs, setArtSpecs] = useState({ height: 0, left: 0 });
  const [imgStyle, setImgStyle] = useState({
    position: "relative",
    maxHeight: 0,
    maxWidth: 0,
  });

  const [artFrame, setArtFrame] = useState({
    height: FRAME_HEIGHT,
    width: FRAME_WIDTH,
  });

  /*
        Once, at the beginning: Get random image.
    */
  /*
     useEffect(() => {
         setArtworkNdx(Math.floor(Math.random() * artworks.length));
     }, []);
 */
  useEffect(() => {
    let items = getArtSelections();
    items = items.filter((item) => item.selected);
    items.forEach((item) => {
      artworks.push(item);
    });
    setArtworkNdx(Math.floor(Math.random() * items.length));
    items = items.filter((item) => item.selected);
    setArtSelections(items);
  }, []);

  /*
        Once image has been selected.
    */
  useEffect(() => {
    if (artworkNdx > -1) {
      console.log("====> artwork ndx", artworkNdx, artworks[artworkNdx]);
      handleImageLoad(artworks[artworkNdx].src);
    }
  }, [artworkNdx]);

  /*
        Should be called once the specs change--specifically, the image height.
    */
  useEffect(() => {
    handleReposition();
  }, [artSpecs.height]);

  // Handler for image load.
  // Sets state, so must be within component.
  const handleImageLoad = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = function (e) {
      const { height, width } = img;
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
      setArtSpecs({ height: adjustedHeight, width: adjustedWidth, margin: '20px auto' });
    };
  };

  // Random upper left position within image of excerpt square.
  function getRandomPosition(specs) {
    const heightRangeMax = specs.height - artFrame.height;
    const widthRangeMax = specs.width - artFrame.width;
    let randYCoord = Math.floor(Math.random() * heightRangeMax);
    let randXCoord = Math.floor(Math.random() * widthRangeMax);
    return { y: -1 * randYCoord, x: -1 * randXCoord };
  }

  function updateImgPosition(y, x) {
    setImgStyle({ ...imgStyle, left: `${x}px`, top: `${y}px` });
  }

  function handleInput(e) {
    const el = e.target;
    const val = el.value;
    if (val.toLowerCase() == artworks[artworkNdx].name.toLowerCase()) {
      //artFrameRef.current.style.overflow = 'visible';
      artFrameRef.current.style.maxHeight = '100%';
      artFrameRef.current.style.maxWidth = '100%';
      artEl.current.style.transition = 'top 1s linear, left 1s linear';
      artEl.current.style.top = 0;
      artEl.current.style.left = 0;
    }
  }

  function handleReposition() {
    const { y, x } = getRandomPosition(artSpecs);
    updateImgPosition(y, x);
  }

  if (artworkNdx === -1) return null;

  return (
    <Layout title="Game">
      <div>
        <input
          type="text"
          onInput={handleInput}
          style={fieldStyle}
          className={fieldClasses}
          placeholder="Name of artwork"
        />
      </div>

      <div className="flex flex-col items-center">
        {artworkNdx > -1 && artworks[artworkNdx] && (
          <div>
            <div
              style={{
                ...artSpecs,
                boxShadow: "gray 3px 2px 5px",
              }}
              className="mb-5"
            >
              <div
                ref={artFrameRef}
                style={{
                  overflow: "hidden",
                  maxHeight: `${artFrame.height}px`,
                  maxWidth: `${artFrame.width}px`,
                }}
              >
                <img
                  ref={artEl}
                  src={`./${artworks[artworkNdx].src}`}
                  style={imgStyle}
                />
              </div>
            </div>

            <button className="bg-slate-200 p-2" onClick={handleReposition}>Reposition</button>
          </div>
        )}
      </div>

    </Layout>

  );
}
