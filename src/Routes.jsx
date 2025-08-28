import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PlaylistManagement from './pages/playlist-management';
import UserAuthentication from './pages/user-authentication-login-register';
import MusicPlayerInterface from './pages/music-player-interface';
import SearchAndDiscovery from './pages/search-and-discovery';
import MusicDashboardHome from './pages/music-dashboard-home';
import MusicLibraryBrowser from './pages/music-library-browser';
import AddSongPage from './pages/add-song';
import FavoritesPage from './pages/favorites';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MusicDashboardHome />} />
        <Route path="/playlist-management" element={<PlaylistManagement />} />
        <Route path="/user-authentication-login-register" element={<UserAuthentication />} />
        <Route path="/music-player-interface" element={<MusicPlayerInterface />} />
        <Route path="/search-and-discovery" element={<SearchAndDiscovery />} />
        <Route path="/music-dashboard-home" element={<MusicDashboardHome />} />
        <Route path="/music-library-browser" element={<MusicLibraryBrowser />} />
        <Route path="/add-song" element={<AddSongPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
