import Layout from "@/components/Layout";
import { requestedArtwork } from "@/data/art";

export default function RequestedPaintings() {
  return (
    <Layout title="Requested">
      <main className="w-full max-w-[680px] px-4">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Import backlog
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Requested paintings
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
            These searches found no image that the importer could safely add.
            They are kept here for manual research and review.
          </p>
        </div>

        {requestedArtwork.length === 0 ? (
          <div className="border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700">
              ✓
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No outstanding requests
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Every requested painting currently has an importable image.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requestedArtwork.map((item, index) => (
              <article
                className="border border-slate-200 bg-white p-5 shadow-sm"
                key={item.museumId || `${item.requestedQuery}-${index}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                      {item.name}
                    </h2>
                    {item.artist || item.date ? (
                      <p className="mt-1 text-sm text-slate-600">
                        {item.artist || "Unknown artist"}
                        {item.date ? ` · ${item.date}` : ""}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                    Requested
                  </span>
                </div>

                <dl className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Search
                    </dt>
                    <dd className="mt-1 text-slate-700">{item.requestedQuery}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Why it wasn’t added
                    </dt>
                    <dd className="mt-1 text-slate-700">{item.reason}</dd>
                  </div>
                  {item.location ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Location
                      </dt>
                      <dd className="mt-1 text-slate-700">{item.location}</dd>
                    </div>
                  ) : null}
                </dl>

                {item.sourceUrl ? (
                  <a
                    className="mt-5 inline-flex items-center gap-1 border-b border-slate-400 pb-0.5 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900"
                    href={item.sourceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View {item.source || "source record"}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
