import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Art from "@/data/art";
import { getArtSelections, saveArtSelections } from "@/utils/helpers";
import { getDiscoverArt, recordFamiliarity, removeFromDiscover } from "@/utils/familiarity";

export default function Discover() {
  const [artSelections, setArtSelections] = useState([]);
  const [discoveries, setDiscoveries] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupItem, setPopupItem] = useState(null);

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
  };

  const dismiss = (src) => {
    removeFromDiscover(src);
    const next = getDiscoverArt(artSelections);
    setDiscoveries(next);
    const replacement = next.find((item) => !discoveries.some((current) => current.src === item.src));
    if (replacement) recordFamiliarity(replacement.src, "shown");
  };

  return (
    <Layout title="Discover" popupOpen={popupOpen} popupItem={popupItem} setPopupOpen={setPopupOpen} toggleItemSelect={toggleItemSelect}>
      <main className="w-full max-w-5xl px-5">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Selected for you</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Five paintings to discover</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">A changing mix of familiar favorites and works you may not know yet.</p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {discoveries.map((item) => (
            <article className="flex flex-col border border-slate-200 bg-white p-3 shadow-sm" key={item.src}>
              <button className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100 p-2" onClick={() => openPainting(item)} type="button">
                <img alt={item.name} className="max-h-full max-w-full object-contain shadow" src={item.src} />
              </button>
              <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                <h2 className="font-semibold leading-snug text-slate-900">{item.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.artist}{item.date ? ` · ${item.date}` : ""}</p>
                <button className="mt-4 self-start text-xs font-medium text-slate-400 underline decoration-slate-300 underline-offset-4 hover:text-slate-700" onClick={() => dismiss(item.src)} type="button">Not right now</button>
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
