import { useEffect } from "react";
import Link from "next/link";
import { getArtMovement } from "@/data/artMovements";
import { getArtistProfileByName, getLifeDates, getPortraitSrc } from "@/utils/artists";

export default function PaintingPopup({
  toggleItemSelect,
  active,
  setPopupOpen,
  popupItem,
}) {
  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setPopupOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, setPopupOpen]);

  if (!active || !popupItem?.src) return null;

  const selected = !!popupItem.selected;
  const artist = getArtistProfileByName(popupItem.artist);
  const movement = getArtMovement(popupItem);
  const biography = artist?.biography
    ?.split("\n")
    .filter(Boolean)
    .slice(0, 2)
    .join("\n\n");
  const actionLabel = selected
    ? "Remove from Practice & Game"
    : "Add to Practice & Game";

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) setPopupOpen(false);
  };

  return (
    <div
      aria-label={`${popupItem.name} details`}
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="flex h-[100dvh] max-h-[100dvh] w-full max-w-lg flex-col overflow-hidden bg-white text-slate-900 shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:rounded-sm">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Artwork details</span>
          <button
            aria-label="Close painting details"
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-slate-700 transition hover:bg-slate-100 hover:text-black"
            onClick={() => setPopupOpen(false)}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative flex w-full items-center justify-center bg-slate-100 p-6 sm:p-8">
            <img
              alt={popupItem.name}
              className={`max-h-[38dvh] max-w-full object-contain shadow-md transition sm:max-h-[50vh] ${
                selected ? "" : "saturate-[.65]"
              }`}
              src={popupItem.src}
            />
            {selected ? (
              <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white shadow-md sm:bottom-6 sm:right-6">
                <span aria-hidden="true">✓</span>
                <span className="sr-only">Selected</span>
              </span>
            ) : null}
          </div>

          <div className="p-6 sm:p-8">
            <div
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] ${
                selected ? "text-emerald-700" : "text-slate-500"
              }`}
            >
              {selected ? "Selected" : "Not selected"}
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">
              {popupItem.name}
            </h2>
            <p className="mt-2 text-base text-slate-600">
              {popupItem.artist}
              {popupItem.date ? ` · ${popupItem.date}` : ""}
            </p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-slate-200 pt-5 text-sm">
              <dt className="font-medium text-slate-500">Movement</dt>
              <dd className="text-slate-800">{movement}</dd>
              {popupItem.location ? (
                <>
                  <dt className="font-medium text-slate-500">Collection</dt>
                  <dd className="text-slate-800">{popupItem.location}</dd>
                </>
              ) : null}
            </dl>

            {artist ? (
              <section className="mt-7 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-4">
                  {artist.portrait ? (
                    <img
                      alt={`Portrait of ${artist.name}`}
                      className="h-16 w-16 shrink-0 rounded-full object-cover object-top"
                      src={getPortraitSrc(artist)}
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 font-serif text-2xl text-slate-400">
                      {artist.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">About the artist</div>
                    <h3 className="mt-1 font-semibold text-slate-900">{artist.name}</h3>
                    <p className="text-sm text-slate-500">{getLifeDates(artist)}</p>
                  </div>
                </div>
                {biography ? (
                  <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">{biography}</p>
                ) : null}
                <Link
                  className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  href={`/artists/${artist.slug}`}
                >
                  Get to know {artist.name} →
                </Link>
              </section>
            ) : null}

            {popupItem.sourceUrl ? (
              <a className="mt-6 inline-block text-xs text-slate-400 underline hover:text-slate-700" href={popupItem.sourceUrl} rel="noreferrer" target="_blank">
                Artwork source
              </a>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:px-8 sm:py-5" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <button
            className={`w-full px-5 py-3 text-sm font-semibold transition ${
              selected
                ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
            onClick={toggleItemSelect}
            type="button"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
