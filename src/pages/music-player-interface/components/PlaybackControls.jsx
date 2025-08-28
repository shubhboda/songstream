import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaybackControls = ({ 
  isPlaying = false,
  isShuffled = false,
  repeatMode = 'off', // 'off', 'all', 'one'
  onPlayPause = () => {},
  onPrevious = () => {},
  onNext = () => {},
  onShuffle = () => {},
  onRepeat = () => {},
  disabled = false,
  className = ''
}) => {
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return 'Repeat1';
      case 'all':
        return 'Repeat';
      default:
        return 'Repeat';
    }
  };

  const getRepeatColor = () => {
    return repeatMode !== 'off' ? 'var(--color-primary)' : 'var(--color-muted-foreground)';
  };

  return (
    <div className={`flex items-center justify-center space-x-8 ${className}`}>
      {/* Shuffle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onShuffle}
        disabled={disabled}
        className={`transition-spring hover-lift ${
          isShuffled ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Icon 
          name="Shuffle" 
          size={20}
          color={isShuffled ? 'var(--color-primary)' : 'currentColor'}
        />
      </Button>
      
      {/* Previous */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={disabled}
        className="text-foreground hover:text-primary transition-spring hover-lift"
      >
        <Icon name="SkipBack" size={28} />
      </Button>
      
      {/* Play/Pause */}
      <Button
        variant="default"
        size="icon"
        onClick={onPlayPause}
        disabled={disabled}
        className="w-16 h-16 bg-primary hover:bg-primary/90 text-white shadow-elevation transition-spring hover-lift"
      >
        <Icon 
          name={isPlaying ? "Pause" : "Play"} 
          size={32}
          color="white"
        />
      </Button>
      
      {/* Next */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={disabled}
        className="text-foreground hover:text-primary transition-spring hover-lift"
      >
        <Icon name="SkipForward" size={28} />
      </Button>
      
      {/* Repeat */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRepeat}
        disabled={disabled}
        className={`transition-spring hover-lift ${
          repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Icon 
          name={getRepeatIcon()} 
          size={20}
          color={getRepeatColor()}
        />
      </Button>
    </div>
  );
};

export default PlaybackControls;