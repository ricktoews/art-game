import { useEffect, useState } from "react";
import { GalleryItem } from "@/components/GalleryItem";
import Layout from "@/components/Layout";
import { saveArtSelections, getArtSelections, sortGallery } from "../utils/helpers";
import Art from "@/data/art";

/* Defaults, and functions to check for an empty selection pool and supply the defaults. */
const defaultArt = [
  'The Starry Night',
  'American Gothic',
  'Napoleon Crossing The Alps',
  'The Last Supper',
  'The Night Watch'
];

function isSelectionPoolEmpty(art) {
  const selections = art.filter(item => item.selected);
  const result = selections.length === 0;
  return result;
}

function addDefaultSelections(art, defaultArt) {
  for (let artName of defaultArt) {
    const defaultItem = art.find(item => item.name.toLowerCase() === artName.toLowerCase());
    defaultItem.selected = true;
  }
}
/* End setting defaults if selection pool empty. */


function toggleArt(ArtSelections, identifier) {
  const item = ArtSelections.find((item) => item.src === identifier);

  if (item.selected) {
    delete item.selected;
    return false;
  } else {
    item.selected = true;
    return true;
  }
}

export default function Gallery() {
  const [itemToggled, setItemToggled] = useState("");
  const [toggleState, setToggleState] = useState(null);
  const [ArtSelections, setArtSelections] = useState(Art);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [galleryView, setGalleryView] = useState("grid");

  useEffect(() => {
    let _artSelections = getArtSelections();

    // Set default paintings, to make sure we don't start with an empty selection pool.
    if (isSelectionPoolEmpty(_artSelections)) {
      addDefaultSelections(_artSelections, defaultArt);
      saveArtSelections(_artSelections);
    }

    const artSelections = sortGallery(_artSelections);
    setArtSelections(artSelections);
  }, []);

  const toggleItemSelect = () => {
    const setting = toggleArt(ArtSelections, popupItem.src);
    setToggleState(setting);
    setItemToggled(popupItem.src);
    saveArtSelections(ArtSelections);
    const item = ArtSelections.find((item) => item.src === popupItem.src);
    setPopupItem(item);
  }

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;

    //    const setting = toggleArt(ArtSelections, identifier);
    //    saveArtSelections(ArtSelections);
    const item = ArtSelections.find((item) => item.src === identifier);
    setPopupOpen(true);
    setPopupItem(item);
  };

  if (!ArtSelections) return null;

  const selectedArt = ArtSelections.filter((item) => item.selected);
  const unselectedArt = ArtSelections.filter((item) => !item.selected);
  const artistGroups = Array.from(
    ArtSelections.reduce((groups, item) => {
      const artist = item.artist || "Unknown artist";
      if (!groups.has(artist)) groups.set(artist, []);
      groups.get(artist).push(item);
      return groups;
    }, new Map())
  ).map(([artist, artworks]) => ({ artist, artworks }));

  return (
    <Layout title="Art Gallery" toggleItemSelect={toggleItemSelect} setPopupOpen={setPopupOpen} popupOpen={popupOpen} popupItem={popupItem}>
      <div className="mb-8 flex rounded-full border border-slate-300 bg-white p-1 text-sm shadow-sm">
        <button
          className={`rounded-full px-4 py-2 transition ${galleryView === "grid" ? "bg-slate-800 text-white" : "text-slate-600 hover:text-slate-900"}`}
          onClick={() => setGalleryView("grid")}
          type="button"
        >
          Gallery
        </button>
        <button
          className={`rounded-full px-4 py-2 transition ${galleryView === "artist" ? "bg-slate-800 text-white" : "text-slate-600 hover:text-slate-900"}`}
          onClick={() => setGalleryView("artist")}
          type="button"
        >
          By artist
        </button>
      </div>

      {galleryView === "grid" ? (
        <>
          <section className="w-full max-w-[640px]">
            <h2 className="mb-6 px-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
              Selected for Practice &amp; Game
            </h2>
            <div className="flex w-full flex-wrap justify-center gap-x-8 gap-y-5 px-4">
              {selectedArt.map((item, key) => (
                <GalleryItem
                  handleItemClick={handleItemClick}
                  item={item}
                  key={item.src}
                  itemkey={key}
                />
              ))}
            </div>
          </section>
          <section className="mt-12 w-full max-w-[640px] border-t border-slate-300 pt-8">
            <h2 className="mb-6 px-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
              More Paintings
            </h2>
            <div className="flex w-full flex-wrap justify-center gap-x-8 gap-y-5 px-4">
              {unselectedArt.map((item, key) => (
                <GalleryItem
                  handleItemClick={handleItemClick}
                  item={item}
                  key={item.src}
                  itemkey={key}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="w-full max-w-[640px] px-4">
          <h2 className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            Paintings by Artist
          </h2>
          <div className="space-y-10">
            {artistGroups.map((group) => (
              <section key={group.artist}>
                <div className="mb-4 flex items-baseline justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-semibold text-slate-800">{group.artist}</h3>
                  <span className="text-xs text-slate-400">
                    {group.artworks.length} {group.artworks.length === 1 ? "work" : "works"}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-5">
                  {group.artworks.map((item, key) => (
                    <GalleryItem
                      handleItemClick={handleItemClick}
                      item={item}
                      key={item.src}
                      itemkey={key}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}

    </Layout>
  );
}
