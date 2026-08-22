import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Art from "@/data/art";
import { getArtSelections, saveArtSelections } from "@/utils/helpers";
import {
  getDiscoverAlternative,
  getDiscoverArt,
  recordFamiliarity,
  replaceDiscoverArt,
} from "@/utils/familiarity";

export default function Discover() {
  const [artSelections, setArtSelections] = useState([]);
  const [discoveries, setDiscoveries] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [changeChoice, setChangeChoice] = useState(null);

  useEffect(() => {
    const selections = getArtSelections();
    const recommendations = getDiscoverArt(selections);
    setArtSelections(selections);
    setDiscoveries(recommendations);
    recommendations.forEach((item) => recordFamiliarity(item.src, "shown"));
  }, []);

  const openPainting = (item) => {
    recordFamiliarity(item.src, "opened");
    setPopupItem(item);
    setPopupOpen(true);
  };

  const toggleItemSelect = () => {
    const next = artSelections.map((item) =>
      item.src === popupItem.src ? { ...item, selected: !item.selected } : item
    );
    saveArtSelections(next);
    setArtSelections(next);
    const updated = next.find((item) => item.src === popupItem.src);
    setPopupItem(updated);
    setDiscoveries((current) => current.map((item) => item.src === updated.src ? updated : item));
    setChangeChoice((current) => current ? {
      current: current.current.src === updated.src ? updated : current.current,
      alternative: current.alternative.src === updated.src ? updated : current.alternative,
    } : null);
  };

  const startChange = (item) => {
    const alternative = getDiscoverAlternative(
      artSelections,
      discoveries.map((discovery) => discovery.src)
    );
    if (!alternative) return;
    recordFamiliarity(alternative.src, "shown");
    setChangeChoice({ current: item, alternative });
  };

  const chooseArtwork = (item) => {
    const { current } = changeChoice;
    if (item.src !== current.src) {
      replaceDiscoverArt(current.src, item.src);
      setDiscoveries((items) => items.map((artwork) => artwork.src === current.src ? item : artwork));
    }
    setChangeChoice(null);
  };

  return (
    <Layout title="Discover" popupOpen={popupOpen} popupItem={popupItem} setPopupOpen={setPopupOpen} toggleItemSelect={toggleItemSelect}>
      <main className="w-full max-w-5xl px-5">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-700/50" />
            <span className="h-2 w-2 rotate-45 border border-emerald-700/70" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-700/50" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Selected for you</p>
          <p className="mx-auto mt-3 max-w-xl font-serif text-xl italic leading-relaxed text-slate-600 sm:text-2xl">A changing mix of familiar favorites and works you may not know yet.</p>
          <div className="mt-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-700/50" />
            <span className="h-2 w-2 rotate-45 border border-emerald-700/70" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-700/50" />
          </div>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {discoveries.map((item) => changeChoice?.current.src === item.src ? (
            <article className="border border-emerald-200 bg-emerald-50/40 p-2 shadow-sm sm:col-span-2 sm:p-4 lg:col-span-3" key={item.src}>
              <p className="mb-4 text-center text-sm font-medium text-slate-700">Which artwork would you like to see here?</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {[changeChoice.current, changeChoice.alternative].map((choice) => (
                  <div className="flex min-w-0 flex-col border border-slate-200 bg-white p-2 sm:p-3" key={choice.src}>
                    <button className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-100 p-1 sm:p-2" onClick={() => openPainting(choice)} type="button">
                      <img alt={choice.name} className="max-h-full max-w-full object-contain shadow" src={choice.src} />
                    </button>
                    <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                      <h2 className="break-words text-sm font-semibold leading-snug text-slate-900 sm:text-base">{choice.name}</h2>
                      <p className="mt-1 break-words text-xs text-slate-500 sm:text-sm">{choice.artist}{choice.date ? ` · ${choice.date}` : ""}</p>
                      <div className="mt-auto pt-5 text-center">
                        <button className="bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600" onClick={() => chooseArtwork(choice)} type="button">
                          {choice.src === changeChoice.current.src ? "Keep" : "Use instead"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ) : (
            <article className="flex flex-col border border-slate-200 bg-white p-3 shadow-sm" key={item.src}>
              <button className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100 p-2" onClick={() => openPainting(item)} type="button">
                <img alt={item.name} className="max-h-full max-w-full object-contain shadow" src={item.src} />
              </button>
              <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                <h2 className="font-semibold leading-snug text-slate-900">{item.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.artist}{item.date ? ` · ${item.date}` : ""}</p>
                <button className="mt-4 self-center border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900" onClick={() => startChange(item)} type="button">Change</button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-7 text-center">
          <Link className="inline-block bg-slate-800 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700" href="/gallery">Browse the full gallery</Link>
        </div>
      </main>
    </Layout>
  );
}
