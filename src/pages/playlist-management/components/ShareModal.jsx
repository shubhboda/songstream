import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ 
  isOpen = false, 
  playlist = null, 
  onClose = () => {} 
}) => {
  const [shareUrl] = useState(`https://songstream.com/playlist/${playlist?.id || 'demo'}`);
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set());

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body?.appendChild(textArea);
      textArea?.select();
      document.execCommand('copy');
      document.body?.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: '#25D366',
      url: `https://wa.me/?text=Check out this playlist: ${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=Check out this playlist&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      color: '#E4405F',
      action: 'copy' // Instagram doesn't support direct URL sharing
    },
    {
      name: 'Telegram',icon: 'Send',color: '#0088CC',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=Check out this playlist`
    },
    {
      name: 'Discord',icon: 'MessageSquare',color: '#5865F2',action: 'copy'
    }
  ];

  const handlePlatformShare = (platform) => {
    if (platform?.url) {
      window.open(platform?.url, '_blank', 'width=600,height=400');
    } else if (platform?.action === 'copy') {
      handleCopyLink();
    }
  };

  const generateEmbedCode = () => {
    return `<iframe src="https://songstream.com/embed/playlist/${playlist?.id || 'demo'}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  };

  const [embedCode] = useState(generateEmbedCode());
  const [embedCopied, setEmbedCopied] = useState(false);

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard?.writeText(embedCode);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = embedCode;
      document.body?.appendChild(textArea);
      textArea?.select();
      document.execCommand('copy');
      document.body?.removeChild(textArea);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    }
  };

  if (!isOpen || !playlist) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-lg shadow-elevation-high border border-border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Share playlist</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Playlist Preview */}
          <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              <Icon name="Music" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{playlist?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {playlist?.songCount} songs • {playlist?.creator}
              </p>
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Share link
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant={copied ? "success" : "outline"}
                onClick={handleCopyLink}
                iconName={copied ? "Check" : "Copy"}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Share on social media
            </label>
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms?.map((platform) => (
                <button
                  key={platform?.name}
                  onClick={() => handlePlatformShare(platform)}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:bg-surface/50 transition-spring"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${platform?.color}20` }}
                  >
                    <Icon 
                      name={platform?.icon} 
                      size={20} 
                      color={platform?.color} 
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {platform?.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Embed Code */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Embed playlist
            </label>
            <div className="space-y-2">
              <textarea
                value={embedCode}
                readOnly
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-xs font-mono resize-none"
              />
              <Button
                variant={embedCopied ? "success" : "outline"}
                size="sm"
                onClick={handleCopyEmbed}
                iconName={embedCopied ? "Check" : "Copy"}
                iconPosition="left"
                fullWidth
              >
                {embedCopied ? "Embed code copied!" : "Copy embed code"}
              </Button>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              QR Code
            </label>
            <div className="flex items-center justify-center p-6 bg-surface/50 rounded-lg">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Icon name="QrCode" size={48} color="#000000" />
                  <p className="text-xs text-gray-600">QR Code</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan to open playlist on mobile
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div className="text-xs text-warning">
                <p className="font-medium">Privacy Notice</p>
                <p className="mt-1">
                  {playlist?.isPublic 
                    ? "This playlist is public and can be viewed by anyone with the link." :"This playlist is private. Only people with the link can view it."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;