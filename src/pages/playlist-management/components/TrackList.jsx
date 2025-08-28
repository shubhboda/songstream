import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TrackItem from './TrackItem';

const TrackList = ({ 
  tracks = [], 
  currentTrack = null,
  onTrackPlay = () => {},
  onTrackRemove = () => {},
  onTracksReorder = () => {},
  onBulkRemove = () => {}
}) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState(new Set());
  const [sortBy, setSortBy] = useState('custom');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleSelectTrack = (trackId) => {
    const newSelected = new Set(selectedTracks);
    if (newSelected?.has(trackId)) {
      newSelected?.delete(trackId);
    } else {
      newSelected?.add(trackId);
    }
    setSelectedTracks(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedTracks?.size === tracks?.length) {
      setSelectedTracks(new Set());
    } else {
      setSelectedTracks(new Set(tracks.map(track => track.id)));
    }
  };

  const handleBulkRemove = () => {
    onBulkRemove(Array.from(selectedTracks));
    setSelectedTracks(new Set());
    setSelectionMode(false);
  };

  const sortOptions = [
    { value: 'custom', label: 'Custom order', icon: 'GripVertical' },
    { value: 'title', label: 'Title', icon: 'AlphabeticalOrder' },
    { value: 'artist', label: 'Artist', icon: 'User' },
    { value: 'album', label: 'Album', icon: 'Disc' },
    { value: 'dateAdded', label: 'Date added', icon: 'Calendar' },
    { value: 'duration', label: 'Duration', icon: 'Clock' }
  ];

  const formatTotalDuration = () => {
    const totalSeconds = tracks?.reduce((sum, track) => sum + track?.duration, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="space-y-4">
      {/* List Header */}
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">
            {tracks?.length} songs • {formatTotalDuration()}
          </h2>
          
          {selectionMode && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                iconName={selectedTracks?.size === tracks?.length ? "CheckSquare" : "Square"}
                iconPosition="left"
              >
                {selectedTracks?.size === tracks?.length ? 'Deselect all' : 'Select all'}
              </Button>
              
              {selectedTracks?.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkRemove}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Remove ({selectedTracks?.size})
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Sort Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSortMenu(!showSortMenu)}
              iconName="ArrowUpDown"
              iconPosition="left"
            >
              Sort
            </Button>
            
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-high z-20">
                <div className="py-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => {
                        setSortBy(option?.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-surface flex items-center space-x-2 ${
                        sortBy === option?.value ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selection Mode Toggle */}
          <Button
            variant={selectionMode ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setSelectionMode(!selectionMode);
              setSelectedTracks(new Set());
            }}
            iconName="CheckSquare"
            iconPosition="left"
          >
            Select
          </Button>
        </div>
      </div>
      {/* Column Headers (Desktop) */}
      <div className="hidden lg:flex items-center space-x-3 px-6 py-2 border-b border-border text-sm text-muted-foreground">
        {selectionMode && <div className="w-5" />}
        <div className="w-4" /> {/* Drag handle */}
        <div className="w-8">#</div>
        <div className="w-12" /> {/* Album art */}
        <div className="flex-1">Title</div>
        <div className="flex-1">Album</div>
        <div className="hidden xl:block w-24">Date added</div>
        <div className="w-20 text-right">Duration</div>
        <div className="w-8" /> {/* Actions */}
      </div>
      {/* Track List */}
      <div className="space-y-1">
        {tracks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Music" size={24} color="var(--color-muted-foreground)" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-foreground">No songs in this playlist</h3>
              <p className="text-muted-foreground">Add some music to get started</p>
            </div>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
            >
              Add songs
            </Button>
          </div>
        ) : (
          tracks?.map((track, index) => (
            <TrackItem
              key={track?.id}
              track={track}
              index={index}
              isPlaying={currentTrack?.id === track?.id}
              isSelected={selectedTracks?.has(track?.id)}
              onPlay={() => onTrackPlay(track)}
              onSelect={() => handleSelectTrack(track?.id)}
              onRemove={() => onTrackRemove(track?.id)}
              onAddToQueue={() => {}}
              selectionMode={selectionMode}
              dragHandleProps={{
                // Drag and drop props would go here
              }}
            />
          ))
        )}
      </div>
      {/* Add Songs Button (Mobile) */}
      <div className="lg:hidden fixed bottom-20 right-4 z-10">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full shadow-elevation-high"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default TrackList;