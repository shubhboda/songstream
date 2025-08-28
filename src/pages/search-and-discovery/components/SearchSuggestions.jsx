import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ 
  suggestions = [], 
  recentSearches = [], 
  trendingSearches = [],
  onSuggestionClick = () => {},
  onClearRecent = () => {}
}) => {
  const mockSuggestions = [
    { id: 1, text: "taylor swift", type: "artist" },
    { id: 2, text: "bad habits ed sheeran", type: "song" },
    { id: 3, text: "folklore album", type: "album" },
    { id: 4, text: "pop music 2024", type: "genre" },
    { id: 5, text: "workout playlist", type: "playlist" }
  ];

  const mockRecentSearches = [
    { id: 1, text: "billie eilish", timestamp: "2 hours ago" },
    { id: 2, text: "dua lipa levitating", timestamp: "1 day ago" },
    { id: 3, text: "indie rock playlist", timestamp: "3 days ago" },
    { id: 4, text: "the weeknd", timestamp: "1 week ago" }
  ];

  const mockTrendingSearches = [
    { id: 1, text: "flowers miley cyrus", trend: "+125%" },
    { id: 2, text: "harry styles as it was", trend: "+89%" },
    { id: 3, text: "olivia rodrigo vampire", trend: "+67%" },
    { id: 4, text: "sza good days", trend: "+45%" },
    { id: 5, text: "bad bunny un verano", trend: "+34%" }
  ];

  const displaySuggestions = suggestions?.length > 0 ? suggestions : mockSuggestions;
  const displayRecent = recentSearches?.length > 0 ? recentSearches : mockRecentSearches;
  const displayTrending = trendingSearches?.length > 0 ? trendingSearches : mockTrendingSearches;

  const getIconForType = (type) => {
    switch (type) {
      case 'artist': return 'User';
      case 'song': return 'Music';
      case 'album': return 'Disc';
      case 'playlist': return 'ListMusic';
      case 'genre': return 'Tag';
      default: return 'Search';
    }
  };

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Quick Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {displaySuggestions?.slice(0, 8)?.map((suggestion) => (
            <button
              key={suggestion?.id}
              onClick={() => onSuggestionClick(suggestion?.text)}
              className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-full text-sm text-foreground hover:bg-surface/80 transition-spring"
            >
              <Icon name={getIconForType(suggestion?.type)} size={14} />
              <span>{suggestion?.text}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Searches */}
      {displayRecent?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Searches</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearRecent}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
          <div className="space-y-2">
            {displayRecent?.map((search) => (
              <button
                key={search?.id}
                onClick={() => onSuggestionClick(search?.text)}
                className="flex items-center justify-between w-full p-3 bg-surface/50 hover:bg-surface border border-border rounded-lg transition-spring group"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-foreground">{search?.text}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{search?.timestamp}</span>
                  <Icon 
                    name="ArrowUpRight" 
                    size={14} 
                    color="var(--color-muted-foreground)"
                    className="opacity-0 group-hover:opacity-100 transition-spring"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Trending Searches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Trending Now</h3>
        <div className="space-y-2">
          {displayTrending?.map((trending, index) => (
            <button
              key={trending?.id}
              onClick={() => onSuggestionClick(trending?.text)}
              className="flex items-center justify-between w-full p-3 bg-surface/50 hover:bg-surface border border-border rounded-lg transition-spring group"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-primary/20 text-primary text-xs font-bold rounded">
                  {index + 1}
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
                  <span className="text-foreground">{trending?.text}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-success font-medium">{trending?.trend}</span>
                <Icon 
                  name="ArrowUpRight" 
                  size={14} 
                  color="var(--color-muted-foreground)"
                  className="opacity-0 group-hover:opacity-100 transition-spring"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;