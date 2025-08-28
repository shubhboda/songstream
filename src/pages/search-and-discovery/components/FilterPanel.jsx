import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen = false, 
  onClose = () => {}, 
  filters = {},
  onFiltersChange = () => {}
}) => {
  const [localFilters, setLocalFilters] = useState({
    genres: [],
    releaseDate: '',
    duration: '',
    popularity: '',
    type: [],
    ...filters
  });

  const genreOptions = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 
    'Jazz', 'Classical', 'Folk', 'Reggae', 'Blues', 'Indie'
  ];

  const releaseDateOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
    { value: 'year', label: 'Past year' },
    { value: '2020s', label: '2020s' },
    { value: '2010s', label: '2010s' },
    { value: '2000s', label: '2000s' },
    { value: '1990s', label: '1990s' }
  ];

  const durationOptions = [
    { value: 'any', label: 'Any duration' },
    { value: 'short', label: 'Under 2 minutes' },
    { value: 'medium', label: '2-5 minutes' },
    { value: 'long', label: 'Over 5 minutes' }
  ];

  const popularityOptions = [
    { value: 'any', label: 'Any popularity' },
    { value: 'trending', label: 'Trending now' },
    { value: 'popular', label: 'Most popular' },
    { value: 'underground', label: 'Underground' }
  ];

  const typeOptions = [
    'Songs', 'Artists', 'Albums', 'Playlists', 'Podcasts'
  ];

  const handleGenreChange = (genre, checked) => {
    const newGenres = checked 
      ? [...localFilters?.genres, genre]
      : localFilters?.genres?.filter(g => g !== genre);
    
    setLocalFilters(prev => ({ ...prev, genres: newGenres }));
  };

  const handleTypeChange = (type, checked) => {
    const newTypes = checked 
      ? [...localFilters?.type, type]
      : localFilters?.type?.filter(t => t !== type);
    
    setLocalFilters(prev => ({ ...prev, type: newTypes }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      genres: [],
      releaseDate: '',
      duration: '',
      popularity: '',
      type: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = 
    localFilters?.genres?.length > 0 ||
    localFilters?.releaseDate ||
    localFilters?.duration ||
    localFilters?.popularity ||
    localFilters?.type?.length > 0;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-40 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="mt-2 text-primary hover:text-primary/80"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Content Type */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Content Type</h3>
            <div className="space-y-2">
              {typeOptions?.map((type) => (
                <Checkbox
                  key={type}
                  label={type}
                  checked={localFilters?.type?.includes(type)}
                  onChange={(e) => handleTypeChange(type, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Genres</h3>
            <div className="grid grid-cols-2 gap-2">
              {genreOptions?.map((genre) => (
                <Checkbox
                  key={genre}
                  label={genre}
                  checked={localFilters?.genres?.includes(genre)}
                  onChange={(e) => handleGenreChange(genre, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Release Date */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Release Date</h3>
            <div className="space-y-2">
              {releaseDateOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="releaseDate"
                    value={option?.value}
                    checked={localFilters?.releaseDate === option?.value}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, releaseDate: e?.target?.value }))}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Duration</h3>
            <div className="space-y-2">
              {durationOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value={option?.value}
                    checked={localFilters?.duration === option?.value}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, duration: e?.target?.value }))}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Popularity */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Popularity</h3>
            <div className="space-y-2">
              {popularityOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="popularity"
                    value={option?.value}
                    checked={localFilters?.popularity === option?.value}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, popularity: e?.target?.value }))}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;