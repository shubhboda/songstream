import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlayerHeader = ({ 
  onCollapse = () => {},
  onShowQueue = () => {},
  onShowLyrics = () => {},
  showLyrics = false,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleCollapse = () => {
    onCollapse();
    navigate(-1);
  };

  return (
    <div className={`flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCollapse}
        className="text-foreground"
      >
        <Icon name="ChevronDown" size={24} />
      </Button>
      
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">Now Playing</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowLyrics}
          className={`text-foreground ${showLyrics ? 'bg-primary/20 text-primary' : ''}`}
        >
          <Icon name="FileText" size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowQueue}
          className="text-foreground"
        >
          <Icon name="List" size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground"
        >
          <Icon name="MoreHorizontal" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default PlayerHeader;