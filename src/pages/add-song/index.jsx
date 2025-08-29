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
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'audio') {
      setAudioFile(file);
      // Auto-fill title if it's empty
      if (!form.title && file) {
        const fileName = file.name.replace('.mp3', '').replace('.wav', '').replace('.m4a', '');
        setForm(prev => ({ ...prev, title: fileName }));
      }
    } else if (type === 'cover') {
      setCoverFile(file);
    }
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
      // For now, we'll use the form data
      // In a real app, you'd upload files to a server first
      const payload = {
        ...form,
        durationSeconds: form.durationSeconds ? Number(form.durationSeconds) : undefined,
        youtubeId: form.youtubeId || undefined
      };
      
      // If we have a local file, we could create a local URL for demo
      if (audioFile) {
        payload.audioUrl = URL.createObjectURL(audioFile);
        payload.title = payload.title || audioFile.name.replace('.mp3', '').replace('.wav', '').replace('.m4a', '');
      }
      
      await addSong(payload);
      setSuccess('Song added successfully!');
      setForm({ title: '', artist: '', album: '', durationSeconds: '', audioUrl: '', coverUrl: '', youtubeUrl: '', youtubeId: '' });
      setAudioFile(null);
      setCoverFile(null);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add song');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Add Song - SongStream</title>
        <meta name="description" content="Add new songs to your music library" />
      </Helmet>
      <div className="max-w-2xl mx-auto pt-24 p-4">
        <h1 className="text-2xl font-semibold mb-6">Add New Song</h1>
        <form onSubmit={onSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
          
          {/* File Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Upload Music Files</h3>
            
            {/* Audio File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Audio File (MP3, WAV, M4A)
              </label>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.aac"
                onChange={(e) => handleFileChange(e, 'audio')}
                className="w-full p-2 border border-border rounded-md bg-input text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {audioFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Cover Image (JPG, PNG)
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => handleFileChange(e, 'cover')}
                className="w-full p-2 border border-border rounded-md bg-input text-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {coverFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {coverFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Song Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Title" 
                name="title" 
                value={form.title} 
                onChange={onChange} 
                required 
                placeholder="Song title"
              />
              <Input 
                label="Artist" 
                name="artist" 
                value={form.artist} 
                onChange={onChange} 
                required 
                placeholder="Artist name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input 
                label="Album" 
                name="album" 
                value={form.album} 
                onChange={onChange} 
                placeholder="Album name"
              />
              <Input 
                label="Duration (seconds)" 
                name="durationSeconds" 
                type="number" 
                value={form.durationSeconds} 
                onChange={onChange} 
                min="0" 
                placeholder="180"
              />
            </div>

            {/* Alternative: URL inputs */}
            <div className="mt-4 space-y-4">
              <Input 
                label="Audio URL (alternative to file upload)" 
                name="audioUrl" 
                value={form.audioUrl} 
                onChange={onChange} 
                placeholder="https://example.com/song.mp3"
              />
              <Input 
                label="Cover Image URL (alternative to file upload)" 
                name="coverUrl" 
                value={form.coverUrl} 
                onChange={onChange} 
                placeholder="https://example.com/cover.jpg"
              />
              <Input 
                label="YouTube URL (optional)" 
                name="youtubeUrl" 
                value={form.youtubeUrl} 
                onChange={onChange} 
                placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..." 
              />
            </div>

            {/* YouTube Preview */}
            {form.youtubeId && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  YouTube Preview
                </label>
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
              </div>
            )}
          </div>

          {/* Status Messages */}
          {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">{error}</p>}
          {success && <p className="text-green-600 text-sm bg-green-50 p-3 rounded border border-green-200">{success}</p>}
          
          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Adding Song...' : 'Add Song to Library'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongPage;


