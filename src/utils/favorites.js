const FAVORITE_IDS_KEY = 'favoriteIds';
const FAVORITE_TRACKS_KEY = 'favoriteTracks';

export function getFavoriteIds() {
  try { return JSON.parse(localStorage.getItem(FAVORITE_IDS_KEY) || '[]'); } catch { return []; }
}

export function getFavoriteTracks() {
  try { return JSON.parse(localStorage.getItem(FAVORITE_TRACKS_KEY) || '[]'); } catch { return []; }
}

export function setFavoriteState(ids, tracks) {
  localStorage.setItem(FAVORITE_IDS_KEY, JSON.stringify(ids || []));
  localStorage.setItem(FAVORITE_TRACKS_KEY, JSON.stringify(tracks || []));
}

export function toggleFavorite(track) {
  if (!track || track.id == null) return getFavoriteIds();
  const ids = getFavoriteIds();
  const tracks = getFavoriteTracks();
  const exists = ids.includes(track.id);
  if (exists) {
    const nextIds = ids.filter(id => id !== track.id);
    const nextTracks = tracks.filter(t => t.id !== track.id);
    setFavoriteState(nextIds, nextTracks);
    return nextIds;
  } else {
    const nextIds = [...ids, track.id];
    const minimal = {
      id: track.id,
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: track.artwork,
      duration: track.duration,
      audioUrl: track.audioUrl,
      youtubeId: track.youtubeId
    };
    const nextTracks = [...tracks, minimal];
    setFavoriteState(nextIds, nextTracks);
    return nextIds;
  }
}


