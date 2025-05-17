
import React, { useState, useEffect } from 'react';
import { DynamicCollection } from './DynamicCollection';
import { ALL_COLLECTION_PROMPTS } from './collectionPrompts';

// Componenta ce conține toate colecțiile predefinite pentru pagina principală
export const DynamicCollections: React.FC = () => {
  // Selectează aleatoriu între 8-12 colecții diferite pentru afișare
  const [selectedCollections, setSelectedCollections] = useState<Array<{
    title: string;
    prompt: string;
    icon: React.ReactNode;
  }>>([]);

  // Regenerează colecțiile la fiecare reîncărcare a paginii
  useEffect(() => {
    // Amestecă lista de prompturi pentru a obține o selecție aleatorie
    const shuffledPrompts = [...ALL_COLLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    
    // Selectează între 8 și 12 prompturi
    const numberOfCollections = Math.floor(Math.random() * 5) + 8; // 8-12 colecții
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
