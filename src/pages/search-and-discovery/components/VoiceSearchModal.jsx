import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceSearchModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onResult = () => {},
  isListening = false 
}) => {
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (isOpen && isListening) {
      // Simulate audio level animation
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);

      // Simulate voice recognition
      const timeout = setTimeout(() => {
        setTranscript('taylor swift anti hero');
        setIsProcessing(true);
        
        setTimeout(() => {
          onResult('taylor swift anti hero');
          onClose();
          setTranscript('');
          setIsProcessing(false);
        }, 1500);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isOpen, isListening, onResult, onClose]);

  const handleTryAgain = () => {
    setTranscript('');
    setIsProcessing(false);
    // Restart listening simulation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevation-high border border-border p-8 text-center">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <Icon name="X" size={20} />
        </Button>

        {/* Voice Animation */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
            {/* Outer Ring */}
            <div className={`absolute inset-0 rounded-full border-4 border-primary/30 ${isListening ? 'animate-ping' : ''}`} />
            
            {/* Middle Ring */}
            <div className={`absolute inset-4 rounded-full border-2 border-primary/50 ${isListening ? 'animate-pulse' : ''}`} />
            
            {/* Inner Circle */}
            <div className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Icon 
                name="Mic" 
                size={24} 
                color="white"
                className={isListening ? 'animate-pulse' : ''}
              />
            </div>

            {/* Audio Level Bars */}
            {isListening && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)]?.map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full mx-1 transition-all duration-100"
                    style={{
                      height: `${Math.max(4, (audioLevel + i * 10) % 40)}px`,
                      opacity: 0.7
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2 mb-6">
          {isProcessing ? (
            <>
              <h3 className="text-lg font-semibold text-foreground">Processing...</h3>
              <p className="text-sm text-muted-foreground">Searching for "{transcript}"</p>
            </>
          ) : isListening ? (
            <>
              <h3 className="text-lg font-semibold text-foreground">Listening...</h3>
              <p className="text-sm text-muted-foreground">Say something like "Play Taylor Swift"</p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-foreground">Voice Search</h3>
              <p className="text-sm text-muted-foreground">Tap the microphone to start</p>
            </>
          )}
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="mb-6 p-3 bg-surface border border-border rounded-lg">
            <p className="text-sm text-foreground font-medium">"{transcript}"</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {isListening ? (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              iconName="Square"
              iconPosition="left"
            >
              Stop
            </Button>
          ) : transcript && !isProcessing ? (
            <>
              <Button
                variant="outline"
                onClick={handleTryAgain}
                className="flex-1"
                iconName="RotateCcw"
                iconPosition="left"
              >
                Try Again
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  onResult(transcript);
                  onClose();
                }}
                className="flex-1"
                iconName="Search"
                iconPosition="left"
              >
                Search
              </Button>
            </>
          ) : !isProcessing ? (
            <Button
              variant="default"
              onClick={() => {}}
              className="flex-1"
              iconName="Mic"
              iconPosition="left"
            >
              Start Listening
            </Button>
          ) : null}
        </div>

        {/* Tips */}
        {!isListening && !transcript && (
          <div className="mt-6 text-xs text-muted-foreground">
            <p>Try saying:</p>
            <p>"Play Billie Eilish" • "Find pop music" • "Show me playlists"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceSearchModal;