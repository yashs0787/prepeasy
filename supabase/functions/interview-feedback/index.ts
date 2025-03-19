
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY');
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      transcript, 
      question, 
      careerTrack, 
      interviewType, 
      model = 'Claude 3 Sonnet', 
      isFallback = false,
      previousAttempts = 0
    } = await req.json();
    
    if (!transcript || !question) {
      throw new Error('Missing required parameters: transcript and question are required');
    }

    // Smart model selection logic (only applied when model isn't explicitly specified)
    let selectedModel = model;
    let reasonForSelection = "User-specified model";

    if (!isFallback && previousAttempts === 0 && !model) {
      // Logic for automatic model selection
      const isComplexQuestion = isComplex(question, transcript);
      const needsDetailedExplanation = needsDetails(transcript);
      
      // Case interview questions typically need structured reasoning - use Claude
      if (careerTrack === 'consulting' && interviewType === 'case' && !needsDetailedExplanation) {
        selectedModel = 'Claude 3 Sonnet';
        reasonForSelection = "Consulting case interview requiring structured reasoning";
      } 
      // For detailed explanations or when user is struggling, use GPT-4 Turbo
      else if (needsDetailedExplanation || isComplexQuestion) {
        selectedModel = 'GPT-4 Turbo';
        reasonForSelection = "Complex question requiring detailed explanation";
      }
      // Default to Claude for most responses (more cost effective)
      else {
        selectedModel = 'Claude 3 Sonnet';
        reasonForSelection = "Standard question suited for structured response";
      }
      
      console.log(`Smart model selection chose: ${selectedModel} - Reason: ${reasonForSelection}`);
    }

    // Create system prompt based on career track and interview type
    let systemPrompt = `You are an expert interview coach specializing in ${careerTrack || 'general'} careers`;
    if (interviewType) {
      systemPrompt += ` and ${interviewType} interviews`;
    }
    systemPrompt += `. Analyze the candidate's answer to the following interview question and provide detailed, constructive feedback.`;

    // Add case-specific instructions for consulting case interviews
    if (careerTrack === 'consulting' && interviewType === 'case') {
      systemPrompt += ` For case interviews, evaluate the structure, logical reasoning, quantitative analysis, and recommendations. Pay special attention to framework application and problem-solving approach.`;
    }

    // Format the content for the selected model
    const content = `
${systemPrompt}

The question asked was: "${question}"

The candidate's response was: "${transcript}"

Please provide a comprehensive analysis with the following structure:
1. Overall assessment (score out of 100)
2. Key strengths (3-5 bullet points)
3. Areas for improvement (3-5 bullet points)
4. Example of a stronger response
5. Score breakdown by category (content relevance, structure, specificity, professionalism)
6. Suggested learning resources
7. Next steps for improvement
`;

    let data;
    
    // Use the selected model
    if (selectedModel === 'Claude 3 Sonnet') {
      // Call Claude API
      if (!CLAUDE_API_KEY) {
        throw new Error('CLAUDE_API_KEY environment variable is not set');
      }
      
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: content
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Claude API error:", errorData);
        throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
      }

      data = await response.json();
      
      // Extract and structure the feedback
      const rawFeedback = data.content[0].text;
      
      // Parse the raw feedback into structured feedback
      const structuredFeedback = parseClaudeFeedback(rawFeedback);

      return new Response(JSON.stringify({
        success: true,
        feedback: structuredFeedback,
        rawFeedback,
        modelUsed: 'Claude 3 Sonnet',
        reasonForSelection
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
      
    } else if (selectedModel === 'GPT-4 Turbo') {
      // Call OpenAI API
      if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
      }
      
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `The question asked was: "${question}"

The candidate's response was: "${transcript}"

Please provide a comprehensive analysis with the following structure:
1. Overall assessment (score out of 100)
2. Key strengths (3-5 bullet points)
3. Areas for improvement (3-5 bullet points)
4. Example of a stronger response
5. Score breakdown by category (content relevance, structure, specificity, professionalism)
6. Suggested learning resources
7. Next steps for improvement`
            }
          ],
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API error:", errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      data = await response.json();
      
      // Extract the feedback
      const rawFeedback = data.choices[0].message.content;
      
      // Parse the raw feedback
      const structuredFeedback = parseOpenAIFeedback(rawFeedback);

      return new Response(JSON.stringify({
        success: true,
        feedback: structuredFeedback,
        rawFeedback,
        modelUsed: 'GPT-4 Turbo',
        reasonForSelection
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error(`Unsupported model: ${selectedModel}`);
    }
  } catch (error) {
    console.error('Error in interview-feedback function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to check if the question/answer suggests a complex topic
function isComplex(question: string, answer: string): boolean {
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
function needsDetails(answer: string): boolean {
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

// Helper function to parse Claude's feedback into a structured format
function parseClaudeFeedback(text) {
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
function parseOpenAIFeedback(text) {
  // Reuse the same parsing logic as Claude for consistency
  return parseClaudeFeedback(text);
}
