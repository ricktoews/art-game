import Art from "@/data/art";
import profiles from "@/data/artistProfiles.json";

export function getArtistProfiles() {
  return profiles
    .map((profile) => ({
      ...profile,
      artworks: Art.filter((artwork) => artwork.artist === profile.name),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getArtistProfile(slug) {
  return getArtistProfiles().find((profile) => profile.slug === slug);
}

export function getLifeDates(profile) {
  if (!profile.born && !profile.died) return "Dates unknown";
  return `${profile.born || "?"}–${profile.died || "present"}`;
}

export function getPortraitSrc(profile) {
  if (!profile.portrait) return "";
  return profile.portrait.startsWith("http") ? profile.portrait : `/${profile.portrait}`;
}
