import React from 'react';
import Image from '../../../components/AppImage';

const AlbumArtwork = ({ 
  artwork = '/assets/images/no_image.png',
  title = 'Unknown Track',
  isPlaying = false,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background blur effect */}
      <div 
        className="absolute inset-0 opacity-20 blur-3xl scale-110"
        style={{
          backgroundImage: `url(${artwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Main artwork */}
      <div className="relative z-10">
        <div className={`aspect-square rounded-lg overflow-hidden shadow-elevation-high transition-spring ${
          isPlaying ? 'animate-pulse' : ''
        }`}>
          <Image
            src={artwork}
            alt={`${title} album artwork`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-elevation">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumArtwork;