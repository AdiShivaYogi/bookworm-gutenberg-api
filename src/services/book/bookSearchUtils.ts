
// This file now serves as a single export point for all book search utilities
// This makes it easier to import these functions in existing code without updating import paths

export { 
  fetchRealBooksFromRecommendations,
  fetchBookFromGutenberg 
} from './bookFetchUtils';

export {
  getFallbackRecommendations,
  getFallbackCollection
} from './fallbackUtils';

// Re-export other utility functions if they're needed elsewhere
export {
  sortRecommendationsByAuthorPriority,
  priorityAuthors,
  romanianToEnglishMap,
  translateSearchTerms
} from './authorUtils';

export {
  searchByTitleAndAuthor,
  searchByExactTitle,
  searchByAuthorAndFirstTitleWord,
  searchByPartialTitle,
  searchByAuthorLastName
} from './searchStrategies';

