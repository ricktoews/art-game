import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Art from "@/data/art";
import { getArtSelections } from "@/utils/helpers";
import { getActiveCollectionArt } from "@/utils/collections";

const STUDY_SECONDS = 12;
const WALL_SIZE = 5;
const STOLEN_COUNT = 3;
const WAREHOUSE_SIZE = 14;

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

function buildRound(collectionArt) {
  const wall = shuffle(collectionArt).slice(0, WALL_SIZE);
  const stolen = shuffle(wall).slice(0, STOLEN_COUNT);
  const stolenSources = new Set(stolen.map((item) => item.src));
  const distractors = shuffle(
    Art.filter((item) => !stolenSources.has(item.src))
  ).slice(0, Math.max(0, WAREHOUSE_SIZE - stolen.length));
  return { wall, stolen, warehouse: shuffle([...stolen, ...distractors]) };
}

export default function Heist() {
  const [ready, setReady] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionArt, setCollectionArt] = useState([]);
  const [round, setRound] = useState(null);
  const [phase, setPhase] = useState("study");
  const [seconds, setSeconds] = useState(STUDY_SECONDS);
  const [recovered, setRecovered] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [flash, setFlash] = useState("");
  const [aftermath, setAftermath] = useState(false);
  const [returnedCount, setReturnedCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const result = getActiveCollectionArt(getArtSelections());
    setCollectionName(result.collection?.name || "My Collection");
    setCollectionArt(result.artworks);
    if (result.artworks.length >= WALL_SIZE) setRound(buildRound(result.artworks));
    setReady(true);
  }, []);

  useEffect(() => {
    if (phase !== "study" || !round) return;
    if (seconds === 0) {
      setPhase("theft");
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [phase, round, seconds]);

  useEffect(() => {
    if (phase !== "theft") return;
    const timer = window.setTimeout(() => setPhase("warehouse"), 1700);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "restoration") return;
    if (returnedCount >= STOLEN_COUNT) {
      const timer = window.setTimeout(() => setPhase("victory"), 900);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(
      () => setReturnedCount((count) => count + 1),
      650
    );
    return () => window.clearTimeout(timer);
  }, [phase, returnedCount]);

  useEffect(() => {
    if (phase !== "failure") {
      setAftermath(false);
      return;
    }
    const timer = window.setTimeout(() => setAftermath(true), 750);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const stolenSources = useMemo(
    () => new Set(round?.stolen.map((item) => item.src) || []),
    [round]
  );
  const recoveredSources = useMemo(() => new Set(recovered), [recovered]);

  const startTheft = () => {
    setSeconds(0);
  };

  const choosePainting = (painting) => {
    if (phase !== "warehouse" || recoveredSources.has(painting.src)) return;
    if (stolenSources.has(painting.src)) {
      const nextRecovered = [...recovered, painting.src];
      setRecovered(nextRecovered);
      setFlash("recovered");
      window.setTimeout(() => setFlash(""), 450);
      if (nextRecovered.length === STOLEN_COUNT) {
        window.setTimeout(() => {
          setReturnedCount(0);
          setPhase("restoration");
        }, 500);
      }
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      setFlash("danger");
      window.setTimeout(() => setFlash(""), 500);
      if (nextMistakes >= 2) window.setTimeout(() => setPhase("failure"), 650);
    }
  };

  const restart = () => {
    setRound(buildRound(collectionArt));
    setPhase("study");
    setSeconds(STUDY_SECONDS);
    setRecovered([]);
    setMistakes(0);
    setFlash("");
    setReturnedCount(0);
  };

  if (!ready) return null;

  if (collectionArt.length < WALL_SIZE) {
    return (
      <Layout title="The Heist">
        <div className="mx-4 w-full max-w-md border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            The museum needs five works
          </h1>
          <p className="mt-3 text-slate-600">
            Add at least five paintings to {collectionName} before starting the heist.
          </p>
          <button className="mt-6 w-full bg-slate-800 px-5 py-3 font-semibold text-white" onClick={() => router.push("/")} type="button">
            Go to Gallery
          </button>
        </div>
      </Layout>
    );
  }

  if (!round) return null;

  if (phase === "victory" || phase === "failure") {
    const won = phase === "victory";
    if (!won && !aftermath) {
      return (
        <Layout title="The Heist">
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-rose-600 animate-[heistBlast_.75s_ease-out_forwards]">
            <div className="h-24 w-24 rounded-full border-8 border-white/80 animate-ping" />
          </div>
        </Layout>
      );
    }
    if (won) {
      return (
        <Layout title="The Heist">
          <main className="mx-4 w-full max-w-md overflow-hidden border border-emerald-300 bg-white shadow-xl">
            <div className="bg-emerald-700 px-6 py-5 text-center text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100/80">
                Museum secure
              </div>
              <h1 className="mt-2 text-2xl font-semibold">Collection restored</h1>
              <p className="mt-1 text-sm text-emerald-50/80">{collectionName}</p>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 gap-1.5 border-[6px] border-amber-950 bg-[#d9c8aa] p-2 shadow-md">
                {round.wall.map((item) => (
                  <div key={item.src} className="flex min-w-0 flex-col">
                    <div className="flex aspect-[4/5] items-center justify-center border-[3px] border-amber-900 bg-[#2b211b] p-1">
                      <img
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                        src={item.src}
                      />
                    </div>
                    <div className="mt-0.5 truncate bg-[#f3ead9] px-1 py-0.5 text-center text-[7px] text-slate-800">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-5 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-3 text-center">
                <div>
                  <div className="text-xl font-semibold text-slate-900">3</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Recovered</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-slate-900">{mistakes}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Mistakes</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-slate-900">{2 - mistakes}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Safeties</div>
                </div>
              </div>

              <button className="w-full bg-slate-800 px-5 py-3 font-semibold text-white" onClick={restart} type="button">
                Another heist
              </button>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button className="border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700" onClick={() => router.push("/")} type="button">
                  Gallery
                </button>
                <button className="border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700" onClick={() => router.push("/practice")} type="button">
                  Practice
                </button>
              </div>
            </div>
          </main>
        </Layout>
      );
    }
    return (
      <Layout title="The Heist">
        <div className="mx-4 w-full max-w-md overflow-hidden border border-slate-700 bg-white text-center shadow-xl">
          <div
            className="relative overflow-hidden px-8 py-10 text-white"
            style={{ backgroundColor: "#111827", color: "white" }}
          >
            <div aria-hidden="true" className="absolute inset-0 opacity-20">
              <span className="absolute -left-5 top-8 h-20 w-28 -rotate-12 border-4 border-amber-200" />
              <span className="absolute -right-7 bottom-8 h-24 w-20 rotate-[18deg] border-4 border-amber-200" />
              <span className="absolute left-1/2 top-3 h-16 w-24 -translate-x-1/2 rotate-3 border-4 border-amber-200" />
            </div>
            <div className="relative">
              <div className="mx-auto flex w-fit gap-3" aria-label="Both safeties disabled">
                <span className="h-6 w-6 rounded-full border-2 border-rose-300 bg-rose-500 shadow-[0_0_16px_rgba(244,63,94,.9)]" />
                <span className="h-6 w-6 rounded-full border-2 border-rose-300 bg-rose-500 shadow-[0_0_16px_rgba(244,63,94,.9)]" />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Safeties disabled
              </div>
              <h1 className="mt-3 text-3xl font-semibold">The trap was sprung</h1>
              <p className="mt-3 text-white/75">Two false recoveries triggered the alarm. The stolen works remain in the warehouse.</p>
            </div>
          </div>
          <div className="p-6">
            <button className="w-full bg-slate-800 px-5 py-3 font-semibold text-white" onClick={restart} type="button">Play again</button>
            <button className="mt-3 w-full border border-slate-300 px-5 py-3 font-semibold text-slate-700" onClick={() => router.push("/practice")} type="button">Return to Practice</button>
          </div>
        </div>
      </Layout>
    );
  }

  if (phase === "restoration") {
    const returnedSources = new Set(
      round.stolen.slice(0, returnedCount).map((item) => item.src)
    );
    return (
      <Layout title="The Heist">
        <main className="w-full max-w-[600px] px-4">
          <div className="mb-4 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Museum secure
            </div>
            <h1 className="mt-2 text-xl font-semibold text-slate-900">
              Returning the collection…
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {returnedCount} of {STOLEN_COUNT} stolen works restored
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 border-[8px] border-amber-950 bg-[#d9c8aa] p-3 shadow-xl sm:gap-3 sm:p-4">
            {round.wall.map((item) => {
              const missing =
                stolenSources.has(item.src) && !returnedSources.has(item.src);
              return (
                <div key={item.src} className="flex min-w-0 flex-col">
                  <div className="flex aspect-[4/5] items-center justify-center border-4 border-amber-900 bg-[#2b211b] p-1 shadow-md">
                    {missing ? (
                      <div className="h-full w-full border border-dashed border-amber-700/70" />
                    ) : (
                      <img
                        alt={item.name}
                        className="max-h-full max-w-full animate-[heistReturn_.5s_ease-out] object-contain"
                        src={item.src}
                      />
                    )}
                  </div>
                  <div className="mt-1 truncate bg-[#f3ead9] px-1 py-1 text-center text-[8px] text-slate-800 sm:text-[10px]">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </Layout>
    );
  }

  if (phase === "warehouse") {
    const warehousePaintings = round.warehouse.filter(
      (item) => !recoveredSources.has(item.src)
    );
    return (
      <Layout title="The Heist">
        <main className={`w-full max-w-[680px] px-4 ${flash === "danger" ? "animate-[heistShake_.35s_ease-in-out]" : ""}`}>
          <div className="sticky top-[58px] z-[5] mb-4 border border-slate-700 bg-slate-900 px-4 py-3 text-white shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">Warehouse</div>
                <h1 className="text-base font-semibold">{STOLEN_COUNT - recovered.length} paintings remaining</h1>
              </div>
              <div className="flex items-center gap-2" aria-label={`${2 - mistakes} safeties remaining`}>
                <span className="mr-1 text-[10px] uppercase tracking-wider text-slate-400">Safeties</span>
                {[0, 1].map((safety) => (
                  <span key={safety} className={`h-4 w-4 rounded-full border ${safety < mistakes ? "border-rose-500 bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,.9)]" : "border-emerald-400 bg-emerald-400"}`} />
                ))}
              </div>
            </div>
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
              {round.stolen.map((item) => (
                <span key={item.src} className={`shrink-0 border px-2 py-1 text-[10px] ${recoveredSources.has(item.src) ? "border-emerald-500 bg-emerald-900/50 text-emerald-200 line-through" : "border-slate-600 text-slate-300"}`}>
                  {item.name}
                </span>
              ))}
            </div>
            {flash === "danger" ? (
              <div className="mt-2 bg-rose-600 px-2 py-1 text-center text-xs font-semibold text-white">
                Wrong painting—one safety has been disabled.
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {warehousePaintings.map((item) => {
              return (
                <button key={item.src} className="relative flex aspect-square items-center justify-center overflow-hidden border border-slate-600 bg-slate-800 p-2 transition active:scale-[.97] hover:border-amber-300" onClick={() => choosePainting(item)} type="button">
                  <img alt="Painting in the warehouse" className="max-h-full max-w-full object-contain shadow-md" src={item.src} />
                </button>
              );
            })}
          </div>
        </main>
      </Layout>
    );
  }

  const theftActive = phase === "theft";
  return (
    <Layout title="The Heist">
      <main className={`w-full max-w-[680px] px-4 transition ${theftActive ? "bg-rose-950/5" : ""}`}>
        <div className="mb-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{collectionName}</div>
          <h1 className="mt-2 text-xl font-semibold text-slate-900">{theftActive ? "The gallery alarm is sounding…" : "Study the museum wall"}</h1>
          <p className="mt-1 text-sm text-slate-500">{theftActive ? "Three works have vanished." : `The thief arrives in ${seconds} seconds.`}</p>
        </div>

        <div className={`grid grid-cols-3 gap-2 border-[8px] border-amber-950 bg-[#d9c8aa] p-3 shadow-xl sm:gap-3 sm:p-4 ${theftActive ? "animate-[heistFlicker_.45s_ease-in-out_2]" : ""}`}>
          {round.wall.map((item) => {
            const stolen = theftActive && stolenSources.has(item.src);
            return (
              <div key={item.src} className="flex min-w-0 flex-col">
                <div className={`flex aspect-[4/5] items-center justify-center border-4 border-amber-900 bg-[#2b211b] p-1 shadow-md transition-all duration-500 ${stolen ? "rotate-1" : ""}`}>
                  {stolen ? <div className="h-full w-full border border-dashed border-amber-700/70" /> : <img alt={item.name} className="max-h-full max-w-full object-contain" src={item.src} />}
                </div>
                <div className="mt-1 truncate bg-[#f3ead9] px-1 py-1 text-center text-[8px] text-slate-800 shadow-sm sm:text-[10px]">{item.name}</div>
              </div>
            );
          })}
        </div>
        {!theftActive ? <button className="mt-5 w-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700" onClick={startTheft} type="button">I’m ready</button> : null}
      </main>
    </Layout>
  );
}
