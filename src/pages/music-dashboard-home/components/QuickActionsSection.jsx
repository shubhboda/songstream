import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsSection = ({ onCreatePlaylist = () => {}, onViewLikedSongs = () => {} }) => {
  const quickActions = [
    {
      id: 'create-playlist',
      title: 'Create Playlist',
      description: 'Make your own mix',
      icon: 'Plus',
      color: 'bg-primary',
      action: onCreatePlaylist,
      link: '/playlist-management'
    },
    {
      id: 'liked-songs',
      title: 'Liked Songs',
      description: 'Your favorite tracks',
      icon: 'Heart',
      color: 'bg-error',
      action: onViewLikedSongs,
      link: '/music-library-browser'
    },
    {
      id: 'recently-played',
      title: 'Recently Played',
      description: 'Jump back in',
      icon: 'Clock',
      color: 'bg-accent',
      action: () => {},
      link: '/music-library-browser'
    },
    {
      id: 'discover-weekly',
      title: 'Discover Weekly',
      description: 'Your weekly mix',
      icon: 'Compass',
      color: 'bg-success',
      action: () => {},
      link: '/search-and-discovery'
    }
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.link}
            className="bg-card border border-border rounded-lg p-4 hover:bg-surface/50 transition-spring hover-lift group cursor-pointer"
            onClick={(e) => {
              if (action?.action && typeof action?.action === 'function') {
                action?.action();
              }
            }}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 ${action?.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {action?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {action?.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActionsSection;