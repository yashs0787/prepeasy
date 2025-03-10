
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

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
    const { section, data } = await req.json()
    
    // Log the request for debugging
    console.log(`Optimizing resume section: ${section}`)
    
    // Format the data depending on the section
    let prompt = ''
    
    if (section === 'all') {
      prompt = `Improve this resume content to make it more impactful and professional:
      
      ${JSON.stringify(data, null, 2)}
      
      Please enhance the language, highlight achievements, and make it more compelling to potential employers. Return the optimized content in JSON format that matches the structure of the original data.`
    } else if (section === 'personalInfo') {
      prompt = `Improve this professional summary to make it more impactful:
      
      "${data.summary}"
      
      Please enhance the language, highlight key strengths, and make it more compelling to potential employers. Keep it concise (3-4 sentences). Return only the optimized summary text.`
    } else {
      // Handle other specific sections like experience, education, etc.
      prompt = `Improve this ${section} section of a resume:
      
      ${JSON.stringify(data, null, 2)}
      
      Please enhance the language, highlight achievements, and make it more compelling to potential employers. Return the optimized content in JSON format that matches the structure of the original data.`
    }

    // Call Claude API through Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    const result = await response.json()
    
    // For demonstration, we'll process the result differently based on section
    // In a real implementation, we would parse the JSON from Claude's response
    let optimized
    
    if (section === 'personalInfo') {
      // For personal summary, just return the text directly
      optimized = result.content[0].text
    } else {
      // For other sections, we would parse the JSON from Claude's response
      // This is a simplified example
      optimized = {
        summary: result.content[0].text
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
