
import { generateOpenAIEvaluation } from "./openai.ts";

interface EvaluationParams {
  caseStudyId?: string;
  caseStudyData?: any;
  userSolution: string;
  detailLevel: "basic" | "standard" | "detailed";
}

export async function generateCaseEvaluation(params: EvaluationParams) {
  const { caseStudyId, caseStudyData, userSolution, detailLevel } = params;
  
  // If we don't have the case study data directly, we would need to fetch it
  // from a database using caseStudyId - not implemented here
  if (!caseStudyData && !caseStudyId) {
    throw new Error('Either case study data or ID must be provided');
  }
  
  const caseData = caseStudyData || { id: caseStudyId };
  
  // Generate the evaluation using OpenAI
  const result = await generateOpenAIEvaluation(caseData, userSolution, detailLevel);
  
  return result;
}
