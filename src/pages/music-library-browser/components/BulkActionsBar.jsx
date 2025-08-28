import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount = 0, 
  onSelectAll = () => {}, 
  onDeselectAll = () => {}, 
  onAddToPlaylist = () => {}, 
  onDelete = () => {},
  onFavorite = () => {},
  isVisible = false 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-nav left-0 right-0 lg:left-64 z-20 bg-primary text-primary-foreground shadow-elevation-high">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">
            {selectedCount} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            Select All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectAll}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            Deselect All
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddToPlaylist}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="Plus" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavorite}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="Heart" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="Trash2" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;