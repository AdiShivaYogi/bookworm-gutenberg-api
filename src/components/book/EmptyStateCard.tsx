
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateCardProps {
  message: string;
  buttonText: string;
  onClick: () => void;
  buttonIcon?: ReactNode;
  disabled?: boolean;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ 
  message, 
  buttonText, 
  onClick,
  buttonIcon,
  disabled = false
}) => {
  return (
    <div className="text-center py-6">
      <p className="text-muted-foreground mb-4">
        {message}
      </p>
      <Button onClick={onClick} disabled={disabled}>
        {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyStateCard;
