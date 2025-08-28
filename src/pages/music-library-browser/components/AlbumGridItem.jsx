import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlbumGridItem = ({ album, onPlay = () => {}, onAlbumClick = () => {} }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onAlbumClick(album)}
    >
      <div className="relative aspect-square mb-3">
        <Image
          src={album?.artwork}
          alt={`${album?.title} album cover`}
          className="w-full h-full object-cover rounded-lg shadow-elevation"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-spring flex items-center justify-center rounded-lg">
          <Button
            variant="default"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onPlay(album);
            }}
            className="w-12 h-12"
          >
            <Icon name="Play" size={20} />
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-spring">
          {album?.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">{album?.artist}</p>
        <p className="text-xs text-muted-foreground">
          {album?.year} • {album?.trackCount} tracks
        </p>
      </div>
    </div>
  );
};

export default AlbumGridItem;