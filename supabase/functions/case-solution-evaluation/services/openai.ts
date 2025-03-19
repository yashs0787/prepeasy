
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

export async function generateOpenAIEvaluation(caseData: any, userSolution: string, detailLevel: string) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  // Construct the prompt for GPT-4
  const systemPrompt = `You are an expert case interview evaluator specializing in management consulting interviews. 
Your task is to evaluate a candidate's solution to a case study, understanding that there are multiple valid approaches.

The evaluation should focus on the candidate's thought process, structure, analytical rigor, and business judgment rather than expecting one specific answer.

For this evaluation, use these guidelines:
1. Identify which approach the candidate seems to be taking (if any)
2. Evaluate against the criteria provided
3. Highlight strengths and areas for improvement
4. Identify key insights the candidate captured or missed
5. Suggest specific next steps for improvement

Important: There is no single "correct" answer. Strong candidates may take different valid approaches. 
Evaluate how well they executed their chosen approach and the quality of their reasoning.`;

  // Determine detail level
  let responseFormat = '';
  switch (detailLevel) {
    case 'basic':
      responseFormat = `Provide a concise evaluation with:
- Overall score (0-100)
- Identified approach
- 2-3 key strengths
- 2-3 key areas for improvement`;
      break;
    case 'detailed':
      responseFormat = `Provide a comprehensive evaluation with:
- Overall score (0-100)
- Identified approach
- Detailed scores for each evaluation criterion
- Comprehensive analysis of strengths (4-6 points)
- Detailed areas for improvement (4-6 points)
- List of missed key insights
- Alternative approaches that could have worked
- Specific suggestions for improvement
- Learning resources the candidate could use`;
      break;
    default: // standard
      responseFormat = `Provide a standard evaluation with:
- Overall score (0-100)
- Identified approach
- Scores for each evaluation criterion
- Key strengths (3-4 points)
- Areas for improvement (3-4 points)
- Missed key insights
- Suggested next steps`;
  }

  let caseInfo = '';
  if (caseData.title) {
    // We have the full case data
    caseInfo = `
Case Information:
- Title: ${caseData.title}
- Industry: ${caseData.industry}
- Type: ${caseData.caseType}
- Background: ${caseData.backgroundInfo}
- Challenge: ${caseData.challengeDescription}

Key Data Points:
${caseData.dataPoints?.map((dp: any) => `- ${dp.label}: ${dp.value}`).join('\n') || 'No specific data points provided'}

Key Insights That Should Be Identified:
${caseData.keyInsights?.map((insight: string) => `- ${insight}`).join('\n') || 'No specific insights defined'}

Valid Approaches to This Case:
${caseData.acceptableApproaches?.map((approach: any) => 
  `- ${approach.name}: ${approach.description}
   Key concepts: ${approach.keyConcepts.join(', ')}`
).join('\n') || 'No specific approaches defined'}

Evaluation Criteria:
${caseData.evaluationCriteria?.map((criterion: any) => 
  `- ${criterion.name} (${criterion.weight}%): ${criterion.description}
   Checkpoints: ${criterion.checkpoints.join(', ')}`
).join('\n') || 'No specific criteria defined'}`;
  } else {
    // We only have the case ID
    caseInfo = `Case ID: ${caseData.id}
Note: Limited case information available. Evaluation will be based on general case interview best practices.`;
  }

  // Construct the actual user input
  const userInput = `
${caseInfo}

The candidate's solution:
"""
${userSolution}
"""

Please evaluate this solution according to the criteria. ${responseFormat}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const evaluationText = data.choices[0].message.content;
    
    // Parse the evaluation text to extract structured information
    // This is a simplified version - production code would need more robust parsing
    const structuredEvaluation = parseEvaluation(evaluationText, detailLevel);

    return {
      rawEvaluation: evaluationText,
      structuredEvaluation
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

function parseEvaluation(evaluationText: string, detailLevel: string) {
  // This is a simplified parser - a production version would need more robust parsing
  // Extract overall score (assuming it's in format "Overall score: 85/100" or similar)
  const scoreMatch = evaluationText.match(/score:?\s*(\d+)/i);
  const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : null;
  
  // Extract identified approach
  const approachMatch = evaluationText.match(/approach:?\s*([^\n.]+)/i);
  const approach = approachMatch ? approachMatch[1].trim() : null;
  
  // Extract strengths (assuming they're in a bullet-point list after "Strengths" or "Key strengths")
  const strengthsSection = evaluationText.match(/strengths:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i);
  const strengths = strengthsSection 
    ? strengthsSection[1].split(/\n-|\n•|\n\d+\./).filter(Boolean).map(s => s.trim())
    : [];
  
  // Extract areas for improvement
  const improvementsSection = evaluationText.match(/improvements:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i) || 
                              evaluationText.match(/weaknesses:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i);
  const improvements = improvementsSection 
    ? improvementsSection[1].split(/\n-|\n•|\n\d+\./).filter(Boolean).map(s => s.trim())
    : [];
  
  // Extract missed insights
  const missedSection = evaluationText.match(/missed insights:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i) || 
                       evaluationText.match(/missed key insights:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i);
  const missedInsights = missedSection 
    ? missedSection[1].split(/\n-|\n•|\n\d+\./).filter(Boolean).map(s => s.trim())
    : [];
  
  // Extract suggested next steps
  const nextStepsSection = evaluationText.match(/next steps:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i) || 
                         evaluationText.match(/suggested next steps:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i);
  const nextSteps = nextStepsSection 
    ? nextStepsSection[1].split(/\n-|\n•|\n\d+\./).filter(Boolean).map(s => s.trim())
    : [];
  
  // For detailed level, extract more information
  let criteriaScores = {};
  let alternativeApproaches = [];
  
  if (detailLevel === 'standard' || detailLevel === 'detailed') {
    // Extract criteria scores - this is simplified and would need more robust parsing in production
    const criteriaSection = evaluationText.match(/criterion|criteria scores:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i);
    if (criteriaSection) {
      const criteriaLines = criteriaSection[1].split(/\n/).filter(Boolean);
      criteriaScores = criteriaLines.reduce((acc: any, line: string) => {
        const match = line.match(/([^:]+):\s*(\d+)/);
        if (match) {
          acc[match[1].trim()] = parseInt(match[2]);
        }
        return acc;
      }, {});
    }
    
    // Extract alternative approaches
    if (detailLevel === 'detailed') {
      const alternativesSection = evaluationText.match(/alternative approaches:?\s*([\s\S]*?)(?=\n\s*\n|\n\s*[A-Z]|$)/i);
      alternativeApproaches = alternativesSection 
        ? alternativesSection[1].split(/\n-|\n•|\n\d+\./).filter(Boolean).map(s => s.trim())
        : [];
    }
  }
  
  return {
    overallScore,
    approach,
    strengths,
    areasForImprovement: improvements,
    missedInsights,
    suggestedNextSteps: nextSteps,
    criteriaScores,
    alternativeApproaches
  };
}
