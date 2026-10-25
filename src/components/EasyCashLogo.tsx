import React from 'react';

interface EasyCashLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'badge';
}

export const EasyCashLogo: React.FC<EasyCashLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24'
  }[size];

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center p-2 rounded-2xl bg-white shadow-xs ${className}`}>
        <img
          src="/assets/easycash-logo.png"
          alt="EasyCash Financial Services"
          className={`${sizeClasses} w-auto object-contain select-none`}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src="/assets/easycash-logo.png"
        alt="EasyCash Financial Services"
        className={`${sizeClasses} w-auto object-contain`}
        loading="eager"
      />
    </div>
  );
};
