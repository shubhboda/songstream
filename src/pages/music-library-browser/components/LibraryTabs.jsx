import React from 'react';
import Button from '../../../components/ui/Button';

const LibraryTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex space-x-1 p-1 bg-muted rounded-lg">
      {tabs?.map((tab) => (
        <Button
          key={tab?.id}
          variant={activeTab === tab?.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab?.id)}
          className="flex-1 text-sm"
        >
          {tab?.label}
        </Button>
      ))}
    </div>
  );
};

export default LibraryTabs;