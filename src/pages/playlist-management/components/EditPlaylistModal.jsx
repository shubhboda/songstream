import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EditPlaylistModal = ({ 
  isOpen = false, 
  playlist = null, 
  onClose = () => {}, 
  onSave = () => {} 
}) => {
  const [formData, setFormData] = useState({
    name: playlist?.name || '',
    description: playlist?.description || '',
    isPublic: playlist?.isPublic || false,
    isCollaborative: playlist?.isCollaborative || false,
    coverArt: playlist?.coverArt || ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coverArtFile, setCoverArtFile] = useState(null);

  React.useEffect(() => {
    if (playlist) {
      setFormData({
        name: playlist?.name || '',
        description: playlist?.description || '',
        isPublic: playlist?.isPublic || false,
        isCollaborative: playlist?.isCollaborative || false,
        coverArt: playlist?.coverArt || ''
      });
    }
  }, [playlist]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCoverArtChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setCoverArtFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          coverArt: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Playlist name is required';
    } else if (formData?.name?.length > 100) {
      newErrors.name = 'Playlist name must be less than 100 characters';
    }

    if (formData?.description?.length > 300) {
      newErrors.description = 'Description must be less than 300 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave({
        ...playlist,
        ...formData,
        updatedDate: new Date()?.toISOString()
      });
      
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to update playlist. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-lg shadow-elevation-high border border-border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Edit playlist</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cover Art Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Cover Image
            </label>
            <div className="flex items-start space-x-4">
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={formData?.coverArt}
                  alt="Playlist cover"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Choose a photo for your playlist. It will appear on your profile and in search results.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverArtChange}
                  className="hidden"
                  id="cover-art-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('cover-art-input')?.click()}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Choose photo
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors?.name}
            placeholder="My Playlist #1"
            required
            maxLength={100}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Add an optional description"
              rows={3}
              maxLength={300}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            {errors?.description && (
              <p className="text-sm text-error">{errors?.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData?.description?.length}/300 characters
            </p>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Privacy Settings</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData?.isPublic}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={16} />
                    <span className="text-sm font-medium text-foreground">Make public</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Anyone can search for and view this playlist
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isCollaborative"
                  checked={formData?.isCollaborative}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} />
                    <span className="text-sm font-medium text-foreground">Collaborative playlist</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Let others add and remove songs
                  </p>
                </div>
              </label>
            </div>
          </div>

          {errors?.submit && (
            <div className="text-sm text-error bg-error/10 border border-error/20 rounded-md p-3">
              {errors?.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
            >
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaylistModal;