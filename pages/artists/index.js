import Link from "next/link";
import Layout from "@/components/Layout";
import { getArtistProfiles, getLifeDates, getPortraitSrc } from "@/utils/artists";

export default function Artists({ artists }) {
  return (
    <Layout title="Artists">
      <main className="w-full max-w-4xl px-5">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Meet the artists</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">The people behind the paintings</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Explore the lives, movements, and works of every artist represented in the gallery.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <Link className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href={`/artists/${artist.slug}`} key={artist.slug}>
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                {artist.portrait ? (
                  <img alt={`Portrait of ${artist.name}`} className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]" src={getPortraitSrc(artist)} />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl font-serif text-slate-400">{artist.name.charAt(0)}</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-slate-900">{artist.name}</h2>
                <div className="mt-1 text-sm text-slate-500">{getLifeDates(artist)}</div>
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-700">{artist.artworkCount} {artist.artworkCount === 1 ? "work" : "works"} in gallery</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export function getStaticProps() {
  const artists = getArtistProfiles().map(({ artworks, ...artist }) => ({
    ...artist,
    artworkCount: artworks.length,
  }));
  return { props: { artists } };
}
