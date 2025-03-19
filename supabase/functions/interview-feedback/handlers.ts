
import { corsHeaders } from "./utils/cors.ts";
import { generateClaudeFeedback } from "./services/claude.ts";
import { generateOpenAIFeedback } from "./services/openai.ts";
import { isComplex, needsDetails } from "./utils/complexity.ts";

export async function handleRequest(req: Request) {
  const { 
    transcript, 
    question, 
    careerTrack, 
    interviewType, 
    model = 'Claude 3 Sonnet', 
    isFallback = false,
    previousAttempts = 0,
    isChat = false
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

  // Format the content
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

  try {
    // Use the selected model
    if (selectedModel === 'Claude 3 Sonnet') {
      // Call Claude API
      const result = await generateClaudeFeedback(content);
      
      return new Response(JSON.stringify({
        success: true,
        feedback: result.structuredFeedback,
        rawFeedback: result.rawFeedback,
        modelUsed: 'Claude 3 Sonnet',
        reasonForSelection
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (selectedModel === 'GPT-4 Turbo') {
      // Call OpenAI API
      const result = await generateOpenAIFeedback(systemPrompt, transcript, question);
      
      return new Response(JSON.stringify({
        success: true,
        feedback: result.structuredFeedback,
        rawFeedback: result.rawFeedback,
        modelUsed: 'GPT-4 Turbo',
        reasonForSelection
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error(`Unsupported model: ${selectedModel}`);
    }
  } catch (error) {
    console.error(`Error with ${selectedModel}:`, error);
    
    // If this wasn't already a fallback attempt and we were using Claude, try GPT-4
    if (!isFallback && selectedModel === 'Claude 3 Sonnet') {
      console.log('Attempting fallback to GPT-4 Turbo...');
      
      try {
        const result = await generateOpenAIFeedback(systemPrompt, transcript, question);
        
        return new Response(JSON.stringify({
          success: true,
          feedback: result.structuredFeedback,
          rawFeedback: result.rawFeedback,
          modelUsed: 'GPT-4 Turbo',
          reasonForSelection: "Fallback after Claude error"
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (fallbackError) {
        console.error('Error with fallback model:', fallbackError);
        throw new Error('Failed to generate feedback with both primary and fallback models');
      }
    }
    
    // If we're already in fallback mode or using a different model, just propagate the error
    throw error;
  }
}
