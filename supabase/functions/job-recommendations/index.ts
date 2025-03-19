
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

// Get API keys from environment variables
const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resumeData, preferences } = await req.json()
    
    // Log request for debugging
    console.log('Generating job recommendations with user data')
    
    // Primary model: Mixtral for fast classification of jobs
    // Generate recommendations using Mixtral (Mistral AI)
    let recommendations = null

    if (mistralApiKey) {
      try {
        console.log('Calling Mixtral API for job recommendations')
        
        // Create a prompt for Mixtral to classify jobs based on resume
        const mixtralPrompt = `
        Given the user's profile and preferences, recommend the most suitable jobs.
        
        User Profile:
        ${JSON.stringify(resumeData, null, 2)}
        
        Job Preferences:
        ${JSON.stringify(preferences, null, 2)}
        
        Please provide job recommendations in the following format:
        {
          "bestMatch": [list of best matching jobs with score and reason],
          "trending": [list of trending jobs in the user's field],
          "newOpportunities": [list of new job postings that match the user's skills]
        }
        `
        
        const mixtralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mistralApiKey}`
          },
          body: JSON.stringify({
            model: 'mistral-large-latest',
            messages: [
              { role: 'user', content: mixtralPrompt }
            ],
            temperature: 0.3,
            max_tokens: 1024
          })
        })
        
        if (mixtralResponse.ok) {
          const data = await mixtralResponse.json()
          try {
            // Extract and parse the JSON from the response
            const content = data.choices[0].message.content
            // Find JSON object in the content (handle cases where the AI might add extra text)
            const jsonMatch = content.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              recommendations = JSON.parse(jsonMatch[0])
              console.log('Successfully processed Mixtral recommendations')
            } else {
              throw new Error('No valid JSON found in Mixtral response')
            }
          } catch (parseError) {
            console.error('Error parsing Mixtral response:', parseError)
            // Continue to fallback
          }
        }
      } catch (mixtralError) {
        console.error('Error with Mixtral API:', mixtralError)
        // Will continue to GPT-4 fallback
      }
    }
    
    // Fallback to GPT-4 if Mixtral fails or isn't available
    if (!recommendations && openaiApiKey) {
      try {
        console.log('Falling back to GPT-4 for job recommendations')
        
        // Create a prompt for GPT-4 for deeper analysis
        const gpt4Prompt = `
        As an advanced career advisor, analyze this user's resume and preferences to provide detailed job recommendations.
        
        User Profile:
        ${JSON.stringify(resumeData, null, 2)}
        
        Job Preferences:
        ${JSON.stringify(preferences, null, 2)}
        
        Provide three categories of job recommendations:
        1. Best Match: Jobs that directly align with the user's experience and skills
        2. Trending: Jobs in growing fields related to the user's expertise
        3. New Opportunities: Recently posted positions that match the user's qualifications
        
        Format your response as a JSON object with these three categories. Include job title, company, score/growth rate, and reason for recommendation.
        `
        
        const gpt4Response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              { role: 'user', content: gpt4Prompt }
            ],
            temperature: 0.2,
            max_tokens: 1500
          })
        })
        
        if (gpt4Response.ok) {
          const data = await gpt4Response.json()
          try {
            // Extract and parse the JSON from the response
            const content = data.choices[0].message.content
            // Find JSON object in the content
            const jsonMatch = content.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              recommendations = JSON.parse(jsonMatch[0])
              console.log('Successfully processed GPT-4 recommendations')
            } else {
              throw new Error('No valid JSON found in GPT-4 response')
            }
          } catch (parseError) {
            console.error('Error parsing GPT-4 response:', parseError)
          }
        }
      } catch (gpt4Error) {
        console.error('Error with GPT-4 API:', gpt4Error)
      }
    }
    
    // If both APIs fail or aren't available, use fallback mockup data
    if (!recommendations) {
      console.log('Using fallback mock recommendations data')
      recommendations = {
        bestMatch: [
          {
            id: 'rec-1',
            title: 'Senior Frontend Developer',
            company: 'TechMatch Inc.',
            score: 0.95,
            reason: 'Your React and TypeScript skills directly match this position'
          },
          {
            id: 'rec-2',
            title: 'UI/UX Engineer',
            company: 'DesignSystems Co.',
            score: 0.87,
            reason: 'Your portfolio shows strong design sensibility'
          }
        ],
        trending: [
          {
            id: 'trend-1',
            title: 'Full Stack Developer',
            company: 'StartupRise',
            growthRate: '43% more openings this month'
          }
        ],
        newOpportunities: [
          {
            id: 'new-1',
            title: 'Remote React Developer',
            company: 'GlobalTech',
            posted: 'Just now'
          }
        ]
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      recommendations
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
