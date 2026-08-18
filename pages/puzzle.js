import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Art from "@/data/art";
import { getArtSelections } from "@/utils/helpers";

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE = TILE_COUNT - 1;

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random], result[index]];
  }
  return result;
}

function neighbors(position) {
  const row = Math.floor(position / GRID_SIZE);
  const column = position % GRID_SIZE;
  return [
    row > 0 ? position - GRID_SIZE : null,
    row < GRID_SIZE - 1 ? position + GRID_SIZE : null,
    column > 0 ? position - 1 : null,
    column < GRID_SIZE - 1 ? position + 1 : null,
  ].filter((value) => value !== null);
}

function makeSolvableBoard() {
  const board = Array.from({ length: TILE_COUNT }, (_, index) => index);
  let emptyPosition = EMPTY_TILE;
  let previousEmpty = null;
  for (let move = 0; move < 90; move++) {
    const choices = neighbors(emptyPosition).filter(
      (position) => position !== previousEmpty
    );
    const nextPosition = choices[Math.floor(Math.random() * choices.length)];
    [board[emptyPosition], board[nextPosition]] = [
      board[nextPosition],
      board[emptyPosition],
    ];
    previousEmpty = emptyPosition;
    emptyPosition = nextPosition;
  }
  return board;
}

function tileStyle(image, tileIndex) {
  const row = Math.floor(tileIndex / GRID_SIZE);
  const column = tileIndex % GRID_SIZE;
  return {
    backgroundImage: `url(${image})`,
    backgroundPosition: `${(column / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
  };
}

export default function Puzzle() {
  const [ready, setReady] = useState(false);
  const [selectedArt, setSelectedArt] = useState([]);
  const [target, setTarget] = useState(null);
  const [decoy, setDecoy] = useState(null);
  const [phase, setPhase] = useState("preview");
  const [impostors, setImpostors] = useState([]);
  const [found, setFound] = useState([]);
  const [wrongTile, setWrongTile] = useState(null);
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const router = useRouter();

  const newRound = (artworks) => {
    const newTarget = artworks[Math.floor(Math.random() * artworks.length)];
    const decoyPool = Art.filter((item) => item.src !== newTarget.src);
    const newDecoy = decoyPool[Math.floor(Math.random() * decoyPool.length)];
    const positions = shuffle(
      Array.from({ length: TILE_COUNT }, (_, index) => index)
    ).slice(0, 2);
    setTarget(newTarget);
    setDecoy(newDecoy);
    setImpostors(positions);
    setFound([]);
    setWrongTile(null);
    setBoard([]);
    setMoves(0);
    setPhase("preview");
  };

  useEffect(() => {
    const items = getArtSelections().filter((item) => item.selected);
    setSelectedArt(items);
    if (items.length) newRound(items);
    setReady(true);
  }, []);

  const foundSet = useMemo(() => new Set(found), [found]);

  const identifyTile = (index) => {
    if (phase !== "inspect" || foundSet.has(index)) return;
    if (impostors.includes(index)) {
      const nextFound = [...found, index];
      setFound(nextFound);
      if (nextFound.length === impostors.length) {
        window.setTimeout(() => {
          setBoard(makeSolvableBoard());
          setPhase("solve");
        }, 700);
      }
    } else {
      setWrongTile(index);
      window.setTimeout(() => setWrongTile(null), 550);
    }
  };

  const slideTile = (position) => {
    if (phase !== "solve") return;
    const emptyPosition = board.indexOf(EMPTY_TILE);
    if (!neighbors(emptyPosition).includes(position)) return;
    const updated = [...board];
    [updated[emptyPosition], updated[position]] = [
      updated[position],
      updated[emptyPosition],
    ];
    setBoard(updated);
    setMoves((count) => count + 1);
    const solved = updated.every((tile, index) => tile === index);
    if (solved) window.setTimeout(() => setPhase("complete"), 450);
  };

  if (!ready) return null;

  if (!target) {
    return (
      <Layout title="Forgery Puzzle">
        <div className="mx-4 w-full max-w-md border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Choose a painting first</h1>
          <p className="mt-3 text-slate-600">Select at least one painting in the Gallery to create a puzzle.</p>
          <button className="mt-6 w-full bg-slate-800 px-5 py-3 font-semibold text-white" onClick={() => router.push("/")} type="button">Go to Gallery</button>
        </div>
      </Layout>
    );
  }

  if (phase === "preview") {
    return (
      <Layout title="Forgery Puzzle">
        <main className="w-full max-w-md px-4 text-center">
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Study the painting</h1>
          <p className="mt-2 text-sm text-slate-500">Two counterfeit pieces are about to be slipped into it.</p>
          <div className="mt-6 flex aspect-square items-center justify-center overflow-hidden bg-slate-100 shadow-lg">
            <img alt={target.name} className="h-full w-full object-cover" src={target.src} />
          </div>
          <div className="mt-4 text-lg font-semibold text-slate-900">{target.name}</div>
          <div className="text-sm text-slate-500">{target.artist}</div>
          <button className="mt-6 w-full bg-slate-800 px-5 py-3 font-semibold text-white" onClick={() => setPhase("inspect")} type="button">Plant the forgeries</button>
        </main>
      </Layout>
    );
  }

  if (phase === "complete") {
    return (
      <Layout title="Forgery Puzzle">
        <main className="mx-4 w-full max-w-md overflow-hidden border border-emerald-300 bg-white text-center shadow-xl">
          <div className="bg-emerald-700 px-6 py-6 text-white">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/80">Restoration complete</div>
            <h1 className="mt-2 text-2xl font-semibold">{target.name}</h1>
            <p className="mt-1 text-sm text-emerald-50/80">{target.artist}</p>
          </div>
          <img alt={target.name} className="aspect-square w-full object-cover" src={target.src} />
          <div className="p-6">
            <div className="mb-5 text-slate-600">Puzzle solved in <strong className="text-slate-900">{moves}</strong> moves.</div>
            <button className="w-full bg-slate-800 px-5 py-3 font-semibold text-white" onClick={() => newRound(selectedArt)} type="button">Another puzzle</button>
            <button className="mt-3 w-full border border-slate-300 px-5 py-3 font-semibold text-slate-700" onClick={() => router.push("/")} type="button">Gallery</button>
          </div>
        </main>
      </Layout>
    );
  }

  const solving = phase === "solve";
  return (
    <Layout title="Forgery Puzzle">
      <main className="w-full max-w-md px-4">
        <div className="mb-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{solving ? `${moves} moves` : `${found.length} of 2 found`}</div>
          <h1 className="mt-2 text-xl font-semibold text-slate-900">{solving ? "Restore the painting" : "Find the counterfeit tiles"}</h1>
          <p className="mt-1 text-sm text-slate-500">{solving ? "Tap a tile beside the empty space to slide it." : "Tap the two pieces that do not belong."}</p>
        </div>

        <div className="grid aspect-square grid-cols-3 overflow-hidden border-4 border-slate-800 bg-slate-800 shadow-xl">
          {(solving ? board : Array.from({ length: TILE_COUNT }, (_, index) => index)).map((tileIndex, position) => {
            const empty = solving && tileIndex === EMPTY_TILE;
            const counterfeit = !solving && impostors.includes(tileIndex) && !foundSet.has(tileIndex);
            const corrected = !solving && foundSet.has(tileIndex);
            return (
              <button
                aria-label={empty ? "Empty space" : `Puzzle tile ${position + 1}`}
                className={`relative aspect-square border border-white/40 bg-slate-900 transition active:scale-[.97] ${wrongTile === tileIndex ? "animate-[heistShake_.35s_ease-in-out] ring-4 ring-inset ring-rose-500" : ""} ${corrected ? "ring-4 ring-inset ring-emerald-400" : ""}`}
                disabled={empty}
                key={`${position}-${tileIndex}`}
                onClick={() => (solving ? slideTile(position) : identifyTile(tileIndex))}
                style={empty ? undefined : tileStyle(counterfeit ? decoy.src : target.src, tileIndex)}
                type="button"
              >
                {corrected ? <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span> : null}
              </button>
            );
          })}
        </div>

        {!solving && wrongTile !== null ? <p className="mt-4 bg-rose-50 px-3 py-2 text-center text-sm font-medium text-rose-700">That tile belongs to the painting.</p> : null}
        {!solving && found.length > 0 ? <p className="mt-4 bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-700">Forgery removed. Find {2 - found.length} more.</p> : null}
      </main>
    </Layout>
  );
}
