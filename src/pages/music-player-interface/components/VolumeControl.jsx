import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VolumeControl = ({ 
  volume = 0.8,
  isMuted = false,
  onVolumeChange = () => {},
  onToggleMute = () => {},
  orientation = 'horizontal', // 'horizontal' or 'vertical'
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return 'VolumeX';
    if (volume < 0.3) return 'Volume';
    if (volume < 0.7) return 'Volume1';
    return 'Volume2';
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    onVolumeChange(newVolume);
  };

  const isVertical = orientation === 'vertical';

  return (
    <div 
      className={`flex items-center space-x-3 ${isVertical ? 'flex-col space-x-0 space-y-3' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Volume Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleMute}
        className="text-muted-foreground hover:text-foreground transition-spring"
      >
        <Icon name={getVolumeIcon()} size={20} />
      </Button>
      
      {/* Volume Slider */}
      <div className={`relative ${isVertical ? 'h-24 w-1' : 'w-24 h-1'} ${
        isHovered || isDragging ? 'opacity-100' : 'opacity-70'
      } transition-opacity duration-200`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className={`${
            isVertical 
              ? 'volume-slider-vertical h-full w-1 -rotate-90 origin-center' :'volume-slider-horizontal w-full h-1'
          } bg-muted rounded-lg appearance-none cursor-pointer transition-all duration-200 hover:h-2`}
          style={{
            background: `linear-gradient(to ${isVertical ? 'top' : 'right'}, var(--color-primary) 0%, var(--color-primary) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) 100%)`
          }}
        />
        
        {/* Volume Percentage Tooltip */}
        {(isHovered || isDragging) && (
          <div className={`absolute ${
            isVertical 
              ? 'left-full ml-2 top-1/2 transform -translate-y-1/2' 
              : 'top-full mt-2 left-1/2 transform -translate-x-1/2'
          } px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-elevation whitespace-nowrap z-10`}>
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeControl;