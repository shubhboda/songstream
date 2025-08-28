import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

import Button from './Button';

const Header = ({ currentUser = null, onSearch = () => {}, searchQuery = '', onAuthModalOpen = () => {} }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const location = useLocation();

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setLocalSearchQuery(value);
    onSearch(value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const isAuthPage = location?.pathname === '/user-authentication-login-register';

  if (isAuthPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-30 bg-background border-b border-border safe-area-top">
        <div className="flex items-center justify-center h-nav px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Music" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground">SongStream</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 glass safe-area-top">
      <div className="flex items-center justify-between h-nav px-4 lg:px-6">
        {/* Logo */}
        <Link to="/music-dashboard-home" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Flute" size={20} color="white" />
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Flute" size={20} color="white" />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">SongStream</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon 
                name="Search" 
                size={18} 
                color={isSearchFocused ? "var(--color-primary)" : "var(--color-muted-foreground)"} 
              />
            </div>
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-spring"
            />
            {localSearchQuery && (
              <button
                onClick={() => {
                  setLocalSearchQuery('');
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon name="X" size={16} color="var(--color-muted-foreground)" />
              </button>
            )}
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {currentUser ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Icon name="Bell" size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="text-sm font-medium text-foreground hidden md:block">
                  {currentUser?.name || 'User'}
                </span>
              </div>
            </>
          ) : (
            <Button 
              variant="outline" 
              onClick={onAuthModalOpen}
              className="text-sm"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;