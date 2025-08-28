import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PlayerHeader from './components/PlayerHeader';
import AlbumArtwork from './components/AlbumArtwork';
import TrackInfo from './components/TrackInfo';
import PlaybackControls from './components/PlaybackControls';
import ProgressBar from './components/ProgressBar';
import VolumeControl from './components/VolumeControl';
import QueuePanel from './components/QueuePanel';
import LyricsOverlay from './components/LyricsOverlay';

const MusicPlayerInterface = () => {
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [duration, setDuration] = useState(210);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  
  // UI state
  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Mock current track data
  const currentTrack = {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    duration: 210,
    currentTime: currentTime
  };

  // Simulate playback progress
  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  // Playback controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    console.log('Previous track');
  };

  const handleNext = () => {
    setCurrentTime(0);
    console.log('Next track');
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const handleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes?.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes?.length;
    setRepeatMode(modes?.[nextIndex]);
  };

  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Track actions
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('Share track');
  };

  const handleAddToPlaylist = () => {
    console.log('Add to playlist');
  };

  // Queue actions
  const handleTrackSelect = (track) => {
    console.log('Selected track:', track);
    setShowQueue(false);
  };

  const handleRemoveFromQueue = (trackId) => {
    console.log('Remove from queue:', trackId);
  };

  const handleClearQueue = () => {
    console.log('Clear queue');
  };

  const handleReorderQueue = (oldIndex, newIndex) => {
    console.log('Reorder queue:', oldIndex, newIndex);
  };

  return (
    <>
      <Helmet>
        <title>Now Playing - {currentTrack?.title} by {currentTrack?.artist} | SongStream</title>
        <meta name="description" content={`Listen to ${currentTrack?.title} by ${currentTrack?.artist} on SongStream. Full-screen music player with lyrics, queue management, and playback controls.`} />
      </Helmet>
      <div className="fixed inset-0 bg-background overflow-hidden">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)`
          }}
        />

        {/* Main Player Interface */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <PlayerHeader
            onCollapse={() => console.log('Collapse player')}
            onShowQueue={() => setShowQueue(true)}
            onShowLyrics={() => setShowLyrics(true)}
            showLyrics={showLyrics}
          />

          {/* Player Content */}
          <div className="flex-1 flex flex-col justify-center px-6 py-8 space-y-8">
            {/* Album Artwork */}
            <div className="flex justify-center">
              <AlbumArtwork
                artwork={currentTrack?.artwork}
                title={currentTrack?.title}
                isPlaying={isPlaying}
                className="w-80 h-80 max-w-full"
              />
            </div>

            {/* Track Information */}
            <TrackInfo
              title={currentTrack?.title}
              artist={currentTrack?.artist}
              album={currentTrack?.album}
              isLiked={isLiked}
              onToggleLike={handleToggleLike}
              onShare={handleShare}
              onAddToPlaylist={handleAddToPlaylist}
            />

            {/* Progress Bar */}
            <div className="max-w-md mx-auto w-full">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />
            </div>

            {/* Playback Controls */}
            <PlaybackControls
              isPlaying={isPlaying}
              isShuffled={isShuffled}
              repeatMode={repeatMode}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onShuffle={handleShuffle}
              onRepeat={handleRepeat}
            />

            {/* Volume Control */}
            <div className="flex justify-center">
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onToggleMute={handleToggleMute}
                orientation="horizontal"
              />
            </div>
          </div>
        </div>

        {/* Queue Panel */}
        <QueuePanel
          isVisible={showQueue}
          onClose={() => setShowQueue(false)}
          currentTrack={currentTrack}
          onTrackSelect={handleTrackSelect}
          onRemoveFromQueue={handleRemoveFromQueue}
          onClearQueue={handleClearQueue}
          onReorderQueue={handleReorderQueue}
        />

        {/* Lyrics Overlay */}
        <LyricsOverlay
          isVisible={showLyrics}
          onClose={() => setShowLyrics(false)}
          trackTitle={currentTrack?.title}
          artist={currentTrack?.artist}
          currentTime={currentTime}
        />
      </div>
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        
        .volume-slider-horizontal::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .volume-slider-horizontal::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
};

export default MusicPlayerInterface;