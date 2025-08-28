import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlaylistHeader = ({ 
  playlist, 
  onEdit = () => {}, 
  onShare = () => {}, 
  onCollaborate = () => {},
  onPrivacyToggle = () => {},
  isEditing = false 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="relative">
      {/* Cover Art and Basic Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-gradient-to-b from-primary/20 to-transparent">
        <div className="w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
          <Image
            src={playlist?.coverArt}
            alt={`${playlist?.name} cover`}
            className="w-full h-full object-cover rounded-lg shadow-elevation"
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {playlist?.isPublic ? 'Public Playlist' : 'Private Playlist'}
            </span>
            {playlist?.isCollaborative && (
              <div className="flex items-center space-x-1 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                <Icon name="Users" size={12} />
                <span>Collaborative</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {playlist?.name}
          </h1>
          
          {playlist?.description && (
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              {playlist?.description}
            </p>
          )}
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={12} color="white" />
              </div>
              <span className="font-medium text-foreground">{playlist?.creator}</span>
            </div>
            <span>•</span>
            <span>{playlist?.songCount} songs</span>
            <span>•</span>
            <span>{formatDuration(playlist?.totalDuration)}</span>
            <span>•</span>
            <span>Created {playlist?.createdDate}</span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="lg"
            iconName="Play"
            iconPosition="left"
            className="bg-primary hover:bg-primary/90"
          >
            Play
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12"
          >
            <Icon name="Shuffle" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12"
          >
            <Icon name="Heart" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="w-12 h-12"
          >
            <Icon name="Share" size={20} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Privacy Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrivacyToggle}
            iconName={playlist?.isPublic ? "Globe" : "Lock"}
            iconPosition="left"
          >
            {playlist?.isPublic ? "Public" : "Private"}
          </Button>

          {/* More Options Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Icon name="MoreHorizontal" size={20} />
            </Button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-high z-20">
                <div className="py-2">
                  <button
                    onClick={() => {
                      onEdit();
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Edit" size={16} />
                    <span>Edit details</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onCollaborate();
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="UserPlus" size={16} />
                    <span>Invite collaborators</span>
                  </button>
                  
                  <div className="border-t border-border my-1" />
                  
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Download" size={16} />
                    <span>Download playlist</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-surface flex items-center space-x-2"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete playlist</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;