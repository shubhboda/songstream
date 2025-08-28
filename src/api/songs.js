import apiClient from './client';

export async function addSong(payload) {
  const { title, artist, album, durationSeconds, audioUrl, coverUrl, youtubeId } = payload;
  const response = await apiClient.post('/songs', {
    title,
    artist,
    album,
    durationSeconds,
    audioUrl,
    coverUrl,
    youtubeId
  });
  return response.data;
}

export async function getTrendingSongs(params = {}) {
  // Expected backend route: GET /songs/trending?limit=10&region=US
  const response = await apiClient.get('/songs/trending', { params });
  return response.data;
}


