import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SongListItem = ({ 
  song, 
  isSelected = false, 
  onSelect = () => {}, 
  onPlay = () => {}, 
  onAddToPlaylist = () => {}, 
  onFavorite = () => {},
  onShare = () => {},
  isPlaying = false,
  showCheckbox = false 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleMenuToggle = (e) => {
    e?.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action, e) => {
    e?.stopPropagation();
    setShowMenu(false);
    
    switch (action) {
      case 'playlist':
        onAddToPlaylist(song);
        break;
      case 'favorite':
        onFavorite(song);
        break;
      case 'share':
        onShare(song);
        break;
    }
  };

  return (
    <div className="flex items-center p-3 hover:bg-surface/50 transition-spring group relative">
      {/* Checkbox for bulk selection */}
      {showCheckbox && (
        <div className="mr-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(song, e?.target?.checked)}
            className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>
      )}
      {/* Album Artwork */}
      <div className="relative w-12 h-12 flex-shrink-0 mr-3">
        <Image
          src={song?.artwork}
          alt={`${song?.title} artwork`}
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-spring flex items-center justify-center rounded">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onPlay(song);
            }}
            className="w-8 h-8 text-white hover:bg-white/20"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
          </Button>
        </div>
      </div>
      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className={`text-sm font-medium truncate ${isPlaying ? 'text-primary' : 'text-foreground'}`}>
            {song?.title}
          </h3>
          {song?.isExplicit && (
            <span className="text-xs bg-muted text-muted-foreground px-1 rounded">E</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{song?.artist}</p>
        <p className="text-xs text-muted-foreground truncate">{song?.album}</p>
      </div>
      {/* Duration and Actions */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <span className="text-xs text-muted-foreground font-mono">
          {formatDuration(song?.duration)}
        </span>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleMenuAction('favorite', e)}
          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-spring"
        >
          <Icon 
            name={song?.isFavorite ? "Heart" : "Heart"} 
            size={14} 
            color={song?.isFavorite ? "var(--color-primary)" : "currentColor"}
          />
        </Button>

        {/* More Options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuToggle}
            className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-spring"
          >
            <Icon name="MoreHorizontal" size={14} />
          </Button>

          {/* Context Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-high z-20">
              <div className="py-1">
                <button
                  onClick={(e) => handleMenuAction('playlist', e)}
                  className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-surface/50 transition-spring"
                >
                  <Icon name="Plus" size={14} className="mr-2" />
                  Add to Playlist
                </button>
                <button
                  onClick={(e) => handleMenuAction('favorite', e)}
                  className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-surface/50 transition-spring"
                >
                  <Icon name="Heart" size={14} className="mr-2" />
                  {song?.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  onClick={(e) => handleMenuAction('share', e)}
                  className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-surface/50 transition-spring"
                >
                  <Icon name="Share" size={14} className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongListItem;