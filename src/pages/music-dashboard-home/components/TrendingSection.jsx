import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingSection = ({ trendingTracks = [], onPlayTrack = () => {} }) => {
  const defaultTrending = [
    {
      id: 12,
      title: "Unholy",
      artist: "Sam Smith ft. Kim Petras",
      album: "Gloria",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=300&h=300&fit=crop",
      duration: 156,
      rank: 1,
      change: "up",
      changeValue: 2
    },
    {
      id: 13,
      title: "I'm Good (Blue)",
      artist: "David Guetta & Bebe Rexha",
      album: "Single",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      duration: 175,
      rank: 2,
      change: "same",
      changeValue: 0
    },
    {
      id: 14,
      title: "Creepin'",
      artist: "Metro Boomin, The Weeknd, 21 Savage",
      album: "Heroes & Villains",
      artwork: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=300&h=300&fit=crop",
      duration: 221,
      rank: 3,
      change: "up",
      changeValue: 1
    },
    {
      id: 15,
      title: "Tití Me Preguntó",
      artist: "Bad Bunny",
      album: "Un Verano Sin Ti",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 226,
      rank: 4,
      change: "down",
      changeValue: 1
    },
    {
      id: 16,
      title: "Shivers",
      artist: "Ed Sheeran",
      album: "=",
      artwork: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=300&h=300&fit=crop",
      duration: 207,
      rank: 5,
      change: "up",
      changeValue: 3
    }
  ];

  const tracks = trendingTracks?.length > 0 ? trendingTracks : defaultTrending;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getRankChangeIcon = (change) => {
    switch (change) {
      case 'up':
        return <Icon name="TrendingUp" size={12} color="var(--color-success)" />;
      case 'down':
        return <Icon name="TrendingDown" size={12} color="var(--color-error)" />;
      default:
        return <Icon name="Minus" size={12} color="var(--color-muted-foreground)" />;
    }
  };

  const getRankChangeColor = (change) => {
    switch (change) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
        <Link 
          to="/search-and-discovery" 
          className="text-sm text-primary hover:underline font-medium"
        >
          See all
        </Link>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {tracks?.map((track, index) => (
          <div
            key={track?.id}
            className={`flex items-center p-4 hover:bg-surface/50 transition-spring group cursor-pointer ${
              index !== tracks?.length - 1 ? 'border-b border-border' : ''
            }`}
            onClick={() => onPlayTrack(track)}
          >
            {/* Rank */}
            <div className="flex items-center space-x-2 w-12 flex-shrink-0">
              <span className="text-lg font-bold text-muted-foreground">
                {track?.rank}
              </span>
              <div className="flex items-center">
                {getRankChangeIcon(track?.change)}
              </div>
            </div>
            
            {/* Artwork */}
            <div className="relative flex-shrink-0 mr-4">
              <div className="w-12 h-12 overflow-hidden rounded">
                <Image
                  src={track?.artwork}
                  alt={`${track?.title} by ${track?.artist}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded flex items-center justify-center">
                <Button
                  variant="default"
                  size="icon"
                  className="w-6 h-6 bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onPlayTrack(track);
                  }}
                >
                  <Icon name="Play" size={12} color="white" />
                </Button>
              </div>
            </div>
            
            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {track?.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {track?.artist}
              </p>
            </div>
            
            {/* Duration & Change */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {formatDuration(track?.duration)}
                </div>
                {track?.changeValue > 0 && (
                  <div className={`text-xs ${getRankChangeColor(track?.change)} flex items-center justify-end space-x-1`}>
                    <span>{track?.changeValue}</span>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;