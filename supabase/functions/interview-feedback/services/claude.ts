
import { parseClaudeFeedback } from "../utils/parsers.ts";

const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY');
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function generateClaudeFeedback(content: string) {
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

  const data = await response.json();
  
  // Extract and structure the feedback
  const rawFeedback = data.content[0].text;
  
  // Parse the raw feedback into structured feedback
  const structuredFeedback = parseClaudeFeedback(rawFeedback);

  return {
    structuredFeedback,
    rawFeedback
  };
}
