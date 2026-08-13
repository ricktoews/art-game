import { useEffect } from "react";

export default function PaintingPopup({
  toggleItemSelect,
  active,
  collectionName,
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
  const actionLabel = selected
    ? `Remove from ${collectionName}`
    : `Add to ${collectionName}`;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) setPopupOpen(false);
  };

  return (
    <div
      aria-label={`${popupItem.name} details`}
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-sm bg-white text-slate-900 shadow-2xl">
        <button
          aria-label="Close painting details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-slate-700 shadow transition hover:bg-white hover:text-black"
          onClick={() => setPopupOpen(false)}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <button
            aria-label={`${actionLabel}: ${popupItem.name}`}
            className="relative flex w-full cursor-pointer items-center justify-center bg-slate-100 p-6 sm:p-8"
            onClick={toggleItemSelect}
            type="button"
          >
            <img
              alt={popupItem.name}
              className={`max-h-[50vh] max-w-full object-contain shadow-md transition ${
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
          </button>

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
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:px-8 sm:py-5">
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
