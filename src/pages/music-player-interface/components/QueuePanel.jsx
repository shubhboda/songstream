import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QueuePanel = ({ 
  isVisible = false,
  onClose = () => {},
  currentTrack = null,
  queue = [],
  history = [],
  onTrackSelect = () => {},
  onRemoveFromQueue = () => {},
  onClearQueue = () => {},
  onReorderQueue = () => {},
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' or 'history'

  const mockQueue = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 200
    },
    {
      id: 2,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      duration: 174
    },
    {
      id: 3,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      duration: 203
    },
    {
      id: 4,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 178
    },
    {
      id: 5,
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      album: "F*CK LOVE 3: OVER YOU",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      duration: 141
    }
  ];

  const mockHistory = [
    {
      id: 6,
      title: "Peaches",
      artist: "Justin Bieber ft. Daniel Caesar & Giveon",
      album: "Justice",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      duration: 198
    },
    {
      id: 7,
      title: "Montero (Call Me By Your Name)",
      artist: "Lil Nas X",
      album: "MONTERO",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 137
    }
  ];

  const displayQueue = queue?.length > 0 ? queue : mockQueue;
  const displayHistory = history?.length > 0 ? history : mockHistory;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const renderTrackItem = (track, index, isHistory = false) => (
    <div
      key={track?.id}
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface/50 transition-spring group cursor-pointer"
      onClick={() => onTrackSelect(track)}
    >
      {/* Track Number / Drag Handle */}
      <div className="w-6 text-center">
        {!isHistory ? (
          <span className="text-sm text-muted-foreground group-hover:hidden">
            {index + 1}
          </span>
        ) : null}
        {!isHistory && (
          <Icon 
            name="GripVertical" 
            size={16} 
            className="hidden group-hover:block text-muted-foreground cursor-grab"
          />
        )}
      </div>
      
      {/* Artwork */}
      <div className="w-10 h-10 flex-shrink-0">
        <Image
          src={track?.artwork}
          alt={`${track?.title} artwork`}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {track?.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {track?.artist}
        </p>
      </div>
      
      {/* Duration */}
      <span className="text-xs text-muted-foreground font-mono">
        {formatDuration(track?.duration)}
      </span>
      
      {/* Actions */}
      {!isHistory && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e?.stopPropagation();
            onRemoveFromQueue(track?.id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="X" size={16} />
        </Button>
      )}
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-30 bg-background ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="ChevronDown" size={24} />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Queue</h2>
        </div>
        
        {activeTab === 'queue' && displayQueue?.length > 0 && (
          <Button
            variant="ghost"
            onClick={onClearQueue}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('queue')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'queue' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Up Next ({displayQueue?.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'history' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Recently Played ({displayHistory?.length})
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'queue' ? (
          <div className="p-4 space-y-1">
            {displayQueue?.length > 0 ? (
              <>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  Next in Queue
                </p>
                {displayQueue?.map((track, index) => renderTrackItem(track, index))}
              </>
            ) : (
              <div className="text-center py-12">
                <Icon name="Music" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No songs in queue</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add songs to see them here
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 space-y-1">
            {displayHistory?.length > 0 ? (
              <>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  Recently Played
                </p>
                {displayHistory?.map((track, index) => renderTrackItem(track, index, true))}
              </>
            ) : (
              <div className="text-center py-12">
                <Icon name="History" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No listening history</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your recently played songs will appear here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueuePanel;