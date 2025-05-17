
import React, { useState, useEffect } from 'react';
import { DynamicCollection } from './DynamicCollection';
import { ALL_COLLECTION_PROMPTS } from './collectionPrompts';

// Component that contains all predefined collections for the main page
export const DynamicCollections: React.FC = () => {
  // Randomly select between 8-12 different collections to display
  const [selectedCollections, setSelectedCollections] = useState(ALL_COLLECTION_PROMPTS.slice(0, 8));

  // Regenerate collections on each page reload
  useEffect(() => {
    // Shuffle the list of prompts to get a random selection
    const shuffledPrompts = [...ALL_COLLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    
    // Select between 8 and 12 prompts
    const numberOfCollections = Math.floor(Math.random() * 5) + 8; // 8-12 collections
    console.log(`Generating ${numberOfCollections} random collections`);
    setSelectedCollections(shuffledPrompts.slice(0, numberOfCollections));
  }, []);

  return (
    <>
      {selectedCollections.map((collection, index) => (
        <DynamicCollection 
          key={`${index}-${collection.title}`} 
          title={collection.title}
          prompt={collection.prompt}
          icon={collection.icon}
        />
      ))}
    </>
  );
};
