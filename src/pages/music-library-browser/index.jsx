import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import MiniPlayer from '../../components/ui/MiniPlayer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import LibraryTabs from './components/LibraryTabs';
import FilterChips from './components/FilterChips';
import SongListItem from './components/SongListItem';
import AlbumGridItem from './components/AlbumGridItem';
import ArtistListItem from './components/ArtistListItem';
import PlaylistGridItem from './components/PlaylistGridItem';
import AdvancedFiltersModal from './components/AdvancedFiltersModal';
import BulkActionsBar from './components/BulkActionsBar';

const MusicLibraryBrowser = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('songs');
  const [activeFilter, setActiveFilter] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock data
  const mockSongs = [
    {
      id: 'gujarati-song-1',
      title: "Dhanya Dhanya Dwarikawala",
      artist: "Sabhiben Ahir",
      album: "Song of Faith",
      duration: 240,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isFavorite: true,
      isExplicit: false,
      genre: "Gujarati",
      year: 2025,
      playCount: 120,
      audioUrl: 'file:///c:/Users/shubh/OneDrive/Desktop/Dhanya%20Dhanya%20Dwarikawala%20I%20Sabhiben%20Ahir%20I%20@RAJESH_AHIR%20I%20Song%20of%20Faith%20I%20New%20Gujarati%20Song%202025.mp3'
    },
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: 200,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isFavorite: true,
      isExplicit: false,
      genre: "Pop",
      year: 2020,
      playCount: 45
    },
    {
      id: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      duration: 174,
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      isFavorite: false,
      isExplicit: false,
      genre: "Pop",
      year: 2020,
      playCount: 32
    },
    {
      id: 3,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: 178,
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      isFavorite: true,
      isExplicit: false,
      genre: "Pop",
      year: 2021,
      playCount: 67
    },
    {
      id: 4,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: 203,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isFavorite: false,
      isExplicit: false,
      genre: "Pop",
      year: 2020,
      playCount: 28
    },
    {
      id: 5,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      album: "Stay",
      duration: 141,
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      isFavorite: true,
      isExplicit: true,
      genre: "Hip Hop",
      year: 2021,
      playCount: 89
    }
  ];

  const mockAlbums = [
    {
      id: 'gujarati-album-1',
      title: "Song of Faith",
      artist: "Sabhiben Ahir",
      year: 2025,
      trackCount: 1,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Gujarati"
    },
    {
      id: 1,
      title: "After Hours",
      artist: "The Weeknd",
      year: 2020,
      trackCount: 14,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Pop"
    },
    {
      id: 2,
      title: "Fine Line",
      artist: "Harry Styles",
      year: 2019,
      trackCount: 12,
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      genre: "Pop"
    },
    {
      id: 3,
      title: "SOUR",
      artist: "Olivia Rodrigo",
      year: 2021,
      trackCount: 11,
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      genre: "Pop"
    },
    {
      id: 4,
      title: "Future Nostalgia",
      artist: "Dua Lipa",
      year: 2020,
      trackCount: 11,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Pop"
    }
  ];

  const mockArtists = [
    {
      id: 1,
      name: "The Weeknd",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      albumCount: 5,
      trackCount: 67,
      genres: ["Pop", "R&B"],
      isFollowing: true
    },
    {
      id: 2,
      name: "Harry Styles",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      albumCount: 3,
      trackCount: 34,
      genres: ["Pop", "Rock"],
      isFollowing: false
    },
    {
      id: 3,
      name: "Olivia Rodrigo",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      albumCount: 2,
      trackCount: 23,
      genres: ["Pop", "Alternative"],
      isFollowing: true
    },
    {
      id: 4,
      name: "Dua Lipa",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      albumCount: 3,
      trackCount: 45,
      genres: ["Pop", "Electronic"],
      isFollowing: false
    }
  ];

  const mockPlaylists = [
    {
      id: 1,
      name: "My Favorites",
      trackCount: 25,
      duration: "1h 23m",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      description: "My all-time favorite songs",
      isPublic: false
    },
    {
      id: 2,
      name: "Workout Mix",
      trackCount: 18,
      duration: "58m",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      description: "High energy songs for workouts",
      isPublic: true
    },
    {
      id: 3,
      name: "Chill Vibes",
      trackCount: 32,
      duration: "2h 15m",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      description: "Relaxing songs for any time",
      isPublic: true
    },
    {
      id: 4,
      name: "Road Trip",
      trackCount: 45,
      duration: "3h 2m",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      description: "Perfect songs for long drives",
      isPublic: false
    }
  ];

  const tabs = [
    { id: 'songs', label: 'Songs' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'playlists', label: 'Playlists' }
  ];

  const filters = [
    { id: 'recent', label: 'Recently Added' },
    { id: 'alphabetical', label: 'A-Z' },
    { id: 'mostPlayed', label: 'Most Played' },
    { id: 'genre', label: 'Genre' }
  ];

  // Filter and search logic
  const filteredData = useMemo(() => {
    let data;
    
    switch (activeTab) {
      case 'songs':
        data = mockSongs;
        break;
      case 'albums':
        data = mockAlbums;
        break;
      case 'artists':
        data = mockArtists;
        break;
      case 'playlists':
        data = mockPlaylists;
        break;
      default:
        data = mockSongs;
    }

    // Apply search filter
    if (searchQuery) {
      data = data?.filter(item => {
        const searchTerm = searchQuery?.toLowerCase();
        if (activeTab === 'songs') {
          return item?.title?.toLowerCase()?.includes(searchTerm) ||
                 item?.artist?.toLowerCase()?.includes(searchTerm) ||
                 item?.album?.toLowerCase()?.includes(searchTerm);
        } else if (activeTab === 'albums') {
          return item?.title?.toLowerCase()?.includes(searchTerm) ||
                 item?.artist?.toLowerCase()?.includes(searchTerm);
        } else if (activeTab === 'artists') {
          return item?.name?.toLowerCase()?.includes(searchTerm);
        } else if (activeTab === 'playlists') {
          return item?.name?.toLowerCase()?.includes(searchTerm) ||
                 item?.description?.toLowerCase()?.includes(searchTerm);
        }
        return false;
      });
    }

    // Apply sorting
    switch (activeFilter) {
      case 'alphabetical':
        data = [...data]?.sort((a, b) => {
          const nameA = a?.title || a?.name;
          const nameB = b?.title || b?.name;
          return nameA?.localeCompare(nameB);
        });
        break;
      case 'mostPlayed':
        if (activeTab === 'songs') {
          data = [...data]?.sort((a, b) => (b?.playCount || 0) - (a?.playCount || 0));
        }
        break;
      case 'genre':
        if (activeTab === 'songs' || activeTab === 'albums') {
          data = [...data]?.sort((a, b) => (a?.genre || '')?.localeCompare(b?.genre || ''));
        }
        break;
      default:
        // Recent - keep original order
        break;
    }

    return data;
  }, [activeTab, searchQuery, activeFilter]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleItemSelect = (item, isSelected) => {
    if (isSelected) {
      setSelectedItems(prev => [...prev, item?.id]);
    } else {
      setSelectedItems(prev => prev?.filter(id => id !== item?.id));
    }
  };

  const handleSelectAll = () => {
    setSelectedItems(filteredData?.map(item => item?.id));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handlePlay = (item) => {
    console.log('Playing:', item);
    // Navigate to player or update player state
  };

  const handleItemClick = (item) => {
    if (activeTab === 'albums') {
      // Navigate to album detail
      console.log('Opening album:', item);
    } else if (activeTab === 'artists') {
      // Navigate to artist detail
      console.log('Opening artist:', item);
    } else if (activeTab === 'playlists') {
      navigate('/playlist-management', { state: { playlist: item } });
    }
  };

  const handleAddToPlaylist = (item) => {
    console.log('Adding to playlist:', item);
  };

  const handleFavorite = (item) => {
    console.log('Toggle favorite:', item);
  };

  const handleShare = (item) => {
    console.log('Sharing:', item);
  };

  const handleApplyAdvancedFilters = (filters) => {
    setAdvancedFilters(filters);
    console.log('Applied filters:', filters);
  };

  // Toggle bulk actions when items are selected
  useEffect(() => {
    setShowBulkActions(selectedItems?.length > 0);
  }, [selectedItems]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading your library...</p>
          </div>
        </div>
      );
    }

    if (filteredData?.length === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <Icon name="Music" size={48} color="var(--color-muted-foreground)" />
            <h3 className="text-lg font-medium text-foreground">No {activeTab} found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms' : `Your ${activeTab} library is empty`}
            </p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'songs':
        return (
          <div className="space-y-1">
            {filteredData?.map((song) => (
              <SongListItem
                key={song?.id}
                song={song}
                isSelected={selectedItems?.includes(song?.id)}
                onSelect={handleItemSelect}
                onPlay={handlePlay}
                onAddToPlaylist={handleAddToPlaylist}
                onFavorite={handleFavorite}
                onShare={handleShare}
                showCheckbox={showBulkActions}
              />
            ))}
          </div>
        );

      case 'albums':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredData?.map((album) => (
              <AlbumGridItem
                key={album?.id}
                album={album}
                onPlay={handlePlay}
                onAlbumClick={handleItemClick}
              />
            ))}
          </div>
        );

      case 'artists':
        return (
          <div className="space-y-1">
            {filteredData?.map((artist) => (
              <ArtistListItem
                key={artist?.id}
                artist={artist}
                onPlay={handlePlay}
                onArtistClick={handleItemClick}
              />
            ))}
          </div>
        );

      case 'playlists':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredData?.map((playlist) => (
              <PlaylistGridItem
                key={playlist?.id}
                playlist={playlist}
                onPlay={handlePlay}
                onPlaylistClick={handleItemClick}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedItems?.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onAddToPlaylist={() => handleAddToPlaylist(selectedItems)}
        onFavorite={() => handleFavorite(selectedItems)}
        onDelete={() => console.log('Delete selected:', selectedItems)}
        isVisible={showBulkActions}
      />
      {/* Main Content */}
      <main className={`pt-nav pb-nav lg:pb-mini-player transition-spring ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      } ${showBulkActions ? 'pt-[120px]' : ''}`}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Your Library</h1>
              <p className="text-muted-foreground">
                {filteredData?.length} {activeTab} in your collection
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowBulkActions(!showBulkActions)}
                className={showBulkActions ? 'bg-primary text-primary-foreground' : ''}
              >
                <Icon name="CheckSquare" size={18} />
              </Button>
              <Button
                variant="outline"
                iconName="Plus"
                iconPosition="left"
                onClick={() => {
                  if (activeTab === 'playlists') {
                    navigate('/playlist-management');
                  }
                }}
              >
                {activeTab === 'playlists' ? 'New Playlist' : `Add ${activeTab?.slice(0, -1)}`}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <LibraryTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabs={tabs}
          />

          {/* Filters */}
          <FilterChips
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            filters={filters}
            onAdvancedFilters={() => setShowAdvancedFilters(true)}
          />

          {/* Content */}
          {renderContent()}
        </div>
      </main>
      {/* Advanced Filters Modal */}
      <AdvancedFiltersModal
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleApplyAdvancedFilters}
        currentFilters={advancedFilters}
      />
      {/* Bottom Navigation */}
      <BottomNavigation />
      {/* Mini Player */}
      <MiniPlayer />
    </div>
  );
};

export default MusicLibraryBrowser;