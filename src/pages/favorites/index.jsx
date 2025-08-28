import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { getFavoriteTracks } from '../../utils/favorites';
import { Link, useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTracks(getFavoriteTracks());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Header />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-nav pb-nav lg:pb-mini-player transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Your Favorites</h1>
            <Link to="/music-dashboard-home" className="text-sm text-primary hover:underline">Back to Home</Link>
          </div>
          {tracks.length === 0 ? (
            <div className="text-muted-foreground">No favorite songs yet. Like a song to add it here.</div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {tracks.map((t, idx) => (
                <div key={t.id} className={`flex items-center p-4 ${idx !== tracks.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="w-12 h-12 mr-4">
                    <Image src={t.artwork} alt={`${t.title} artwork`} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{t.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.artist}</div>
                  </div>
                  <Button variant="default" size="sm" onClick={() => navigate('/music-dashboard-home', { state: { playFrom: 'favorites', trackId: t.id } })}>
                    <Icon name="Play" size={14} />
                    <span className="ml-2">Play</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default FavoritesPage;


