import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse = () => {} }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      label: 'Home',
      path: '/music-dashboard-home',
      icon: 'Home',
      description: 'Discover new music'
    },
    {
      label: 'Search',
      path: '/search-and-discovery',
      icon: 'Search',
      description: 'Find songs and artists'
    }
  ];

  const libraryItems = [
    {
      label: 'Your Library',
      path: '/music-library-browser',
      icon: 'Library',
      description: 'Your saved music'
    },
    {
      label: 'Playlists',
      path: '/playlist-management',
      icon: 'ListMusic',
      description: 'Manage playlists'
    },
    {
      label: 'Player',
      path: '/music-player-interface',
      icon: 'Play',
      description: 'Now playing'
    },
    {
      label: 'Add Song',
      path: '/add-song',
      icon: 'Plus',
      description: 'Add a new song'
    },
    {
      label: 'Favorites',
      path: '/favorites',
      icon: 'Heart',
      description: 'Your favorite songs'
    }
  ];

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const renderNavItem = (item, index) => {
    const active = isActive(item?.path);
    const isHovered = hoveredItem === `${item?.path}-${index}`;
    
    return (
      <Link
        key={item?.path}
        to={item?.path}
        className={`flex items-center px-3 py-2 rounded-lg transition-spring hover-lift group relative ${
          active 
            ? 'bg-primary/10 text-primary border-accent-active' :'text-muted-foreground hover:text-foreground hover:bg-surface/50'
        }`}
        onMouseEnter={() => setHoveredItem(`${item?.path}-${index}`)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Icon 
          name={item?.icon} 
          size={20} 
          color={active ? 'var(--color-primary)' : 'currentColor'} 
        />
        {!isCollapsed && (
          <>
            <span className="ml-3 font-medium">{item?.label}</span>
            {isHovered && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-elevation-high whitespace-nowrap z-40">
                {item?.description}
              </div>
            )}
          </>
        )}
        {isCollapsed && isHovered && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-elevation-high whitespace-nowrap z-40">
            {item?.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside className={`fixed left-0 top-nav bottom-0 z-10 glass transition-spring hidden lg:flex flex-col ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hover:bg-surface"
        >
          <Icon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            size={16} 
          />
        </Button>
      </div>
      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Discover
            </h3>
          )}
          {navigationItems?.map((item, index) => renderNavItem(item, index))}
        </div>

        {/* Library Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Your Music
            </h3>
          )}
          {libraryItems?.map((item, index) => renderNavItem(item, `library-${index}`))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="space-y-2 pt-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Quick Actions
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="Plus"
              iconPosition="left"
            >
              Create Playlist
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              iconName="Heart"
              iconPosition="left"
            >
              Liked Songs
            </Button>
          </div>
        )}
      </div>
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Music Lover</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;