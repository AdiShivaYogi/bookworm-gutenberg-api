
import React, { useState, useEffect } from 'react';
import { DynamicCollection } from './DynamicCollection';
import { ALL_COLLECTION_PROMPTS } from './collectionPrompts';

// Component that contains all predefined collections for the main page
export const DynamicCollections: React.FC = () => {
  // Randomly select between 8-12 different collections to display
  const [selectedCollections, setSelectedCollections] = useState(ALL_COLLECTION_PROMPTS.slice(0, 8));
  const [isLoading, setIsLoading] = useState(true);

  // Regenerate collections on each page reload
  useEffect(() => {
    // Set loading to true while we shuffle collections
    setIsLoading(true);
    
    // Shuffle the list of prompts to get a random selection
    const shuffledPrompts = [...ALL_COLLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    
    // Select between 8 and 10 prompts (reduced from 8-12 to improve load time)
    const numberOfCollections = Math.floor(Math.random() * 3) + 8; // 8-10 collections
    console.log(`Generating ${numberOfCollections} random collections`);
    
    // Small timeout to prevent too many simultaneous API calls
    setTimeout(() => {
      setSelectedCollections(shuffledPrompts.slice(0, numberOfCollections));
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <div className="bg-gray-50">
      {selectedCollections.map((collection, index) => (
        <DynamicCollection 
          key={`${index}-${collection.title}`} 
          title={collection.title}
          prompt={collection.prompt}
          icon={collection.icon}
          priority={index < 3} // Give priority to first 3 collections
        />
      ))}
    </div>
  );
};
