import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaylistGridItem = ({ playlist, onPlay = () => {}, onPlaylistClick = () => {} }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onPlaylistClick(playlist)}
    >
      <div className="relative aspect-square mb-3">
        <Image
          src={playlist?.artwork}
          alt={`${playlist?.name} playlist cover`}
          className="w-full h-full object-cover rounded-lg shadow-elevation"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-spring flex items-center justify-center rounded-lg">
          <Button
            variant="default"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onPlay(playlist);
            }}
            className="w-12 h-12"
          >
            <Icon name="Play" size={20} />
          </Button>
        </div>
        
        {/* Playlist Type Badge */}
        {playlist?.isPublic && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            Public
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-spring">
          {playlist?.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {playlist?.trackCount} songs • {playlist?.duration}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {playlist?.description}
        </p>
      </div>
    </div>
  );
};

export default PlaylistGridItem;