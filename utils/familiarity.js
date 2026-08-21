const FAMILIARITY_KEY = "art-game-familiarity-v1";
const DISCOVER_KEY = "art-game-discover-v1";
const DISMISSAL_COOLDOWN = 30 * 24 * 60 * 60 * 1000;

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFamiliarity() {
  return read(FAMILIARITY_KEY, {});
}

export function recordFamiliarity(src, event) {
  if (!src) return;
  const records = getFamiliarity();
  const current = records[src] || {};
  records[src] = {
    ...current,
    [event]: (current[event] || 0) + 1,
    lastInteraction: Date.now(),
  };
  write(FAMILIARITY_KEY, records);
}

export function dismissForNow(src) {
  const records = getFamiliarity();
  records[src] = {
    ...(records[src] || {}),
    dismissals: (records[src]?.dismissals || 0) + 1,
    dismissedUntil: Date.now() + DISMISSAL_COOLDOWN,
    lastInteraction: Date.now(),
  };
  write(FAMILIARITY_KEY, records);
}

function familiarityScore(record = {}) {
  return (
    (record.correct || 0) * 4 +
    (record.gotIt || 0) * 2 +
    (record.opened || 0) +
    (record.shown || 0) * 0.2 -
    (record.incorrect || 0) * 2 -
    (record.again || 0)
  );
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function chooseVaried(candidates, count, records) {
  if (candidates.length <= count) return shuffled(candidates);
  const ranked = [...candidates].sort(
    (a, b) => familiarityScore(records[b.src]) - familiarityScore(records[a.src])
  );
  const third = Math.ceil(ranked.length / 3);
  const bands = [ranked.slice(0, third), ranked.slice(third, third * 2), ranked.slice(third * 2)];
  const pattern = [0, 1, 2, 1, 2];
  const choices = [];
  for (const bandIndex of pattern) {
    const available = shuffled(bands[bandIndex]).find((item) => !choices.includes(item));
    if (available) choices.push(available);
    if (choices.length === count) return choices;
  }
  return [...choices, ...shuffled(ranked.filter((item) => !choices.includes(item)))].slice(0, count);
}

export function getDiscoverArt(art, count = 5) {
  const records = getFamiliarity();
  const saved = read(DISCOVER_KEY, []);
  const eligible = art.filter((item) => (records[item.src]?.dismissedUntil || 0) <= Date.now());
  const current = saved
    .map((src) => eligible.find((item) => item.src === src))
    .filter(Boolean)
    .slice(0, count);
  const additions = chooseVaried(
    eligible.filter((item) => !current.some((chosen) => chosen.src === item.src)),
    count - current.length,
    records
  );
  const result = [...current, ...additions];
  write(DISCOVER_KEY, result.map((item) => item.src));
  return result;
}

export function removeFromDiscover(src) {
  const saved = read(DISCOVER_KEY, []).filter((itemSrc) => itemSrc !== src);
  write(DISCOVER_KEY, saved);
  dismissForNow(src);
}
