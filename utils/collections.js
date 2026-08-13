const COLLECTIONS_KEY = "art-game-collections";
const ACTIVE_COLLECTION_KEY = "art-game-active-collection";

function makeId() {
  return `collection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getCollections(art = []) {
  let collections = [];
  try {
    collections = JSON.parse(window.localStorage.getItem(COLLECTIONS_KEY) || "[]");
  } catch {
    collections = [];
  }

  if (!Array.isArray(collections) || collections.length === 0) {
    collections = [
      {
        id: makeId(),
        name: "My Collection",
        artworkSources: art.filter((item) => item.selected).map((item) => item.src),
      },
    ];
    saveCollections(collections);
  }
  return collections;
}

export function saveCollections(collections) {
  window.localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
}

export function getActiveCollection(collections) {
  const activeId = window.localStorage.getItem(ACTIVE_COLLECTION_KEY);
  const active = collections.find((collection) => collection.id === activeId);
  const fallback = active || collections[0];
  if (fallback) setActiveCollection(fallback.id);
  return fallback;
}

export function setActiveCollection(collectionId) {
  window.localStorage.setItem(ACTIVE_COLLECTION_KEY, collectionId);
}

export function createCollection(collections, name) {
  const collection = { id: makeId(), name: name.trim(), artworkSources: [] };
  const updated = [...collections, collection];
  saveCollections(updated);
  setActiveCollection(collection.id);
  return { collection, collections: updated };
}

export function toggleArtworkInCollection(collections, collectionId, artworkSrc) {
  const updated = collections.map((collection) => {
    if (collection.id !== collectionId) return collection;
    const included = collection.artworkSources.includes(artworkSrc);
    return {
      ...collection,
      artworkSources: included
        ? collection.artworkSources.filter((src) => src !== artworkSrc)
        : [...collection.artworkSources, artworkSrc],
    };
  });
  saveCollections(updated);
  return updated;
}

export function applyCollection(art, collection) {
  const sources = new Set(collection?.artworkSources || []);
  return art.map((item) => ({ ...item, selected: sources.has(item.src) }));
}

export function getActiveCollectionArt(art) {
  const collections = getCollections(art);
  const collection = getActiveCollection(collections);
  return {
    collection,
    collections,
    artworks: art.filter((item) => collection?.artworkSources.includes(item.src)),
  };
}
