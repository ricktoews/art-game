import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/ArtGame.module.css'

const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

const FRAME_WIDTH = 100;
const FRAME_HEIGHT = 100;

const artworks = [
    { name: 'girl-with-a-pearl-earring.jpeg', mode: 'portrait' },
    { name: 'a-sunday-afternoon-on-the-island-of-la-grande-jatte.jpeg', mode: 'landscape' },
    { name: 'arrangement-in-grey-and-black-no-1.jpeg', mode: 'landscape' },
    { name: 'les-demoiselles-d-avignon.jpeg', mode: 'landscape' },
    { name: 'mona-lisa.jpeg', mode: 'portrait' },
    { name: 'starry-night.jpeg', mode: 'landscape' },
    { name: 'the-arnolfini-portrait.jpeg', mode: 'portrait' },
    { name: 'the-birth-of-venus.jpeg', mode: 'landscape' },
    { name: 'the-garden-of-earthly-delights.jpeg', mode: 'portrait' },
    { name: 'the-kiss.jpeg', mode: 'portrait' }
];

// Helper function
const makeProportionate = (newX, x, y) => { return Math.round(newX / x * y); }


export default function Game() {
    const baseImgStyle = { position: 'relative' };
    const artEl = useRef();
    const [ artworkNdx, setArtworkNdx ] = useState(-1);
    const [ artSpecs, setArtSpecs ] = useState({ height: 0, left: 0 });
    const [ imgStyle, setImgStyle ] = useState({ position: 'relative', maxHeight: 0, maxWidth: 0 });

    const [ artFrame, setArtFrame ] = useState({ height: FRAME_HEIGHT, width: FRAME_WIDTH });

    /*
        Once, at the beginning: Get random image.
    */
    useEffect(() => {
        setArtworkNdx(Math.floor(Math.random() * artworks.length));
    }, []);

    /*
        Once image has been selected.
    */
    useEffect(() => {
        if (artworkNdx > -1) {
            handleImageLoad(artworks[artworkNdx].name);
        }
    }, [artworkNdx]);
    
    /*
        Should be called once the specs change--specifically, the image height.
    */
    useEffect(() => {
        handler();
    }, [artSpecs.height]);
        
    
    // Handler for image load.
    // Sets state, so must be within component.
    const handleImageLoad = (src) => {
        const img = new Image();
        img.src = src;
        img.onload = function(e) {
            const { height, width } = img;
            let adjustedHeight, adjustedWidth;
            if (width > height) {
                adjustedWidth = MAX_WIDTH;
                adjustedHeight = makeProportionate(adjustedWidth, width, height);
            } else {
                adjustedHeight = MAX_HEIGHT;
                adjustedWidth = makeProportionate(adjustedHeight, height, width);
            }
            setImgStyle({ position: 'relative', maxHeight: `${adjustedHeight}px`, maxWidth: `${adjustedWidth}px`});
            setArtSpecs({ height: adjustedHeight, width: adjustedWidth });
        }
    }

    // Random upper left position within image of excerpt square.
    function getRandomPosition(specs) {
        const heightRangeMax = specs.height - artFrame.height;
        const widthRangeMax = specs.width - artFrame.width;
        let randYCoord = Math.floor(Math.random() * heightRangeMax);
        let randXCoord = Math.floor(Math.random() * widthRangeMax);
        return { y: -1*randYCoord, x: -1*randXCoord };
    }

    function updateImgPosition(y, x) {
        setImgStyle({ ...imgStyle, left: `${x}px`, top: `${y}px`});
    }

    function handler() {
        const { y, x } = getRandomPosition(artSpecs);
        updateImgPosition(y, x);
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Art Game</h1>

{ (artworkNdx > -1) && 
            <div>
                <div style={{ overflow: 'hidden', maxHeight: `${artFrame.height}px`, maxWidth: `${artFrame.width}px` }}>
                    <img ref={artEl} src={`./${artworks[artworkNdx].name}`} style={imgStyle} />
                </div>

                <div><input type="text" className={styles.artInput}/></div>
                <button onClick={handler}>Reposition</button>
            </div>
}
        </div>
    )
}