import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/music-dashboard-home',
      icon: 'Home',
      activeIcon: 'Home'
    },
    {
      label: 'Search',
      path: '/search-and-discovery',
      icon: 'Search',
      activeIcon: 'Search'
    },
    {
      label: 'Library',
      path: '/music-library-browser',
      icon: 'Library',
      activeIcon: 'Library'
    },
    {
      label: 'Profile',
      path: '/user-authentication-login-register',
      icon: 'User',
      activeIcon: 'User'
    }
  ];

  const isActive = (path) => {
    if (path === '/music-library-browser') {
      return location?.pathname === '/music-library-browser' || location?.pathname === '/playlist-management';
    }
    return location?.pathname === path;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-border safe-area-bottom lg:hidden ${className}`}>
      <div className="flex items-center justify-around h-nav">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 transition-spring hover-lift ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon 
                name={active ? item?.activeIcon : item?.icon} 
                size={20} 
                color={active ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
              />
              <span className={`text-xs mt-1 font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {item?.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;