import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import MiniPlayer from '../../components/ui/MiniPlayer';
import AuthModal from '../../components/ui/AuthModal';
import WelcomeHeader from './components/WelcomeHeader';
import RecentlyPlayedSection from './components/RecentlyPlayedSection';
import RecommendedSection from './components/RecommendedSection';
import TrendingSection from './components/TrendingSection';
import QuickActionsSection from './components/QuickActionsSection';
import FriendActivitySection from './components/FriendActivitySection';
import { getTrendingSongs } from '../../api/songs';
import useYouTubePlayer from '../../hooks/useYouTubePlayer';
import { getFavoriteIds, toggleFavorite, getFavoriteTracks } from '../../utils/favorites';

const MusicDashboardHome = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Music player state
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const yt = useYouTubePlayer();

  // Data state
  const [recentTracks, setRecentTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [friendActivity, setFriendActivity] = useState([]);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [likedIds, setLikedIds] = useState(() => getFavoriteIds());

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Load initial data
    loadDashboardData();
  }, []);

  // If navigated with state to play from favorites
  useEffect(() => {
    const state = location?.state;
    if (state?.playFrom === 'favorites') {
      const favs = getFavoriteTracks();
      if (favs.length) {
        setQueue(favs);
        const startIndex = state.trackId ? favs.findIndex(t => t.id === state.trackId) : 0;
        setQueueIndex(startIndex >= 0 ? startIndex : 0);
        handlePlayTrack(favs[startIndex >= 0 ? startIndex : 0]);
      }
    }
  }, [location?.state]);

  // Sync YT time to UI
  useEffect(() => {
    if (!currentTrack?.youtubeId) return;
    setProgress(Math.floor(yt.currentTime || 0));
    if (currentTrack && typeof yt.duration === 'number' && currentTrack.duration !== Math.floor(yt.duration || 0)) {
      setCurrentTrack((t) => t ? { ...t, duration: Math.floor(yt.duration || 0) } : t);
    }
  }, [yt.currentTime, yt.duration, currentTrack?.youtubeId]);

  const loadDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const trending = await getTrendingSongs({ limit: 10 });
      // Normalize to component's expected shape if backend differs
      const normalized = (Array.isArray(trending) ? trending : trending?.items || []).map((t, idx) => ({
        id: t.id ?? t._id ?? idx,
        title: t.title ?? t.name,
        artist: t.artist ?? t.artists?.join(', '),
        album: t.album ?? t.albumName,
        artwork: t.coverUrl ?? t.artwork ?? t.imageUrl,
        duration: t.durationSeconds ?? t.duration ?? 0,
        rank: t.rank ?? (idx + 1),
        change: t.change ?? 'same',
        changeValue: t.changeValue ?? 0
      }));
      
      // Add the Gujarati song to trending tracks
      const gujaratiSong = {
        id: 'gujarati-song-1',
        title: 'Dhanya Dhanya Dwarikawala',
        artist: 'Sabhiben Ahir',
        album: 'Song of Faith',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        duration: 240, // 4 minutes
        rank: 1,
        change: 'new',
        changeValue: 0,
        audioUrl: 'file:///c:/Users/shubh/OneDrive/Desktop/Dhanya%20Dhanya%20Dwarikawala%20I%20Sabhiben%20Ahir%20I%20@RAJESH_AHIR%20I%20Song%20of%20Faith%20I%20New%20Gujarati%20Song%202025.mp3'
      };
      
      // Ensure the requested YouTube song is present
      const ytId = 'DOvG7MC8i7E';
      const already = normalized.some(t => t.youtubeId === ytId || String(t.id) === `yt-${ytId}`);
      const injected = already ? normalized : [
        {
          id: `yt-${ytId}`,
          title: 'YouTube Song',
          artist: 'YouTube',
          album: 'Single',
          artwork: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
          duration: 0,
          rank: (normalized.length + 1),
          change: 'same',
          changeValue: 0,
          youtubeId: ytId
        },
        ...normalized
      ];
      
      // Combine Gujarati song with other tracks
      const allTracks = [gujaratiSong, ...injected];
      setTrendingTracks(allTracks);
      if (!queue || queue.length === 0) {
        setQueue(allTracks);
        setQueueIndex(0);
      }
    } catch (e) {
      // Fallback to defaults already handled inside component
      console.error('Failed to load trending songs', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') { e.preventDefault(); handlePlayPause(); }
      if (e.code === 'ArrowRight') { handleSeek(Math.min((currentTrack?.currentTime || progress) + 5, currentTrack?.duration || 0)); }
      if (e.code === 'ArrowLeft') { handleSeek(Math.max((currentTrack?.currentTime || progress) - 5, 0)); }
      if (e.code === 'ArrowUp') { handleVolumeChange(Math.min(volume + 0.05, 1)); }
      if (e.code === 'ArrowDown') { handleVolumeChange(Math.max(volume - 0.05, 0)); }
      if (e.code === 'BracketRight') { handleNext(); }
      if (e.code === 'BracketLeft') { handlePrevious(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentTrack, progress, volume, isPlaying]);

  const handleAuth = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleRefresh = async () => {
    await loadDashboardData();
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    // Load appropriate source
    if (track?.youtubeId) {
      yt.load(track.youtubeId);
      setTimeout(() => yt.play(), 0);
    } else if (track?.audioUrl) {
      if (!audioRef.current) return;
      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
    }
  };

  const handlePlayPause = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (currentTrack?.youtubeId) {
      next ? yt.play() : yt.pause();
    } else if (audioRef.current) {
      next ? audioRef.current.play() : audioRef.current.pause();
    }
  };

  const handleNext = () => {
    if (queue.length === 0) return;
    const nextIndex = (queueIndex + 1) % queue.length;
    setQueueIndex(nextIndex);
    handlePlayTrack(queue[nextIndex]);
  };

  const handlePrevious = () => {
    if (queue.length === 0) return;
    const prevIndex = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prevIndex);
    handlePlayTrack(queue[prevIndex]);
  };

  const handleSeek = (time) => {
    setProgress(time);
    if (currentTrack?.youtubeId) {
      yt.seekTo(time);
    } else if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (currentTrack?.youtubeId) {
      yt.setVolume(newVolume);
    } else if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleLikeTrack = (trackId) => {
    const track = [currentTrack, ...trendingTracks, ...recommendations, ...recentTracks].find(t => t && t.id === trackId);
    const nextIds = toggleFavorite(track);
    setLikedIds(nextIds);
  };

  const handleCreatePlaylist = () => {
    // Navigate to playlist creation or show modal
    console.log('Create playlist');
  };

  const handleViewLikedSongs = () => {
    // Navigate to liked songs
    console.log('View liked songs');
  };

  const handleFollowFriend = (user) => {
    // Implement follow logic
    setFriendActivity(prev =>
      prev?.map(activity =>
        activity?.user?.name === user?.name
          ? { ...activity, user: { ...activity?.user, isFollowing: true } }
          : activity
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden media elements */}
      <audio ref={audioRef} hidden onTimeUpdate={(e) => setProgress(e.target.currentTime)} onLoadedMetadata={(e) => {
        setCurrentTrack((t) => t ? { ...t, duration: Math.floor(e.target.duration || 0) } : t);
      }} onEnded={() => setIsPlaying(false)} />
      <div id={yt.containerId} style={{ display: 'none' }} />
      {/* Header */}
      <Header
        currentUser={currentUser}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onAuthModalOpen={() => setIsAuthModalOpen(true)}
      />

      {/* Sidebar - Desktop only */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main className={`pt-nav pb-nav lg:pb-mini-player transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-8">
          {/* Welcome Header */}
          <WelcomeHeader
            currentUser={currentUser}
            onRefresh={handleRefresh}
          />

          {/* Recently Played Section */}
          <RecentlyPlayedSection
            recentTracks={recentTracks}
            onPlayTrack={handlePlayTrack}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Section */}
              <RecommendedSection
                recommendations={recommendations}
                onPlayTrack={handlePlayTrack}
                onLikeTrack={handleLikeTrack}
              />

              {/* Trending Section */}
              <TrendingSection
                trendingTracks={trendingTracks}
                onPlayTrack={handlePlayTrack}
              />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <QuickActionsSection
                onCreatePlaylist={handleCreatePlaylist}
                onViewLikedSongs={handleViewLikedSongs}
              />

              {/* Friend Activity - Desktop only */}
              <div className="hidden lg:block">
                <FriendActivitySection
                  friendActivity={friendActivity}
                  onFollowFriend={handleFollowFriend}
                />
              </div>
            </div>
          </div>

          {/* Friend Activity - Mobile */}
          <div className="lg:hidden">
            <FriendActivitySection
              friendActivity={friendActivity}
              onFollowFriend={handleFollowFriend}
            />
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNavigation />

      {/* Mini Player */}
      <MiniPlayer
        isExpanded={isPlayerExpanded}
        onToggleExpanded={() => setIsPlayerExpanded(!isPlayerExpanded)}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        progress={progress}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isLiked={currentTrack ? likedIds.includes(currentTrack.id) : false}
        onToggleLike={() => currentTrack && handleLikeTrack(currentTrack.id)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />

      {/* Loading Overlay */}
      {isRefreshing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-foreground font-medium">Refreshing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicDashboardHome;