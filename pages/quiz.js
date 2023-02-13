import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MAX_HEIGHT, MAX_WIDTH, makeProportionate, saveArtSelections, getArtSelections } from "../utils/helpers";
import NavMenu from "@/components/NavMenu";
import { Artifika } from "@next/font/google";


function isAnswerCorrect(actual, expected) {
    console.log('====> isAnswerCorrect', actual, expected);
    let result = false;
    if (actual && expected) {
        result = actual.toLowerCase() === expected.toLowerCase();
    }
    return result;
}

function selectArtForTraining(ArtSelections, ndx) {
    const randomArt = ArtSelections[ndx];
    console.log('====> Random art', randomArt, ndx);
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
                setImgStyle({ position: 'relative', maxHeight: `${adjustedHeight}px`, maxWidth: `${adjustedWidth}px` });
            }
        }
    }, [trainArt]);

    useEffect(() => {
        if (ArtSelections.length > 0) {
            const randomArt = selectArtForTraining(ArtSelections, trainingNdx);
            if (artNameRef.current) {
                artNameRef.current.value = '';
                artArtistRef.current.value = '';
                artDateRef.current.value = '';
                artNameRef.current.focus();
            }
            setTrainArt(randomArt);
        }
    }, [trainingNdx]);

    const handleGalleryClick = (e) => {
        router.push("./gallery");
    };

    const fieldsToCheck = ['name', 'artist', 'date'];
    const answers = {};
    const handleCheckField = (e) => {
        e.preventDefault();
        const el = e.target;
        const entry = el.value;
        const field = el.dataset.fieldname;
        answers[field] = entry;
        let count = 0;
        fieldsToCheck.forEach(item => {
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

    if (!trainArt) return null;

    return (
        <div className="bg-white text-black">

            <NavMenu />

            <div className="relative ml-[50px] flex flex-col items-center">
                <div style={imgStyle} className="">
                    <img ref={artEl} src={`./${trainArt.src}`} />
                </div>
                <div className="mb-3 xl:w-96">
                    <input
                        ref={artNameRef}
                        autoComplete="off"
                        type="text"
                        data-fieldname="name"
                        onInput={handleCheckField}
                        className="form-control block px-2 py-1 bg-white 
        focus:text-gray-700 focus:bg-white focus:outline-none"
                        placeholder="Name of artwork"
                    />
                    <input
                        ref={artArtistRef}
                        autoComplete="off"
                        type="text"
                        data-fieldname="artist"
                        onInput={handleCheckField}
                        className="form-control block px-2 py-1 bg-white 
        focus:text-gray-700 focus:bg-white focus:outline-none"
                        placeholder="Artist"
                    />
                    <input
                        ref={artDateRef}
                        autoComplete="off"
                        type="text"
                        data-fieldname="date"
                        onInput={handleCheckField}
                        className="form-control block px-2 py-1 bg-white 
        focus:text-gray-700 focus:bg-white focus:outline-none"
                        placeholder="Date"
                    />
                </div>
            </div>
        </div>
    );
}
