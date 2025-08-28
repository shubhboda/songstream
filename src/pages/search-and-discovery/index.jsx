import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import MiniPlayer from '../../components/ui/MiniPlayer';
import AuthModal from '../../components/ui/AuthModal';
import SearchHeader from './components/SearchHeader';
import SearchSuggestions from './components/SearchSuggestions';
import SearchResults from './components/SearchResults';
import FilterPanel from './components/FilterPanel';
import VoiceSearchModal from './components/VoiceSearchModal';

const SearchAndDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [filters, setFilters] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle search functionality
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    if (query?.trim()) {
      // Simulate search API call
      setTimeout(() => {
        setSearchResults({
          topResults: [
            {
              id: 1,
              type: 'song',
              title: 'Anti-Hero',
              artist: 'Taylor Swift',
              album: 'Midnights',
              artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
              duration: '3:20',
              plays: '2.1B'
            }
          ],
          songs: [
            {
              id: 1,
              title: 'Anti-Hero',
              artist: 'Taylor Swift',
              album: 'Midnights',
              artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
              duration: '3:20',
              plays: '2.1B'
            }
          ]
        });
      }, 300);
    } else {
      setSearchResults({});
    }
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    setIsVoiceActive(!isVoiceActive);
    setShowVoiceModal(true);
  };

  const handleVoiceResult = (transcript) => {
    setSearchQuery(transcript);
    handleSearchChange(transcript);
    setIsVoiceActive(false);
    
    // Add to recent searches
    const newSearch = {
      id: Date.now(),
      text: transcript,
      timestamp: 'Just now'
    };
    setRecentSearches(prev => [newSearch, ...prev?.slice(0, 9)]);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearchChange(suggestion);
    
    // Add to recent searches
    const newSearch = {
      id: Date.now(),
      text: suggestion,
      timestamp: 'Just now'
    };
    setRecentSearches(prev => [newSearch, ...prev?.slice(0, 9)]);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Re-search with filters applied
    if (searchQuery?.trim()) {
      handleSearchChange(searchQuery);
    }
  };

  // Handle music playback
  const handlePlaySong = (song) => {
    setCurrentTrack({
      title: song?.title,
      artist: song?.artist,
      album: song?.album,
      artwork: song?.artwork,
      duration: 200, // Convert duration string to seconds
      currentTime: 0
    });
    setIsPlaying(!isPlaying);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle authentication
  const handleAuth = (userData) => {
    setCurrentUser(userData);
    setShowAuthModal(false);
  };

  // Clear recent searches
  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  // Handle see all results
  const handleSeeAll = (category) => {
    console.log(`See all ${category}`);
    // Navigate to full results page
  };

  return (
    <>
      <Helmet>
        <title>Search & Discovery - SongStream</title>
        <meta name="description" content="Discover new music, search for songs, artists, albums, and playlists on SongStream" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          currentUser={currentUser}
          onSearch={handleSearchChange}
          searchQuery={searchQuery}
          onAuthModalOpen={() => setShowAuthModal(true)}
        />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className={`pt-nav pb-nav lg:pb-mini-player transition-spring ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}>
          {/* Search Header */}
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onVoiceSearch={handleVoiceSearch}
            onFilterToggle={() => setShowFilters(!showFilters)}
            isVoiceActive={isVoiceActive}
            showFilters={showFilters}
          />

          {/* Search Content */}
          <div className="min-h-screen">
            {searchQuery?.trim() ? (
              <SearchResults
                results={searchResults}
                searchQuery={searchQuery}
                onPlaySong={handlePlaySong}
                onFollowArtist={(artist) => console.log('Follow artist:', artist)}
                onSaveAlbum={(album) => console.log('Save album:', album)}
                onSavePlaylist={(playlist) => console.log('Save playlist:', playlist)}
                onSeeAll={handleSeeAll}
              />
            ) : (
              <SearchSuggestions
                onSuggestionClick={handleSuggestionClick}
                recentSearches={recentSearches}
                onClearRecent={handleClearRecent}
              />
            )}
          </div>
        </main>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Voice Search Modal */}
        <VoiceSearchModal
          isOpen={showVoiceModal}
          onClose={() => {
            setShowVoiceModal(false);
            setIsVoiceActive(false);
          }}
          onResult={handleVoiceResult}
          isListening={isVoiceActive}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />

        {/* Bottom Navigation */}
        <BottomNavigation />

        {/* Mini Player */}
        <MiniPlayer
          isExpanded={isPlayerExpanded}
          onToggleExpanded={() => setIsPlayerExpanded(!isPlayerExpanded)}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={() => console.log('Next track')}
          onPrevious={() => console.log('Previous track')}
          onSeek={(time) => console.log('Seek to:', time)}
          onVolumeChange={(volume) => console.log('Volume:', volume)}
          className={sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'}
        />
      </div>
    </>
  );
};

export default SearchAndDiscovery;