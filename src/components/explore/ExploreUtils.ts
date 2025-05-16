
export const getApiTopicFromList = (list: string) => {
  const listToTopicMap: Record<string, string> = {
    'top-downloads': 'bestsellers',
    'new-additions': 'recent',
    'classics': 'classics',
    'fiction': 'fiction',
    'educational': 'education'
  };
  return listToTopicMap[list] || '';
};
