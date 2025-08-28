import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrackItem = ({ 
  track, 
  index, 
  isPlaying = false, 
  isSelected = false,
  onPlay = () => {},
  onSelect = () => {},
  onRemove = () => {},
  onAddToQueue = () => {},
  isDragging = false,
  dragHandleProps = {},
  selectionMode = false
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className={`group flex items-center space-x-3 p-3 rounded-lg hover:bg-surface/50 transition-spring ${
        isSelected ? 'bg-primary/10 border border-primary/20' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Selection Checkbox */}
      {selectionMode && (
        <div className="flex-shrink-0">
          <button
            onClick={onSelect}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-spring ${
              isSelected 
                ? 'bg-primary border-primary' :'border-border hover:border-primary'
            }`}
          >
            {isSelected && <Icon name="Check" size={12} color="white" />}
          </button>
        </div>
      )}
      {/* Drag Handle */}
      <div 
        {...dragHandleProps}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-spring cursor-grab active:cursor-grabbing"
      >
        <Icon name="GripVertical" size={16} color="var(--color-muted-foreground)" />
      </div>
      {/* Track Number / Play Button */}
      <div className="flex-shrink-0 w-8 flex items-center justify-center">
        {isPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" />
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        ) : (
          <button
            onClick={onPlay}
            className="opacity-0 group-hover:opacity-100 transition-spring hover:scale-110"
          >
            <Icon name="Play" size={16} color="var(--color-foreground)" />
          </button>
        )}
        <span className={`text-sm text-muted-foreground group-hover:opacity-0 transition-spring ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}>
          {index + 1}
        </span>
      </div>
      {/* Album Art */}
      <div className="flex-shrink-0 w-12 h-12">
        <Image
          src={track?.albumArt}
          alt={`${track?.title} album art`}
          className="w-full h-full object-cover rounded"
        />
      </div>
      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className={`font-medium truncate ${
            isPlaying ? 'text-primary' : 'text-foreground'
          }`}>
            {track?.title}
          </h3>
          {track?.isExplicit && (
            <div className="flex-shrink-0 w-4 h-4 bg-muted-foreground text-background text-xs font-bold rounded flex items-center justify-center">
              E
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {track?.artist}
        </p>
      </div>
      {/* Album Name (Desktop) */}
      <div className="hidden lg:block flex-1 min-w-0">
        <p className="text-sm text-muted-foreground truncate hover:text-foreground transition-spring cursor-pointer">
          {track?.album}
        </p>
      </div>
      {/* Date Added (Desktop) */}
      <div className="hidden xl:block w-24">
        <p className="text-sm text-muted-foreground">
          {formatDate(track?.addedDate)}
        </p>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-spring w-8 h-8"
        >
          <Icon 
            name={track?.isLiked ? "Heart" : "Heart"} 
            size={16} 
            color={track?.isLiked ? "var(--color-primary)" : "currentColor"}
          />
        </Button>

        {/* Duration */}
        <span className="text-sm text-muted-foreground font-mono w-12 text-right">
          {formatDuration(track?.duration)}
        </span>

        {/* More Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 transition-spring w-8 h-8"
          >
            <Icon name="MoreHorizontal" size={16} />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-high z-30">
              <div className="py-2">
                <button
                  onClick={() => {
                    onAddToQueue();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-surface flex items-center space-x-2"
                >
                  <Icon name="Plus" size={16} />
                  <span>Add to queue</span>
                </button>
                
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-surface flex items-center space-x-2"
                >
                  <Icon name="ListPlus" size={16} />
                  <span>Add to playlist</span>
                </button>
                
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-surface flex items-center space-x-2"
                >
                  <Icon name="Share" size={16} />
                  <span>Share track</span>
                </button>
                
                <div className="border-t border-border my-1" />
                
                <button
                  onClick={() => {
                    onRemove();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-error hover:bg-surface flex items-center space-x-2"
                >
                  <Icon name="Trash2" size={16} />
                  <span>Remove from playlist</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackItem;