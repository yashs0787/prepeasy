
import { corsHeaders } from "../interview-feedback/utils/cors.ts";
import { generateCaseEvaluation } from "./services/evaluationService.ts";

export async function handleRequest(req: Request) {
  const { 
    caseStudyId,
    userSolution,
    caseStudyData, // Optional: The client can send the full case study data to avoid DB lookup
    detailLevel = "standard" // basic, standard, detailed
  } = await req.json();
  
  if (!userSolution) {
    throw new Error('Missing required parameter: userSolution');
  }
  
  if (!caseStudyId && !caseStudyData) {
    throw new Error('Either caseStudyId or caseStudyData must be provided');
  }

  try {
    // Generate the evaluation
    const evaluationResult = await generateCaseEvaluation({
      caseStudyId,
      caseStudyData,
      userSolution,
      detailLevel
    });
    
    return new Response(JSON.stringify({
      success: true,
      evaluation: evaluationResult
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating case evaluation:', error);
    throw error;
  }
}
