import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LyricsOverlay = ({ 
  isVisible = false,
  onClose = () => {},
  trackTitle = 'Unknown Track',
  artist = 'Unknown Artist',
  currentTime = 0,
  lyrics = null,
  className = ''
}) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const mockLyrics = [
    { time: 0, text: "Yeah, I've been feeling so down" },
    { time: 5, text: "I think they need to know now" },
    { time: 10, text: "I think I\'ll tell them today" },
    { time: 15, text: "I\'ve been holding it back for so long" },
    { time: 20, text: "But I think they need to know" },
    { time: 25, text: "Before I let go" },
    { time: 30, text: "" },
    { time: 32, text: "I can\'t keep pretending" },
    { time: 37, text: "That everything\'s okay" },
    { time: 42, text: "When I\'m breaking inside" },
    { time: 47, text: "And I can\'t find my way" },
    { time: 52, text: "Back to who I used to be" },
    { time: 57, text: "Before the world got heavy" },
    { time: 62, text: "" },
    { time: 65, text: "So I\'ll sing it out loud" },
    { time: 70, text: "Let the music take control" },
    { time: 75, text: "Every word from my heart" },
    { time: 80, text: "Every beat of my soul" },
    { time: 85, text: "This is who I am" },
    { time: 90, text: "This is my story to tell" },
    { time: 95, text: "" },
    { time: 98, text: "And I won\'t apologize" },
    { time: 103, text: "For the tears that I\'ve cried" },
    { time: 108, text: "Or the dreams that I\'ve chased" },
    { time: 113, text: "Through the darkest of nights" },
    { time: 118, text: "I\'m still standing here" },
    { time: 123, text: "With my head held high" }
  ];

  const displayLyrics = lyrics || mockLyrics;

  const getCurrentLyricIndex = () => {
    for (let i = displayLyrics?.length - 1; i >= 0; i--) {
      if (currentTime >= displayLyrics?.[i]?.time) {
        return i;
      }
    }
    return 0;
  };

  const currentLyricIndex = getCurrentLyricIndex();

  useEffect(() => {
    const currentElement = document.getElementById(`lyric-${currentLyricIndex}`);
    if (currentElement && !isScrolling) {
      currentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentLyricIndex, isScrolling]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-40 bg-background ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={24} />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Lyrics</h2>
            <p className="text-sm text-muted-foreground">{trackTitle} • {artist}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Share" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>
      {/* Lyrics Content */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-8"
        onScroll={() => setIsScrolling(true)}
        onScrollEnd={() => setIsScrolling(false)}
      >
        {displayLyrics?.length > 0 ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {displayLyrics?.map((lyric, index) => (
              <div
                key={index}
                id={`lyric-${index}`}
                className={`transition-all duration-300 ${
                  index === currentLyricIndex
                    ? 'text-foreground text-2xl md:text-3xl font-semibold scale-105'
                    : index < currentLyricIndex
                    ? 'text-muted-foreground/60 text-lg md:text-xl'
                    : 'text-muted-foreground text-lg md:text-xl'
                }`}
              >
                {lyric?.text || (
                  (<div className="h-8" />) // Empty space for instrumental breaks
                )}
              </div>
            ))}
            
            {/* End spacing */}
            <div className="h-32" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Icon name="FileText" size={64} className="mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No lyrics available
            </h3>
            <p className="text-muted-foreground max-w-md">
              Lyrics for "{trackTitle}" by {artist} are not available at the moment.
            </p>
          </div>
        )}
      </div>
      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-surface/80 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">
              {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60))?.toString()?.padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyricsOverlay;