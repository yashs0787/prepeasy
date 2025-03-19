
// Helper function to check if the question/answer suggests a complex topic
export function isComplex(question: string, answer: string): boolean {
  // Check question complexity based on keywords
  const complexKeywords = [
    'optimize', 'strategy', 'complex', 'analysis', 'framework',
    'valuation', 'financial model', 'edge case', 'tradeoff',
    'implementation', 'technical', 'algorithm', 'architecture'
  ];
  
  const combinedText = (question + " " + answer).toLowerCase();
  
  // Check for complexity keywords
  const keywordMatches = complexKeywords.filter(keyword => 
    combinedText.includes(keyword.toLowerCase())
  );
  
  // Check length - longer answers might indicate complexity
  const isLongAnswer = answer.length > 500;
  
  return keywordMatches.length >= 2 || isLongAnswer;
}

// Helper function to determine if user needs more detailed explanations
export function needsDetails(answer: string): boolean {
  // Check for signals that user might be struggling
  const uncertaintySignals = [
    'not sure', 'confused', 'difficult', 'struggling',
    'help', 'don\'t understand', 'clarify', 'explain',
    'unsure', 'unclear', 'i think', 'maybe', 'perhaps'
  ];
  
  const lowerAnswer = answer.toLowerCase();
  
  // Check for uncertainty signals
  const uncertaintyMatches = uncertaintySignals.filter(signal => 
    lowerAnswer.includes(signal.toLowerCase())
  );
  
  // Short, incomplete answers might indicate struggling
  const isTooShort = answer.length < 150;
  
  return uncertaintyMatches.length >= 1 || isTooShort;
}
