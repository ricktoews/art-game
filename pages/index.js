import { useEffect, useState } from "react";
import { GalleryItem } from "@/components/GalleryItem";
import Layout from "@/components/Layout";
import { saveArtSelections, getArtSelections, sortGallery } from "../utils/helpers";
import {
  applyCollection,
  createCollection,
  getActiveCollection,
  getCollections,
  setActiveCollection,
  toggleArtworkInCollection,
} from "../utils/collections";
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
  const item = ArtSelections.find((item) => item.name === identifier);

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
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollectionState] = useState(null);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    let _artSelections = getArtSelections();

    // Set default paintings, to make sure we don't start with an empty selection pool.
    if (isSelectionPoolEmpty(_artSelections)) {
      addDefaultSelections(_artSelections, defaultArt);
      saveArtSelections(_artSelections);
    }

    const loadedCollections = getCollections(_artSelections);
    const loadedActiveCollection = getActiveCollection(loadedCollections);
    const artSelections = sortGallery(
      applyCollection(_artSelections, loadedActiveCollection)
    );
    setCollections(loadedCollections);
    setActiveCollectionState(loadedActiveCollection);
    setArtSelections(artSelections);
  }, []);

  const toggleItemSelect = () => {
    const setting = toggleArt(ArtSelections, popupItem.name);
    setToggleState(setting);
    setItemToggled(popupItem.name);
    saveArtSelections(ArtSelections);
    const updatedCollections = toggleArtworkInCollection(
      collections,
      activeCollection.id,
      popupItem.src
    );
    setCollections(updatedCollections);
    const item = ArtSelections.find((item) => item.name === popupItem.name);
    setPopupItem(item);
  }

  const handleCollectionChange = (event) => {
    const collection = collections.find((item) => item.id === event.target.value);
    setActiveCollection(collection.id);
    setActiveCollectionState(collection);
    setArtSelections((art) => sortGallery(applyCollection(art, collection)));
    setPopupOpen(false);
  };

  const handleCreateCollection = (event) => {
    event.preventDefault();
    const name = collectionName.trim();
    if (!name) return;
    const result = createCollection(collections, name);
    setCollections(result.collections);
    setActiveCollectionState(result.collection);
    setArtSelections((art) => sortGallery(applyCollection(art, result.collection)));
    setCollectionName("");
    setCreatingCollection(false);
  };

  const handleItemClick = (e) => {
    const el = e.currentTarget;
    const { identifier } = el.dataset;

    //    const setting = toggleArt(ArtSelections, identifier);
    //    saveArtSelections(ArtSelections);
    const item = ArtSelections.find((item) => item.name === identifier);
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
    <Layout title="Art Gallery" collectionName={activeCollection?.name} toggleItemSelect={toggleItemSelect} setPopupOpen={setPopupOpen} popupOpen={popupOpen} popupItem={popupItem}>
      <section className="mb-7 w-full max-w-[420px] px-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500" htmlFor="collection">
          Active collection
        </label>
        <div className="flex gap-2">
          <select
            className="min-w-0 flex-1 border border-slate-300 bg-white px-3 py-2.5 text-slate-800"
            id="collection"
            onChange={handleCollectionChange}
            value={activeCollection?.id || ""}
          >
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name} ({collection.artworkSources.length})
              </option>
            ))}
          </select>
          <button
            className="border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={() => setCreatingCollection((current) => !current)}
            type="button"
          >
            New
          </button>
        </div>
        {creatingCollection ? (
          <form className="mt-3 flex gap-2" onSubmit={handleCreateCollection}>
            <input
              autoFocus
              className="min-w-0 flex-1 border-b border-slate-400 bg-white px-2 py-2 outline-none focus:border-slate-800"
              maxLength={40}
              onChange={(event) => setCollectionName(event.target.value)}
              placeholder="Collection name"
              value={collectionName}
            />
            <button className="bg-slate-800 px-4 py-2 text-sm font-semibold text-white" type="submit">
              Create
            </button>
          </form>
        ) : null}
      </section>
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
                  key={item.name}
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
                  key={item.name}
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
                      key={item.name}
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
