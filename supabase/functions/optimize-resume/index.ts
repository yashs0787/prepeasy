
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to determine if we should use the backup model
function shouldUseBackupModel(section: string) {
  // Use backup model (Claude) for quick iterations on smaller sections
  const quickIterationSections = ['skills', 'projects'];
  return quickIterationSections.includes(section);
}

// Generate resume content with OpenAI (GPT-4 Turbo)
async function generateWithOpenAI(prompt: string) {
  console.log("Using OpenAI GPT-4 Turbo for optimization");
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI error: ${error.error?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`Failed to generate with OpenAI: ${error.message}`);
  }
}

// Generate resume content with Anthropic (Claude 3 Haiku)
async function generateWithClaude(prompt: string) {
  console.log("Using Claude 3 Haiku for optimization");
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.content[0].text;
  } catch (error) {
    console.error("Claude API error:", error);
    throw new Error(`Failed to generate with Claude: ${error.message}`);
  }
}

// Generate text with fallback
async function generateWithFallback(prompt: string, useBackupModel: boolean) {
  try {
    // Try primary or backup model first based on the section type
    if (useBackupModel && anthropicApiKey) {
      return await generateWithClaude(prompt);
    } else if (openaiApiKey) {
      return await generateWithOpenAI(prompt);
    } else if (anthropicApiKey) {
      return await generateWithClaude(prompt);
    } else {
      throw new Error("No API keys configured for text generation");
    }
  } catch (error) {
    console.error("Primary model failed:", error);
    
    // Try fallback if primary fails
    if (useBackupModel && openaiApiKey) {
      console.log("Falling back to OpenAI");
      return await generateWithOpenAI(prompt);
    } else if (!useBackupModel && anthropicApiKey) {
      console.log("Falling back to Claude");
      return await generateWithClaude(prompt);
    }
    
    // If fallback also fails or isn't available, rethrow the error
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { section, data, jobDescription } = await req.json()
    
    // Log the request for debugging
    console.log(`Optimizing ${section}${jobDescription ? ' with job description' : ''}`)
    
    // Format the prompt depending on the section and whether we have a job description
    let prompt = ''
    
    if (section === 'coverLetter') {
      prompt = `Create a professional cover letter for the following job description:
      
      ${jobDescription}
      
      Using the following resume information:
      ${JSON.stringify(data, null, 2)}
      
      Make it personalized, highlighting relevant experience and skills that match the job requirements. Keep it concise (3-4 paragraphs). Return only the cover letter text.`
    } else if (section === 'all') {
      prompt = `Improve this resume content to make it more impactful, professional, and ATS-friendly:
      
      ${JSON.stringify(data, null, 2)}
      
      ${jobDescription ? `Tailor it for this job description: ${jobDescription}` : ''}
      
      Please enhance the language, highlight achievements with quantifiable results, and make it more compelling to potential employers. Return the optimized content in JSON format that matches the structure of the original data.`
    } else if (section === 'personalInfo') {
      prompt = `Improve this professional summary to make it more impactful and ATS-friendly:
      
      "${data.summary}"
      
      ${jobDescription ? `Tailor it for this job description: ${jobDescription}` : ''}
      
      Please enhance the language, highlight key strengths, and make it more compelling to potential employers. Keep it concise (3-4 sentences). Return only the optimized summary text.`
    } else {
      // Handle other specific sections like experience, education, etc.
      prompt = `Improve this ${section} section of a resume to make it more impactful and ATS-friendly:
      
      ${JSON.stringify(data, null, 2)}
      
      ${jobDescription ? `Tailor it for this job description: ${jobDescription}` : ''}
      
      Please enhance the language, highlight achievements with quantifiable results when possible, and make it more compelling to potential employers. Return the optimized content in JSON format that matches the structure of the original data.`
    }

    // Determine which model to use
    const useBackupModel = shouldUseBackupModel(section);
    
    // Generate the optimized content with fallback
    const optimizedText = await generateWithFallback(prompt, useBackupModel);
    
    // Process the result depending on section
    let optimized;
    
    if (section === 'personalInfo' || section === 'coverLetter') {
      // For personal summary or cover letter, just return the text directly
      optimized = optimizedText;
    } else {
      try {
        // Try to parse as JSON first
        optimized = JSON.parse(optimizedText);
      } catch (error) {
        // If parsing fails, return as text
        console.log("Could not parse as JSON, returning as text");
        optimized = { text: optimizedText };
      }
    }

    return new Response(JSON.stringify({ 
      optimized,
      section
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
