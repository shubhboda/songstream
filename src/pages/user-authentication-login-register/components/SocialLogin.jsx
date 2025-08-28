import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-500'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-foreground'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-sm text-muted-foreground">or continue with</span>
        <div className="flex-1 border-t border-border" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => onSocialLogin(provider?.id)}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Icon name={provider?.icon} size={18} className={provider?.color} />
            <span className="hidden sm:inline">{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;