
import React, { useState, useEffect } from 'react';
import { DynamicCollection } from './DynamicCollection';
import { ALL_COLLECTION_PROMPTS } from './collectionPrompts';

// Component that contains all predefined collections for the main page
export const DynamicCollections: React.FC = () => {
  // Intelligently select collections to display
  const [selectedCollections, setSelectedCollections] = useState(ALL_COLLECTION_PROMPTS.slice(0, 6));
  const [isLoading, setIsLoading] = useState(true);

  // Regenerate collections on each page reload with improved selection
  useEffect(() => {
    // Set loading to true while we shuffle collections
    setIsLoading(true);
    
    // Shuffle the list of prompts to get a random selection
    const shuffledPrompts = [...ALL_COLLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    
    // Create a balanced selection of 6-8 collections to improve load performance
    const numberOfCollections = 6 + Math.floor(Math.random() * 3); // 6-8 collections
    
    // Ensure we have a good mix of collection types
    const categoryGroups = {
      fiction: ["Clasici literari", "Romane victoriene", "Povești de dragoste", "Povești gotice"],
      adventure: ["Aventuri extraordinare", "Călătorii", "Pionieri sci-fi"],
      academic: ["Opere filozofice", "Filozofie antică", "Științe și explorare"],
      cultural: ["Opere Shakespeare", "Poezie clasică", "Mitologie și legende", "Autori americani", "Clasici ruși"],
      other: ["Biografii celebre", "Mistere și detectivi", "Cărți pentru copii"]
    };
    
    // Ensure we get at least one from each major category if possible
    const selectedPrompts = [];
    const categories = Object.keys(categoryGroups);
    
    // First, select one from each category to ensure diversity
    categories.forEach(category => {
      const categoryItems = categoryGroups[category as keyof typeof categoryGroups];
      const shuffledCategory = [...categoryItems].sort(() => Math.random() - 0.5);
      const matchingPrompt = shuffledPrompts.find(prompt => 
        shuffledCategory.includes(prompt.title) && !selectedPrompts.includes(prompt)
      );
      if (matchingPrompt) {
        selectedPrompts.push(matchingPrompt);
        // Remove from shuffled list to avoid duplicates
        const index = shuffledPrompts.indexOf(matchingPrompt);
        if (index > -1) shuffledPrompts.splice(index, 1);
      }
    });
    
    // Fill remaining slots with random selections
    while (selectedPrompts.length < numberOfCollections && shuffledPrompts.length > 0) {
      selectedPrompts.push(shuffledPrompts.shift()!);
    }
    
    console.log(`Generating ${selectedPrompts.length} balanced collections`);
    
    // Small timeout to prevent too many simultaneous API calls
    setTimeout(() => {
      setSelectedCollections(selectedPrompts);
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
