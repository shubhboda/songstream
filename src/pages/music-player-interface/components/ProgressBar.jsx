import React, { useState, useRef, useEffect } from 'react';

const ProgressBar = ({ 
  currentTime = 0,
  duration = 0,
  onSeek = () => {},
  disabled = false,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const progressRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || disabled) return;
    handleSeek(e);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    onSeek(dragValue);
  };

  const handleSeek = (e) => {
    if (!progressRef?.current) return;
    
    const rect = progressRef?.current?.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e?.clientX - rect?.left) / rect?.width));
    const newTime = percent * duration;
    setDragValue(newTime);
  };

  const displayTime = isDragging ? dragValue : currentTime;
  const progress = duration > 0 ? (displayTime / duration) * 100 : 0;

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Progress Bar */}
      <div 
        ref={progressRef}
        className={`relative h-2 bg-muted rounded-full cursor-pointer group ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        {/* Progress Fill */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        
        {/* Progress Thumb */}
        <div 
          className={`absolute top-1/2 w-4 h-4 bg-primary rounded-full transform -translate-y-1/2 transition-all duration-150 ${
            isDragging || progress > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          } group-hover:opacity-100 group-hover:scale-100`}
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>
      
      {/* Time Display */}
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>{formatTime(displayTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;