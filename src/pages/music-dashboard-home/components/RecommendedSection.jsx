import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedSection = ({ recommendations = [], onPlayTrack = () => {}, onLikeTrack = () => {} }) => {
  const defaultRecommendations = [
    {
      id: 6,
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry\'s House",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 167,
      isLiked: false,
      plays: "2.1M"
    },
    {
      id: 7,
      title: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=300&h=300&fit=crop",
      duration: 238,
      isLiked: true,
      plays: "1.8M"
    },
    {
      id: 8,
      title: "Industry Baby",
      artist: "Lil Nas X & Jack Harlow",
      album: "MONTERO",
      artwork: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=300&h=300&fit=crop",
      duration: 212,
      isLiked: false,
      plays: "1.5M"
    },
    {
      id: 9,
      title: "Bad Habit",
      artist: "Steve Lacy",
      album: "Gemini Rights",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      duration: 221,
      isLiked: true,
      plays: "1.2M"
    },
    {
      id: 10,
      title: "Anti-Hero",
      artist: "Taylor Swift",
      album: "Midnights",
      artwork: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=300&h=300&fit=crop",
      duration: 200,
      isLiked: false,
      plays: "3.2M"
    },
    {
      id: 11,
      title: "Flowers",
      artist: "Miley Cyrus",
      album: "Endless Summer Vacation",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 200,
      isLiked: true,
      plays: "2.8M"
    }
  ];

  const tracks = recommendations?.length > 0 ? recommendations : defaultRecommendations;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
        <Link 
          to="/search-and-discovery" 
          className="text-sm text-primary hover:underline font-medium"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks?.map((track) => (
          <div
            key={track?.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-surface/50 transition-spring hover-lift group"
          >
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 overflow-hidden rounded-lg">
                  <Image
                    src={track?.artwork}
                    alt={`${track?.title} by ${track?.artist}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <Button
                    variant="default"
                    size="icon"
                    className="w-8 h-8 bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onPlayTrack(track);
                    }}
                  >
                    <Icon name="Play" size={14} color="white" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {track?.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {track?.artist}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(track?.duration)}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {track?.plays} plays
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onLikeTrack(track?.id);
                  }}
                >
                  <Icon 
                    name="Heart" 
                    size={16} 
                    color={track?.isLiked ? "var(--color-error)" : "currentColor"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;