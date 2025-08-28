import React, { useState } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const MiniPlayer = ({ 
  isExpanded = false, 
  onToggleExpanded = () => {},
  currentTrack = null,
  isPlaying = false,
  onPlayPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
  progress = 0,
  onSeek = () => {},
  volume = 0.8,
  onVolumeChange = () => {},
  isLiked = false,
  onToggleLike = () => {},
  className = ''
}) => {
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);

  const defaultTrack = {
    title: 'No track selected',
    artist: 'Select a song to play',
    album: 'Unknown Album',
    artwork: '/assets/images/no_image.png',
    duration: 0,
    currentTime: 0
  };

  const track = currentTrack || defaultTrack;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (isExpanded) {
    return (
      <div className={`fixed inset-0 z-40 bg-background flex flex-col ${className}`}>
        {/* Expanded Player Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
          >
            <Icon name="ChevronDown" size={20} />
          </Button>
          <h2 className="text-sm font-medium text-muted-foreground">Now Playing</h2>
          <Button variant="ghost" size="icon">
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
        {/* Expanded Player Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
          {/* Large Artwork */}
          <div className="w-80 h-80 max-w-full aspect-square">
            <Image
              src={track?.artwork}
              alt={`${track?.title} artwork`}
              className="w-full h-full object-cover rounded-lg shadow-elevation"
            />
          </div>

          {/* Track Info */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{track?.title}</h1>
            <p className="text-lg text-muted-foreground">{track?.artist}</p>
            <p className="text-sm text-muted-foreground">{track?.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md space-y-2">
            <div className="relative">
              <input
                type="range"
                min="0"
                max={track?.duration || 100}
                value={track?.currentTime || 0}
                onChange={(e) => onSeek(parseInt(e?.target?.value))}
                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>{formatTime(track?.currentTime || 0)}</span>
              <span>{formatTime(track?.duration || 0)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <Icon name="SkipBack" size={24} />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={onPlayPause}
              className="w-14 h-14"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <Icon name="SkipForward" size={24} />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <Icon name="Volume2" size={16} color="var(--color-muted-foreground)" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e?.target?.value))}
              className="w-24 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-nav lg:bottom-0 left-0 right-0 lg:left-64 z-10 glass shadow-elevation-high ${className}`}>
      <div className="flex items-center h-mini-player px-4 space-x-4">
        {/* Track Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 flex-shrink-0">
            <Image
              src={track?.artwork}
              alt={`${track?.title} artwork`}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">{track?.title}</p>
            <p className="text-xs text-muted-foreground truncate">{track?.artist}</p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={onToggleLike}>
            <Icon name="Heart" size={16} color={isLiked ? 'var(--color-error)' : undefined} />
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={onPrevious} className="hidden sm:flex">
            <Icon name="SkipBack" size={16} />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="w-10 h-10"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="hidden sm:flex">
            <Icon name="SkipForward" size={16} />
          </Button>
        </div>

        {/* Progress & Volume */}
        <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md">
          <span className="text-xs text-muted-foreground font-mono w-10">
            {formatTime(track?.currentTime || 0)}
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max={track?.duration || 100}
              value={track?.currentTime || 0}
              onChange={(e) => onSeek(parseInt(e?.target?.value))}
              className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono w-10">
            {formatTime(track?.duration || 0)}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            className="lg:hidden"
          >
            <Icon name="ChevronUp" size={16} />
          </Button>
          
          <div 
            className="hidden lg:flex items-center space-x-2"
            onMouseEnter={() => setIsVolumeHovered(true)}
            onMouseLeave={() => setIsVolumeHovered(false)}
          >
            <Button variant="ghost" size="icon">
              <Icon name="Volume2" size={16} />
            </Button>
            {isVolumeHovered && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e?.target?.value))}
                className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;