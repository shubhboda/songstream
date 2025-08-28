import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import MiniPlayer from '../../components/ui/MiniPlayer';
import AuthModal from '../../components/ui/AuthModal';
import PlaylistHeader from './components/PlaylistHeader';
import TrackList from './components/TrackList';
import EditPlaylistModal from './components/EditPlaylistModal';
import ShareModal from './components/ShareModal';
import CollaborationModal from './components/CollaborationModal';

const PlaylistManagement = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Playlist state
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [collaborationModalOpen, setCollaborationModalOpen] = useState(false);

  // Mock playlist data
  useEffect(() => {
    const mockPlaylist = {
      id: 'playlist-1',
      name: 'My Awesome Playlist',
      description: `A carefully curated collection of my favorite tracks from various genres.\nPerfect for any mood and occasion. Updated regularly with new discoveries.`,
      creator: 'Music Lover',
      coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      songCount: 25,
      totalDuration: 5400, // 90 minutes
      isPublic: true,
      isCollaborative: false,
      createdDate: 'Jan 15, 2025',
      updatedDate: '2025-01-28T05:13:08.496456Z'
    };

    const mockTracks = [
      {
        id: 'track-1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
        duration: 200,
        addedDate: '2025-01-15T10:00:00Z',
        isLiked: true,
        isExplicit: false
      },
      {
        id: 'track-2',
        title: 'Good 4 U',
        artist: 'Olivia Rodrigo',
        album: 'SOUR',
        albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop',
        duration: 178,
        addedDate: '2025-01-16T14:30:00Z',
        isLiked: false,
        isExplicit: true
      },
      {
        id: 'track-3',
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=100&h=100&fit=crop',
        duration: 203,
        addedDate: '2025-01-17T09:15:00Z',
        isLiked: true,
        isExplicit: false
      },
      {
        id: 'track-4',
        title: 'Stay',
        artist: 'The Kid LAROI & Justin Bieber',
        album: 'F*CK LOVE 3: OVER YOU',
        albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
        duration: 141,
        addedDate: '2025-01-18T16:45:00Z',
        isLiked: false,
        isExplicit: true
      },
      {
        id: 'track-5',
        title: 'Industry Baby',
        artist: 'Lil Nas X & Jack Harlow',
        album: 'MONTERO',
        albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop',
        duration: 212,
        addedDate: '2025-01-19T11:20:00Z',
        isLiked: true,
        isExplicit: true
      },
      {
        id: 'track-6',
        title: 'Heat Waves',
        artist: 'Glass Animals',
        album: 'Dreamland',
        albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=100&h=100&fit=crop',
        duration: 238,
        addedDate: '2025-01-20T13:10:00Z',
        isLiked: false,
        isExplicit: false
      },
      {
        id: 'track-7',
        title: 'Peaches',
        artist: 'Justin Bieber ft. Daniel Caesar & Giveon',
        album: 'Justice',
        albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
        duration: 198,
        addedDate: '2025-01-21T08:30:00Z',
        isLiked: true,
        isExplicit: false
      },
      {
        id: 'track-8',
        title: 'Montero (Call Me By Your Name)',
        artist: 'Lil Nas X',
        album: 'MONTERO',
        albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop',
        duration: 137,
        addedDate: '2025-01-22T15:45:00Z',
        isLiked: false,
        isExplicit: true
      }
    ];

    setPlaylist(mockPlaylist);
    setTracks(mockTracks);
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTrackPlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackRemove = (trackId) => {
    setTracks(prevTracks => prevTracks?.filter(track => track?.id !== trackId));
  };

  const handleBulkRemove = (trackIds) => {
    setTracks(prevTracks => prevTracks?.filter(track => !trackIds?.includes(track?.id)));
  };

  const handlePlaylistEdit = () => {
    setEditModalOpen(true);
  };

  const handlePlaylistSave = (updatedPlaylist) => {
    setPlaylist(updatedPlaylist);
    setEditModalOpen(false);
  };

  const handlePlaylistShare = () => {
    setShareModalOpen(true);
  };

  const handleCollaboration = () => {
    setCollaborationModalOpen(true);
  };

  const handlePrivacyToggle = () => {
    setPlaylist(prev => ({
      ...prev,
      isPublic: !prev?.isPublic
    }));
  };

  const handleInviteUser = (inviteData) => {
    console.log('Inviting user:', inviteData);
    // Handle user invitation logic
  };

  const handleRemoveCollaborator = (collaboratorId) => {
    console.log('Removing collaborator:', collaboratorId);
    // Handle collaborator removal logic
  };

  const handleUpdatePermissions = (collaboratorId, permission) => {
    console.log('Updating permissions:', collaboratorId, permission);
    // Handle permission update logic
  };

  if (!playlist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading playlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onAuthModalOpen={() => setAuthModalOpen(true)}
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
        <div className="min-h-full">
          {/* Playlist Header */}
          <PlaylistHeader
            playlist={playlist}
            onEdit={handlePlaylistEdit}
            onShare={handlePlaylistShare}
            onCollaborate={handleCollaboration}
            onPrivacyToggle={handlePrivacyToggle}
          />

          {/* Track List */}
          <div className="px-0">
            <TrackList
              tracks={tracks}
              currentTrack={currentTrack}
              onTrackPlay={handleTrackPlay}
              onTrackRemove={handleTrackRemove}
              onBulkRemove={handleBulkRemove}
            />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Mini Player */}
      <MiniPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={() => {}}
        onPrevious={() => {}}
        className={sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuth={handleAuth}
      />

      <EditPlaylistModal
        isOpen={editModalOpen}
        playlist={playlist}
        onClose={() => setEditModalOpen(false)}
        onSave={handlePlaylistSave}
      />

      <ShareModal
        isOpen={shareModalOpen}
        playlist={playlist}
        onClose={() => setShareModalOpen(false)}
      />

      <CollaborationModal
        isOpen={collaborationModalOpen}
        playlist={playlist}
        onClose={() => setCollaborationModalOpen(false)}
        onInviteUser={handleInviteUser}
        onRemoveCollaborator={handleRemoveCollaborator}
        onUpdatePermissions={handleUpdatePermissions}
      />
    </div>
  );
};

export default PlaylistManagement;