import { useEffect, useState } from "react";
import { GalleryItem } from "@/components/GalleryItem";
import Layout from "@/components/Layout";
import { saveArtSelections, getArtSelections, sortGallery } from "../utils/helpers";
import Art from "@/data/art";
import { getArtMovement } from "@/data/artMovements";
import { genreOrder, getArtGenre } from "@/data/artGenres";
import { getArtStyle, styleOrder } from "@/data/artStyles";

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

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function GalleryDropdown({ active, label, open, options, onSelect, onToggle }) {
  const choose = (option) => {
    onSelect(option);
    onToggle(false);
  };

  return (
    <>
      <button aria-expanded={open} aria-haspopup="menu" className={`flex items-center gap-1 rounded-full px-3 py-2 transition ${active ? "bg-slate-800 text-white" : "text-slate-600 hover:text-slate-900"}`} onClick={() => onToggle(!open)} type="button">
        {label}
        <span className={`text-[10px] transition ${open ? "rotate-180" : ""}`} aria-hidden="true">▼</span>
      </button>
      {open ? (
        <div className="absolute left-1/2 top-full z-20 mt-2 max-h-64 w-80 max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-y-auto border border-slate-200 bg-white py-1 text-left shadow-xl">
          <button className="block w-full px-4 py-2 text-left font-semibold text-slate-700 hover:bg-slate-100" onClick={() => choose(null)} type="button">
            All {label.toLowerCase()}s
          </button>
          {options.map((option) => (
            <button className="block w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-100 hover:text-slate-900" key={option} onClick={() => choose(option)} type="button">
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default function Gallery() {
  const [itemToggled, setItemToggled] = useState("");
  const [toggleState, setToggleState] = useState(null);
  const [ArtSelections, setArtSelections] = useState(Art);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [galleryView, setGalleryView] = useState("genre");
  const [galleryFilter, setGalleryFilter] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const chooseGalleryGroup = (view, filter) => {
    setGalleryView(view);
    setGalleryFilter(filter);
    setOpenDropdown(null);
    setSearchInput("");
    setSearchQuery("");
  };

  const submitSearch = (event) => {
    event.preventDefault();
    setOpenDropdown(null);
    setSearchQuery(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
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
  const movementGroups = Array.from(
    ArtSelections.reduce((groups, item) => {
      const movement = getArtMovement(item);
      if (!groups.has(movement)) groups.set(movement, []);
      groups.get(movement).push(item);
      return groups;
    }, new Map())
  )
    .map(([movement, artworks]) => ({ movement, artworks }))
    .sort((a, b) => a.movement.localeCompare(b.movement));
  const genreGroups = Array.from(
    ArtSelections.reduce((groups, item) => {
      const genre = getArtGenre(item);
      if (!groups.has(genre)) groups.set(genre, []);
      groups.get(genre).push(item);
      return groups;
    }, new Map())
  )
    .map(([genre, artworks]) => ({ genre, artworks }))
    .sort((a, b) => genreOrder.indexOf(a.genre) - genreOrder.indexOf(b.genre));
  const styleGroups = Array.from(
    ArtSelections.reduce((groups, item) => {
      const style = getArtStyle(item);
      if (!groups.has(style)) groups.set(style, []);
      groups.get(style).push(item);
      return groups;
    }, new Map())
  )
    .map(([style, artworks]) => ({ style, artworks }))
    .sort((a, b) => styleOrder.indexOf(a.style) - styleOrder.indexOf(b.style));
  const normalizedQuery = normalizeSearch(searchQuery.trim());
  const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);
  const searchResults = searchTerms.length ? ArtSelections.filter((item) => {
    const searchable = normalizeSearch([
      item.name,
      item.artist,
      item.date,
      item.location,
      getArtGenre(item),
      getArtStyle(item),
      getArtMovement(item)
    ].filter(Boolean).join(" "));
    return searchTerms.every((term) => searchable.includes(term));
  }) : [];

  return (
    <Layout title="Art Gallery" toggleItemSelect={toggleItemSelect} setPopupOpen={setPopupOpen} popupOpen={popupOpen} popupItem={popupItem}>
      <form className="relative mb-4 w-[calc(100%_-_2rem)] max-w-[640px]" onSubmit={submitSearch} role="search">
        <label className="sr-only" htmlFor="gallery-search">Search the gallery</label>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">⌕</span>
        <input
          className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-32 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          id="gallery-search"
          onChange={(event) => setSearchInput(event.target.value)}
          onFocus={() => setOpenDropdown(null)}
          placeholder="Search title, artist, style…"
          type="text"
          value={searchInput}
        />
        {searchInput || searchQuery ? (
          <button aria-label="Clear search" className="absolute right-[4.75rem] top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={clearSearch} type="button">×</button>
        ) : null}
        <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600" type="submit">Search</button>
      </form>
      <div className="relative z-[5] mb-8 flex flex-wrap justify-center rounded-2xl border border-slate-300 bg-white p-1 text-sm shadow-sm">
        <GalleryDropdown active={galleryView === "genre"} label="Genre" onSelect={(filter) => chooseGalleryGroup("genre", filter)} onToggle={(open) => setOpenDropdown(open ? "genre" : null)} open={openDropdown === "genre"} options={genreGroups.map((group) => group.genre)} />
        <GalleryDropdown active={galleryView === "style"} label="Style" onSelect={(filter) => chooseGalleryGroup("style", filter)} onToggle={(open) => setOpenDropdown(open ? "style" : null)} open={openDropdown === "style"} options={styleGroups.map((group) => group.style)} />
        <GalleryDropdown active={galleryView === "artist"} label="Artist" onSelect={(filter) => chooseGalleryGroup("artist", filter)} onToggle={(open) => setOpenDropdown(open ? "artist" : null)} open={openDropdown === "artist"} options={artistGroups.map((group) => group.artist)} />
        <GalleryDropdown active={galleryView === "movement"} label="Movement" onSelect={(filter) => chooseGalleryGroup("movement", filter)} onToggle={(open) => setOpenDropdown(open ? "movement" : null)} open={openDropdown === "movement"} options={movementGroups.map((group) => group.movement)} />
        <button
          className={`rounded-full px-4 py-2 transition ${galleryView === "grid" ? "bg-slate-800 text-white" : "text-slate-600 hover:text-slate-900"}`}
          onClick={() => chooseGalleryGroup("grid", null)}
          type="button"
        >
          All
        </button>
      </div>

      {searchTerms.length ? (
        <section className="w-full max-w-[640px] px-4">
          <h2 className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for “{searchQuery.trim()}”
          </h2>
          {searchResults.length ? (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
              {searchResults.map((item, key) => (
                <div className="w-[125px]" key={item.src}>
                  <GalleryItem handleItemClick={handleItemClick} item={item} itemkey={key} />
                  <p className="mt-2 text-sm font-semibold leading-snug text-slate-800">{item.name}</p>
                  <p className="mt-1 text-xs leading-snug text-slate-500">{item.artist}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">No paintings match that search.</p>
          )}
        </section>
      ) : galleryView === "genre" ? (
        <section className="w-full max-w-[640px] px-4">
          <h2 className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            {galleryFilter || "Paintings by Genre"}
          </h2>
          <div className="space-y-10">
            {genreGroups.filter((group) => !galleryFilter || group.genre === galleryFilter).map((group) => (
              <section key={group.genre}>
                <div className="mb-4 flex items-baseline justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-semibold text-slate-800">{group.genre}</h3>
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
      ) : galleryView === "style" ? (
        <section className="w-full max-w-[640px] px-4">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            {galleryFilter || "Paintings by Visual Style"}
          </h2>
          <p className="mx-auto mb-7 max-w-lg text-center text-sm text-slate-500">
            Explore rooms organized by how the art looks and feels.
          </p>
          <div className="space-y-10">
            {styleGroups.filter((group) => !galleryFilter || group.style === galleryFilter).map((group) => (
              <section key={group.style}>
                <div className="mb-4 flex items-baseline justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-serif text-lg font-semibold text-slate-800">{group.style}</h3>
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
      ) : galleryView === "grid" ? (
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
      ) : galleryView === "artist" ? (
        <section className="w-full max-w-[640px] px-4">
          <h2 className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            {galleryFilter || "Paintings by Artist"}
          </h2>
          <div className="space-y-10">
            {artistGroups.filter((group) => !galleryFilter || group.artist === galleryFilter).map((group) => (
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
      ) : (
        <section className="w-full max-w-[640px] px-4">
          <h2 className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            {galleryFilter || "Paintings by Movement"}
          </h2>
          <div className="space-y-10">
            {movementGroups.filter((group) => !galleryFilter || group.movement === galleryFilter).map((group) => (
              <section key={group.movement}>
                <div className="mb-4 flex items-baseline justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-semibold text-slate-800">{group.movement}</h3>
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
