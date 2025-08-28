import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyPlayedSection = ({ recentTracks = [], onPlayTrack = () => {} }) => {
  const defaultTracks = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 200,
      lastPlayed: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      artwork: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=300&h=300&fit=crop",
      duration: 174,
      lastPlayed: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      artwork: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=300&h=300&fit=crop",
      duration: 178,
      lastPlayed: new Date(Date.now() - 10800000)
    },
    {
      id: 4,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      duration: 203,
      lastPlayed: new Date(Date.now() - 14400000)
    },
    {
      id: 5,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      album: "F*CK LOVE 3: OVER YOU",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=300&h=300&fit=crop",
      duration: 141,
      lastPlayed: new Date(Date.now() - 18000000)
    }
  ];

  const tracks = recentTracks?.length > 0 ? recentTracks : defaultTracks;

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Recently Played</h2>
        <Link 
          to="/music-library-browser" 
          className="text-sm text-primary hover:underline font-medium"
        >
          See all
        </Link>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {tracks?.map((track) => (
          <div
            key={track?.id}
            className="flex-shrink-0 w-40 group cursor-pointer"
            onClick={() => onPlayTrack(track)}
          >
            <div className="relative mb-3">
              <div className="w-40 h-40 overflow-hidden rounded-lg">
                <Image
                  src={track?.artwork}
                  alt={`${track?.title} by ${track?.artist}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <Button
                  variant="default"
                  size="icon"
                  className="w-12 h-12 bg-primary hover:bg-primary/90 shadow-elevation"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onPlayTrack(track);
                  }}
                >
                  <Icon name="Play" size={20} color="white" />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {track?.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {track?.artist}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(track?.lastPlayed)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyPlayedSection;