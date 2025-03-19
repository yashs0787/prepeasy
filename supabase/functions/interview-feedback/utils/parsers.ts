
// Helper function to parse Claude's feedback into a structured format
export function parseClaudeFeedback(text: string) {
  try {
    let score = 0;
    const strengths = [];
    const improvements = [];
    let example = "";
    let scoreBreakdown = {};
    let nextSteps = "";
    
    // Extract overall score
    const scoreMatch = text.match(/(\d+)(?:\s*\/\s*100|\s*out of\s*100)/i);
    if (scoreMatch) {
      score = parseInt(scoreMatch[1], 10);
    }
    
    // Extract strengths
    const strengthsSection = text.match(/strengths?:?(.*?)(?:areas?|improvements?|example|score breakdown|suggested|next steps)/is);
    if (strengthsSection) {
      const strengthsList = strengthsSection[1].trim().split(/\n+/);
      for (const item of strengthsList) {
        const cleanItem = item.replace(/^[-•*]\s*/, '').trim();
        if (cleanItem) strengths.push(cleanItem);
      }
    }
    
    // Extract areas for improvement
    const improvementsSection = text.match(/(?:areas?|improvements?):?(.*?)(?:example|score breakdown|suggested|next steps)/is);
    if (improvementsSection) {
      const improvementsList = improvementsSection[1].trim().split(/\n+/);
      for (const item of improvementsList) {
        const cleanItem = item.replace(/^[-•*]\s*/, '').trim();
        if (cleanItem) improvements.push(cleanItem);
      }
    }
    
    // Extract example response
    const exampleSection = text.match(/example(?:\s+of\s+a\s+stronger\s+response)?:?(.*?)(?:score breakdown|suggested|next steps)/is);
    if (exampleSection) {
      example = exampleSection[1].trim();
    }
    
    // Extract score breakdown
    const breakdownSection = text.match(/score breakdown:?(.*?)(?:suggested|next steps)/is);
    if (breakdownSection) {
      const breakdownText = breakdownSection[1];
      const categories = breakdownText.match(/([A-Za-z\s]+):\s*(\d+)(?:\s*\/\s*100)?/g) || [];
      
      for (const category of categories) {
        const [name, scoreStr] = category.split(':').map(s => s.trim());
        if (name && scoreStr) {
          const categoryScore = parseInt(scoreStr.replace(/\/\s*100/, ''), 10);
          if (!isNaN(categoryScore)) {
            scoreBreakdown[name] = categoryScore;
          }
        }
      }
    }
    
    // Extract next steps
    const nextStepsSection = text.match(/next steps(?:\s+for\s+improvement)?:?(.*?)(?:$)/is);
    if (nextStepsSection) {
      nextSteps = nextStepsSection[1].trim();
    }
    
    return {
      score,
      strengths,
      improvements,
      example,
      scoreBreakdown,
      nextSteps
    };
  } catch (error) {
    console.error("Error parsing Claude feedback:", error);
    return {
      score: 0,
      strengths: ["[Parsing error: Could not extract strengths]"],
      improvements: ["[Parsing error: Could not extract areas for improvement]"],
      example: "[Parsing error: Could not extract example response]",
      scoreBreakdown: {},
      nextSteps: "[Parsing error: Could not extract next steps]"
    };
  }
}

// Helper function to parse OpenAI's feedback into a structured format
export function parseOpenAIFeedback(text: string) {
  // Reuse the same parsing logic as Claude for consistency
  return parseClaudeFeedback(text);
}
