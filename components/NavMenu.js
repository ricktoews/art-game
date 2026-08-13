import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { href: "/", label: "Gallery", description: "Choose your paintings" },
  { href: "/practice", label: "Practice", description: "Learn with flashcards" },
  { href: "/game", label: "Game", description: "Test your memory" },
  { href: "/heist", label: "The Heist", description: "Recover the stolen works" },
  { href: "/puzzle", label: "Forgery Puzzle", description: "Find and restore the fakes" },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <nav ref={menuRef} aria-label="Main navigation">
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="fixed left-3 top-2 z-30 flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="relative block h-4 w-6" aria-hidden="true">
          <span
            className={`absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] block h-px w-5 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] block h-px w-6 bg-current transition-transform duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open ? (
        <div className="fixed left-3 top-14 z-20 w-64 overflow-hidden rounded-sm border border-slate-200 bg-white text-slate-900 shadow-xl">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Art Game
            </div>
          </div>
          <div className="p-2">
            {menuItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`block border-l-2 px-4 py-3 transition ${
                    active
                      ? "border-emerald-600 bg-emerald-50 text-slate-900"
                      : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {item.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
