
import React from 'react';
import { Button } from '@/components/ui/button';

const CommunitySection: React.FC = () => {
  return (
    <div className="bg-muted/30 border rounded-lg p-4 mt-8">
      <h3 className="font-medium mb-2">Community Contributions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Help improve this book's information and earn READ tokens. 
        Write reviews, add missing details, or help with translations.
      </p>
      <Button variant="outline" disabled>
        Contribute and Earn Tokens (Coming Soon)
      </Button>
    </div>
  );
};

export default CommunitySection;
