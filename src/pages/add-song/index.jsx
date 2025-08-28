import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { addSong } from '../../api/songs';

const AddSongPage = () => {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    album: '',
    durationSeconds: '',
    audioUrl: '',
    coverUrl: '',
    youtubeUrl: '',
    youtubeId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    let next = { ...form, [name]: value };
    if (name === 'youtubeUrl') {
      const id = extractYouTubeId(value);
      next.youtubeId = id || '';
      if (!next.coverUrl && id) {
        next.coverUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    }
    setForm(next);
  };

  const extractYouTubeId = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') return u.pathname.replace('/', '');
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const path = u.pathname.split('/');
      const idx = path.findIndex(p => p === 'embed');
      if (idx !== -1 && path[idx + 1]) return path[idx + 1];
      return '';
    } catch {
      return '';
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        durationSeconds: form.durationSeconds ? Number(form.durationSeconds) : undefined,
        youtubeId: form.youtubeId || undefined
      };
      await addSong(payload);
      setSuccess('Song added successfully');
      setForm({ title: '', artist: '', album: '', durationSeconds: '', audioUrl: '', coverUrl: '', youtubeUrl: '', youtubeId: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add song');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Add Song</title>
      </Helmet>
      <div className="max-w-2xl mx-auto pt-24 p-4">
        <h1 className="text-2xl font-semibold mb-6">Add Song</h1>
        <form onSubmit={onSubmit} className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <Input label="Title" name="title" value={form.title} onChange={onChange} required />
          <Input label="Artist" name="artist" value={form.artist} onChange={onChange} required />
          <Input label="Album" name="album" value={form.album} onChange={onChange} />
          <Input label="Duration (seconds)" name="durationSeconds" type="number" value={form.durationSeconds} onChange={onChange} min="0" />
          <Input label="Audio URL" name="audioUrl" value={form.audioUrl} onChange={onChange} required />
          <Input label="Cover Image URL" name="coverUrl" value={form.coverUrl} onChange={onChange} />
          <Input label="YouTube URL (optional)" name="youtubeUrl" value={form.youtubeUrl} onChange={onChange} placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..." />
          {form.youtubeId && (
            <div className="aspect-video w-full rounded overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${form.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Song'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongPage;


