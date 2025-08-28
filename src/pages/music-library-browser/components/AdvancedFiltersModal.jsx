import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFiltersModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onApplyFilters = () => {},
  currentFilters = {}
}) => {
  const [filters, setFilters] = useState({
    dateRange: currentFilters?.dateRange || 'all',
    genres: currentFilters?.genres || [],
    rating: currentFilters?.rating || 0,
    duration: currentFilters?.duration || { min: 0, max: 600 },
    playCount: currentFilters?.playCount || 'all',
    ...currentFilters
  });

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 
    'Country', 'R&B', 'Indie', 'Alternative', 'Folk', 'Reggae'
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const playCountOptions = [
    { value: 'all', label: 'All Songs' },
    { value: 'never', label: 'Never Played' },
    { value: 'low', label: '1-10 plays' },
    { value: 'medium', label: '11-50 plays' },
    { value: 'high', label: '50+ plays' }
  ];

  const handleGenreToggle = (genre) => {
    setFilters(prev => ({
      ...prev,
      genres: prev?.genres?.includes(genre)
        ? prev?.genres?.filter(g => g !== genre)
        : [...prev?.genres, genre]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      dateRange: 'all',
      genres: [],
      rating: 0,
      duration: { min: 0, max: 600 },
      playCount: 'all'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-lg shadow-elevation-high border border-border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Date Added</h3>
            <div className="space-y-2">
              {dateRanges?.map((range) => (
                <label key={range?.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range?.value}
                    checked={filters?.dateRange === range?.value}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e?.target?.value }))}
                    className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{range?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Genres</h3>
            <div className="grid grid-cols-2 gap-2">
              {genres?.map((genre) => (
                <Checkbox
                  key={genre}
                  label={genre}
                  checked={filters?.genres?.includes(genre)}
                  onChange={() => handleGenreToggle(genre)}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Minimum Rating</h3>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={filters?.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e?.target?.value) }))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    color={star <= filters?.rating ? "var(--color-primary)" : "var(--color-muted-foreground)"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Duration (seconds)</h3>
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                placeholder="Min"
                value={filters?.duration?.min}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  duration: { ...prev?.duration, min: parseInt(e?.target?.value) || 0 }
                }))}
                className="flex-1"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters?.duration?.max}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  duration: { ...prev?.duration, max: parseInt(e?.target?.value) || 600 }
                }))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Play Count */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Play Count</h3>
            <div className="space-y-2">
              {playCountOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="playCount"
                    value={option?.value}
                    checked={filters?.playCount === option?.value}
                    onChange={(e) => setFilters(prev => ({ ...prev, playCount: e?.target?.value }))}
                    className="w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleReset}
          >
            Reset All
          </Button>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFiltersModal;