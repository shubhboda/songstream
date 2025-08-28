import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArtistListItem = ({ artist, onPlay = () => {}, onArtistClick = () => {} }) => {
  return (
    <div 
      className="flex items-center p-3 hover:bg-surface/50 transition-spring group cursor-pointer"
      onClick={() => onArtistClick(artist)}
    >
      {/* Artist Image */}
      <div className="relative w-12 h-12 flex-shrink-0 mr-3">
        <Image
          src={artist?.image}
          alt={`${artist?.name} photo`}
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-spring flex items-center justify-center rounded-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onPlay(artist);
            }}
            className="w-8 h-8 text-white hover:bg-white/20"
          >
            <Icon name="Play" size={16} />
          </Button>
        </div>
      </div>
      {/* Artist Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-spring">
          {artist?.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {artist?.albumCount} albums • {artist?.trackCount} songs
        </p>
        <div className="flex items-center space-x-2 mt-1">
          {artist?.genres?.slice(0, 2)?.map((genre, index) => (
            <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
              {genre}
            </span>
          ))}
        </div>
      </div>
      {/* Follow Button */}
      <div className="flex-shrink-0">
        <Button
          variant={artist?.isFollowing ? "default" : "outline"}
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-spring"
        >
          {artist?.isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
    </div>
  );
};

export default ArtistListItem;