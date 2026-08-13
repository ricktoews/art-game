import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Art from "@/data/art";
import { getArtSelections } from "@/utils/helpers";
import { getActiveCollectionArt } from "@/utils/collections";

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

function getYear(date) {
  const match = String(date || "").match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

function distractorScore(candidate, target) {
  let score = Math.random() * 5;

  if (candidate.artist === target.artist) score += 100;
  if (candidate.location && candidate.location === target.location) score += 20;

  const candidateYear = getYear(candidate.date);
  const targetYear = getYear(target.date);
  if (candidateYear && targetYear) {
    score += Math.max(0, 50 - Math.abs(candidateYear - targetYear) / 2);
  }

  return score;
}

function makeChoices(target) {
  const distractors = Art.filter((item) => item.name !== target.name)
    .map((item) => ({ item, score: distractorScore(item, target) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);

  return shuffle([target, ...distractors]);
}

function makeCropPosition() {
  const positions = ["15% 20%", "80% 20%", "25% 75%", "75% 75%", "50% 45%"];
  return positions[Math.floor(Math.random() * positions.length)];
}

export default function Game() {
  const [round, setRound] = useState([]);
  const [roundSize, setRoundSize] = useState(0);
  const [index, setIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [ready, setReady] = useState(false);
  const [cropPosition, setCropPosition] = useState("50% 50%");
  const [collectionName, setCollectionName] = useState("");
  const router = useRouter();

  const currentArt = round[index];
  const choices = useMemo(
    () => (currentArt ? makeChoices(currentArt) : []),
    [currentArt]
  );

  useEffect(() => {
    const result = getActiveCollectionArt(getArtSelections());
    const selected = result.artworks;
    setCollectionName(result.collection?.name || "My Collection");
    const shuffled = shuffle(selected);
    setRound(shuffled);
    setRoundSize(shuffled.length);
    setCropPosition(makeCropPosition());
    setReady(true);
  }, []);

  const startNewRound = () => {
    const result = getActiveCollectionArt(getArtSelections());
    const selected = result.artworks;
    setCollectionName(result.collection?.name || "My Collection");
    const shuffled = shuffle(selected);
    setRound(shuffled);
    setRoundSize(shuffled.length);
    setIndex(0);
    setWrongAnswers([]);
    setCorrect(false);
    setScore(0);
    setCropPosition(makeCropPosition());
  };

  const handleChoice = (choice) => {
    if (correct || wrongAnswers.includes(choice.name)) return;

    if (choice.name === currentArt.name) {
      setCorrect(true);
      if (wrongAnswers.length === 0) setScore((currentScore) => currentScore + 1);
    } else {
      setWrongAnswers((answers) => [...answers, choice.name]);
    }
  };

  const handleNext = () => {
    setIndex((currentIndex) => currentIndex + 1);
    setWrongAnswers([]);
    setCorrect(false);
    setCropPosition(makeCropPosition());
  };

  if (!ready) return null;

  if (roundSize === 0) {
    return (
      <Layout title="Game">
        <div className="mx-4 w-full max-w-md rounded-sm border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Choose some paintings first
          </h1>
          <p className="mt-3 text-slate-600">
            Add paintings to {collectionName || "this collection"} in the Gallery to create a game.
          </p>
          <button
            className="mt-6 w-full bg-slate-800 px-5 py-3 font-semibold text-white"
            onClick={() => router.push("/")}
            type="button"
          >
            Go to Gallery
          </button>
        </div>
      </Layout>
    );
  }

  if (index >= round.length) {
    return (
      <Layout title="Game">
        <div className="mx-4 w-full max-w-md rounded-sm border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Round complete
          </div>
          <div className="mt-4 text-5xl font-semibold text-slate-900">
            {score}/{roundSize}
          </div>
          <p className="mt-3 text-slate-600">identified on the first try</p>
          <button
            className="mt-7 w-full bg-slate-800 px-5 py-3 font-semibold text-white"
            onClick={startNewRound}
            type="button"
          >
            Play again
          </button>
          <button
            className="mt-3 w-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700"
            onClick={() => router.push("/practice")}
            type="button"
          >
            Back to Practice
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Game">
      <main className="w-full max-w-md px-4">
        <div className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {collectionName}
        </div>
        <div className="mb-4 flex justify-between text-sm text-slate-500">
          <span>
            Painting {index + 1} of {roundSize}
          </span>
          <span>Score {score}</span>
        </div>

        <section className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
          {correct ? (
            <div className="flex min-h-[300px] items-center justify-center bg-slate-100 p-5">
              <img
                alt={currentArt.name}
                className="max-h-[48vh] max-w-full object-contain shadow-md"
                src={currentArt.src}
              />
            </div>
          ) : (
            <div className="bg-slate-100 p-7">
              <div
                aria-label="Cropped detail of the painting to identify"
                className="mx-auto aspect-square w-full max-w-[280px] bg-cover shadow-md"
                role="img"
                style={{
                  backgroundImage: `url(${currentArt.src})`,
                  backgroundPosition: cropPosition,
                  backgroundSize: "190%",
                }}
              />
            </div>
          )}

          <div className="p-5 sm:p-6">
            {correct ? (
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Correct
                </div>
                <h1 className="mt-2 text-2xl font-semibold leading-tight text-slate-900">
                  {currentArt.name}
                </h1>
                <p className="mt-2 text-slate-600">
                  {currentArt.artist}
                  {currentArt.date ? ` · ${currentArt.date}` : ""}
                </p>
                <button
                  className="mt-5 w-full bg-slate-800 px-5 py-3 font-semibold text-white"
                  onClick={handleNext}
                  type="button"
                >
                  {index + 1 === roundSize ? "See results" : "Next painting"}
                </button>
              </div>
            ) : (
              <>
                <h1 className="mb-4 text-center text-lg font-semibold text-slate-900">
                  Which painting is this?
                </h1>
                <div className="grid gap-2.5">
                  {choices.map((choice) => {
                    const wrong = wrongAnswers.includes(choice.name);
                    return (
                      <button
                        className={`min-h-[52px] border px-4 py-3 text-left font-medium transition ${
                          wrong
                            ? "border-rose-300 bg-rose-50 text-rose-700"
                            : "border-slate-300 bg-white text-slate-800 hover:border-slate-500 hover:bg-slate-50"
                        }`}
                        disabled={wrong}
                        key={choice.name}
                        onClick={() => handleChoice(choice)}
                        type="button"
                      >
                        {choice.name}
                      </button>
                    );
                  })}
                </div>
                {wrongAnswers.length > 0 ? (
                  <p className="mt-3 text-center text-sm text-rose-700">
                    Not that one—look closely and try again.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
