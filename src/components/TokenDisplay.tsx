
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Coins } from 'lucide-react';

const TokenDisplay: React.FC = () => {
  // In a real implementation, this would come from a user context or state
  const tokenAmount = 100;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 px-2 font-medium border border-amber-300"
        >
          <Coins className="h-4 w-4 text-libra-amber" />
          <span className="text-libra-amber">{tokenAmount}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="text-sm">
        <p>Your READ tokens</p>
        <p className="text-xs text-muted-foreground">Earn by contributing</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TokenDisplay;
