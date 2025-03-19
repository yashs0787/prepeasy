
import { parseOpenAIFeedback } from "../utils/parsers.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateOpenAIFeedback(systemPrompt: string, transcript: string, question: string) {
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

  const data = await response.json();
  
  // Extract the feedback
  const rawFeedback = data.choices[0].message.content;
  
  // Parse the raw feedback
  const structuredFeedback = parseOpenAIFeedback(rawFeedback);

  return {
    structuredFeedback,
    rawFeedback
  };
}
