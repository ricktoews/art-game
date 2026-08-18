import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { getArtSelections } from "@/utils/helpers";

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

export default function Practice() {
  const [selectedArt, setSelectedArt] = useState([]);
  const [queue, setQueue] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const items = getArtSelections().filter((item) => item.selected);
    setSelectedArt(items);
    setQueue(shuffle(items));
    setReady(true);
  }, []);

  const currentArt = queue[0];

  const startRound = () => {
    setQueue(shuffle(selectedArt));
    setRevealed(false);
  };

  const handleAgain = () => {
    const [, ...remaining] = queue;
    const insertionIndex = Math.min(2, remaining.length);
    const nextQueue = [...remaining];
    nextQueue.splice(insertionIndex, 0, currentArt);
    setQueue(nextQueue);
    setRevealed(false);
  };

  const handleGotIt = () => {
    setQueue((currentQueue) => currentQueue.slice(1));
    setRevealed(false);
  };

  if (!ready) return null;

  if (selectedArt.length === 0) {
    return (
      <Layout title="Practice">
        <div className="mx-4 w-full max-w-md rounded-sm border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Choose some paintings first
          </h1>
          <p className="mt-3 text-slate-600">
            Select paintings in the Gallery to build a practice round.
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

  if (!currentArt) {
    return (
      <Layout title="Practice">
        <div className="mx-4 w-full max-w-md rounded-sm border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
            ✓
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-slate-900">
            Round complete
          </h1>
          <p className="mt-3 text-slate-600">
            You recalled all {selectedArt.length} selected paintings.
          </p>
          <button
            className="mt-7 w-full bg-slate-800 px-5 py-3 font-semibold text-white"
            onClick={startRound}
            type="button"
          >
            Practice again
          </button>
          <button
            className="mt-3 w-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700"
            onClick={() => router.push("/game")}
            type="button"
          >
            Go to Game
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Practice">
      <main className="w-full max-w-md px-4">
        <div className="mb-5 flex items-center justify-between text-sm text-slate-500">
          <span>{queue.length} remaining</span>
          <span>{selectedArt.length} in this round</span>
        </div>

        <section className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
          <button
            aria-label={revealed ? currentArt.name : "Reveal painting details"}
            className="flex min-h-[310px] w-full items-center justify-center bg-slate-100 p-5 sm:min-h-[360px] sm:p-8"
            onClick={() => setRevealed(true)}
            type="button"
          >
            <img
              alt="Artwork to identify"
              className="max-h-[48vh] max-w-full object-contain shadow-md"
              src={currentArt.src}
            />
          </button>

          <div className="min-h-[170px] p-6 text-center">
            {revealed ? (
              <>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  The answer is
                </div>
                <h1 className="mt-3 text-2xl font-semibold leading-tight text-slate-900">
                  {currentArt.name}
                </h1>
                <p className="mt-2 text-slate-600">
                  {currentArt.artist}
                  {currentArt.date ? ` · ${currentArt.date}` : ""}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-slate-900">
                  Do you remember this painting?
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Say the title to yourself, then reveal the answer.
                </p>
                <button
                  className="mt-5 w-full bg-slate-800 px-5 py-3 font-semibold text-white"
                  onClick={() => setRevealed(true)}
                  type="button"
                >
                  Reveal
                </button>
              </>
            )}
          </div>
        </section>

        {revealed ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              className="border border-slate-300 bg-white px-4 py-4 font-semibold text-slate-700 shadow-sm"
              onClick={handleAgain}
              type="button"
            >
              Again
            </button>
            <button
              className="bg-emerald-600 px-4 py-4 font-semibold text-white shadow-sm"
              onClick={handleGotIt}
              type="button"
            >
              Got it
            </button>
          </div>
        ) : null}
      </main>
    </Layout>
  );
}
