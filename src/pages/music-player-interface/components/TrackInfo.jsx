import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrackInfo = ({ 
  title = 'Unknown Track',
  artist = 'Unknown Artist',
  album = 'Unknown Album',
  isLiked = false,
  onToggleLike = () => {},
  onShare = () => {},
  onAddToPlaylist = () => {},
  className = ''
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const titleRef = useRef(null);
  const artistRef = useRef(null);

  useEffect(() => {
    const checkOverflow = (element) => {
      if (element) {
        return element?.scrollWidth > element?.clientWidth;
      }
      return false;
    };

    const titleOverflows = checkOverflow(titleRef?.current);
    const artistOverflows = checkOverflow(artistRef?.current);
    
    setIsScrolling(titleOverflows || artistOverflows);
  }, [title, artist]);

  return (
    <div className={`text-center space-y-4 ${className}`}>
      {/* Track Title */}
      <div className="overflow-hidden">
        <h1 
          ref={titleRef}
          className={`text-2xl md:text-3xl font-bold text-foreground ${
            isScrolling ? 'animate-marquee' : ''
          }`}
        >
          {title}
        </h1>
      </div>
      
      {/* Artist Name */}
      <div className="overflow-hidden">
        <p 
          ref={artistRef}
          className={`text-lg md:text-xl text-muted-foreground ${
            isScrolling ? 'animate-marquee' : ''
          }`}
        >
          {artist}
        </p>
      </div>
      
      {/* Album Name */}
      <p className="text-sm text-muted-foreground opacity-80">{album}</p>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-6 pt-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleLike}
          className={`transition-spring hover-lift ${
            isLiked ? 'text-error' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon 
            name={isLiked ? "Heart" : "Heart"} 
            size={24}
            className={isLiked ? 'fill-current' : ''}
          />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddToPlaylist}
          className="text-muted-foreground hover:text-foreground transition-spring hover-lift"
        >
          <Icon name="Plus" size={24} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onShare}
          className="text-muted-foreground hover:text-foreground transition-spring hover-lift"
        >
          <Icon name="Share" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default TrackInfo;