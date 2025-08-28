import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SearchHeader = ({ 
  searchQuery = '', 
  onSearchChange = () => {}, 
  onVoiceSearch = () => {},
  onFilterToggle = () => {},
  isVoiceActive = false,
  showFilters = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    onSearchChange(value);
  };

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    onVoiceSearch();
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    onSearchChange('');
    inputRef?.current?.focus();
  };

  return (
    <div className="sticky top-nav z-20 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-4 space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search songs, artists, albums, playlists..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full pl-12 pr-20 py-3 bg-input border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-spring text-base"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
            {localQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="w-8 h-8"
              >
                <Icon name="X" size={16} />
              </Button>
            )}
            <Button
              variant={isListening ? "default" : "ghost"}
              size="icon"
              onClick={handleVoiceClick}
              className={`w-8 h-8 ${isListening ? 'animate-pulse' : ''}`}
            >
              <Icon name="Mic" size={16} />
            </Button>
          </div>
        </div>

        {/* Search Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={onFilterToggle}
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
            <Button variant="ghost" size="sm" iconName="Clock" iconPosition="left">
              Recent
            </Button>
          </div>
          
          {isVoiceActive && (
            <div className="flex items-center space-x-2 text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Listening...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;