import Link from "next/link";
import Layout from "@/components/Layout";
import { getArtMovement } from "@/data/artMovements";
import { getArtistProfile, getArtistProfiles, getLifeDates, getPortraitSrc } from "@/utils/artists";

export default function ArtistProfile({ artist, movement }) {
  return (
    <Layout title={artist.name}>
      <main className="w-full max-w-4xl px-5">
        <Link className="mb-7 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900" href="/artists">← All artists</Link>

        <article>
          <header className="grid gap-8 border-b border-slate-200 pb-10 md:grid-cols-[minmax(230px,0.75fr)_1.25fr] md:items-center">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 shadow-md">
              {artist.portrait ? (
                <img alt={`Portrait of ${artist.name}`} className="h-full w-full object-cover object-top" src={getPortraitSrc(artist)} />
              ) : (
                <div className="flex h-full items-center justify-center text-7xl font-serif text-slate-400">{artist.name.charAt(0)}</div>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Get to know the artist</p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-900">{artist.name}</h1>
              <p className="mt-3 text-lg text-slate-500">{getLifeDates(artist)}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{movement}</p>
              {artist.biography ? <p className="mt-6 whitespace-pre-line leading-7 text-slate-700">{artist.biography}</p> : <p className="mt-6 italic text-slate-500">Biography coming soon.</p>}
              {artist.sourceUrl ? <a className="mt-4 inline-block text-xs text-slate-400 underline hover:text-slate-700" href={artist.sourceUrl} rel="noreferrer" target="_blank">Biography and portrait source</a> : null}
            </div>
          </header>

          <section className="py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Major works</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">In this collection</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artist.artworks.map((artwork) => (
                <div className="border border-slate-200 bg-white p-3 shadow-sm" key={artwork.src}>
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img alt={artwork.name} className="h-full w-full object-contain" src={`/${artwork.src}`} />
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900">{artwork.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{artwork.date}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: getArtistProfiles().map((artist) => ({ params: { slug: artist.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const artist = getArtistProfile(params.slug);
  const movement = artist.artworks[0] ? getArtMovement(artist.artworks[0]) : "Unclassified";
  return { props: { artist, movement } };
}
