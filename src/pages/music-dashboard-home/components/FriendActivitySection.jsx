import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FriendActivitySection = ({ friendActivity = [], onFollowFriend = () => {} }) => {
  const defaultActivity = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        isFollowing: false
      },
      action: "liked",
      track: {
        title: "Blinding Lights",
        artist: "The Weeknd",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
      },
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        isFollowing: true
      },
      action: "created playlist",
      playlist: {
        name: "Summer Vibes 2024",
        trackCount: 25
      },
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        isFollowing: true
      },
      action: "started listening to",
      track: {
        title: "As It Was",
        artist: "Harry Styles",
        artwork: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=100&h=100&fit=crop"
      },
      timestamp: new Date(Date.now() - 5400000) // 1.5 hours ago
    },
    {
      id: 4,
      user: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        isFollowing: false
      },
      action: "shared",
      track: {
        title: "Heat Waves",
        artist: "Glass Animals",
        artwork: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=100&h=100&fit=crop"
      },
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ];

  const activities = friendActivity?.length > 0 ? friendActivity : defaultActivity;

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getActionText = (activity) => {
    switch (activity?.action) {
      case 'liked':
        return `liked "${activity?.track?.title}"`;
      case 'created playlist':
        return `created playlist "${activity?.playlist?.name}"`;
      case 'started listening to':
        return `started listening to "${activity?.track?.title}"`;
      case 'shared':
        return `shared "${activity?.track?.title}"`;
      default:
        return activity?.action;
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Friend Activity</h2>
        <Link 
          to="/user-authentication-login-register" 
          className="text-sm text-primary hover:underline font-medium"
        >
          See all
        </Link>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {activities?.map((activity, index) => (
          <div
            key={activity?.id}
            className={`p-4 hover:bg-surface/50 transition-spring ${
              index !== activities?.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    src={activity?.user?.avatar}
                    alt={`${activity?.user?.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity?.user?.name}</span>
                      <span className="text-muted-foreground ml-1">
                        {getActionText(activity)}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(activity?.timestamp)}
                    </p>
                  </div>
                  
                  {!activity?.user?.isFollowing && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onFollowFriend(activity?.user)}
                      className="ml-2 flex-shrink-0"
                    >
                      Follow
                    </Button>
                  )}
                </div>
                
                {/* Track/Playlist Info */}
                {activity?.track && (
                  <div className="flex items-center space-x-2 mt-2 p-2 bg-surface/30 rounded">
                    <div className="w-8 h-8 overflow-hidden rounded">
                      <Image
                        src={activity?.track?.artwork}
                        alt={`${activity?.track?.title} artwork`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {activity?.track?.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity?.track?.artist}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Icon name="Play" size={12} />
                    </Button>
                  </div>
                )}
                
                {activity?.playlist && (
                  <div className="flex items-center space-x-2 mt-2 p-2 bg-surface/30 rounded">
                    <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                      <Icon name="ListMusic" size={14} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {activity?.playlist?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity?.playlist?.trackCount} songs
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Icon name="ExternalLink" size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FriendActivitySection;