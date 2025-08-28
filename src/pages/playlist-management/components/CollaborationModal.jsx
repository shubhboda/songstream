import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaborationModal = ({ 
  isOpen = false, 
  playlist = null, 
  onClose = () => {},
  onInviteUser = () => {},
  onRemoveCollaborator = () => {},
  onUpdatePermissions = () => {}
}) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePermission, setInvitePermission] = useState('edit');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteError, setInviteError] = useState('');

  // Mock collaborators data
  const [collaborators] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      permission: 'edit',
      joinedDate: '2025-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      permission: 'view',
      joinedDate: '2025-01-20',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      permission: 'edit',
      joinedDate: '2025-01-10',
      status: 'active'
    }
  ]);

  const handleInviteSubmit = async (e) => {
    e?.preventDefault();
    
    if (!inviteEmail?.trim()) {
      setInviteError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/?.test(inviteEmail)) {
      setInviteError('Please enter a valid email address');
      return;
    }

    setIsInviting(true);
    setInviteError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onInviteUser({
        email: inviteEmail,
        permission: invitePermission
      });
      
      setInviteEmail('');
      setInvitePermission('edit');
    } catch (error) {
      setInviteError('Failed to send invitation. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  const handlePermissionChange = (collaboratorId, newPermission) => {
    onUpdatePermissions(collaboratorId, newPermission);
  };

  const handleRemoveCollaborator = (collaboratorId) => {
    if (window.confirm('Are you sure you want to remove this collaborator?')) {
      onRemoveCollaborator(collaboratorId);
    }
  };

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case 'owner': return 'Crown';
      case 'edit': return 'Edit';
      case 'view': return 'Eye';
      default: return 'User';
    }
  };

  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'owner': return 'var(--color-warning)';
      case 'edit': return 'var(--color-primary)';
      case 'view': return 'var(--color-muted-foreground)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
            <div className="w-1.5 h-1.5 bg-success rounded-full mr-1" />
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
            <div className="w-1.5 h-1.5 bg-warning rounded-full mr-1" />
            Pending
          </span>
        );
      default:
        return null;
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
      <div className="relative w-full max-w-2xl bg-card rounded-lg shadow-elevation-high border border-border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Manage collaborators</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Invite others to help curate "{playlist?.name}"
            </p>
          </div>
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
          {/* Invite Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Invite collaborators</h3>
            
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => {
                      setInviteEmail(e?.target?.value);
                      setInviteError('');
                    }}
                    error={inviteError}
                  />
                </div>
                
                <select
                  value={invitePermission}
                  onChange={(e) => setInvitePermission(e?.target?.value)}
                  className="px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="edit">Can edit</option>
                  <option value="view">Can view</option>
                </select>
                
                <Button
                  type="submit"
                  variant="default"
                  loading={isInviting}
                  iconName="Send"
                >
                  Invite
                </Button>
              </div>
            </form>

            <div className="p-4 bg-surface/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium">Permission levels:</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>• <strong>Can edit:</strong> Add, remove, and reorder songs</li>
                    <li>• <strong>Can view:</strong> View playlist but cannot make changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Current Collaborators */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Current collaborators ({collaborators?.length + 1})
              </h3>
            </div>

            <div className="space-y-3">
              {/* Owner */}
              <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{playlist?.creator}</p>
                    <p className="text-sm text-muted-foreground">Playlist owner</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getPermissionIcon('owner')} 
                      size={16} 
                      color={getPermissionColor('owner')} 
                    />
                    <span className="text-sm font-medium text-foreground">Owner</span>
                  </div>
                  {getStatusBadge('active')}
                </div>
              </div>

              {/* Collaborators */}
              {collaborators?.map((collaborator) => (
                <div key={collaborator?.id} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={collaborator?.avatar}
                      alt={collaborator?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{collaborator?.name}</p>
                      <p className="text-sm text-muted-foreground">{collaborator?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <select
                      value={collaborator?.permission}
                      onChange={(e) => handlePermissionChange(collaborator?.id, e?.target?.value)}
                      className="px-2 py-1 bg-input border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="edit">Can edit</option>
                      <option value="view">Can view</option>
                    </select>
                    
                    {getStatusBadge(collaborator?.status)}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCollaborator(collaborator?.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Collaboration settings</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border cursor-pointer">
                <div className="flex items-start space-x-3">
                  <Icon name="Users" size={20} color="var(--color-primary)" />
                  <div>
                    <p className="font-medium text-foreground">Allow collaborator invites</p>
                    <p className="text-sm text-muted-foreground">
                      Let collaborators invite other people to this playlist
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-surface/30 rounded-lg border border-border cursor-pointer">
                <div className="flex items-start space-x-3">
                  <Icon name="Bell" size={20} color="var(--color-primary)" />
                  <div>
                    <p className="font-medium text-foreground">Activity notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when collaborators make changes
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={false}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationModal;