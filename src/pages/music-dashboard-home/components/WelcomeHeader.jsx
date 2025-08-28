import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ currentUser = null, onRefresh = () => {} }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    if (currentUser?.name) {
      return currentUser?.name?.split(' ')?.[0]; // First name only
    }
    return 'Music Lover';
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {getGreeting()}, {getUserName()}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to discover some great music today?
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            className="hover:bg-surface"
          >
            <Icon name="RefreshCw" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-surface"
          >
            <Icon name="Bell" size={20} />
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 lg:hidden">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">127</div>
          <div className="text-xs text-muted-foreground">Songs</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">23</div>
          <div className="text-xs text-muted-foreground">Playlists</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">8.5h</div>
          <div className="text-xs text-muted-foreground">This week</div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHeader;