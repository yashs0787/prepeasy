
import { CareerTrack, InterviewType, LearningResource } from '../types/interviewTypes';
import { getLearningResources, learningPaths } from './learningPathData';

/**
 * Helper functions to manage interview learning resources
 */

/**
 * Add a new learning resource to a specific career track and interview type
 * This can be used to programmatically add resources
 */
export const addLearningResource = (
  resource: LearningResource,
  careerTrack: CareerTrack,
  interviewType: InterviewType
): boolean => {
  try {
    // Get the existing resources for this track and type
    const existingResources = getLearningResources(careerTrack, interviewType);
    
    // Check if the resource already exists (by title)
    const exists = existingResources.some(r => r.title === resource.title);
    if (exists) {
      console.warn(`Resource "${resource.title}" already exists for ${careerTrack}/${interviewType}`);
      return false;
    }
    
    // Add the resource to the array
    existingResources.push(resource);
    
    // Also update any matching learning paths
    const matchingPaths = learningPaths.filter(
      path => path.careerTrack === careerTrack && path.type === interviewType
    );
    
    for (const path of matchingPaths) {
      path.resources.push(resource);
    }
    
    return true;
  } catch (error) {
    console.error("Error adding learning resource:", error);
    return false;
  }
};

/**
 * Create and add a batch of resources at once
 */
export const addLearningResources = (
  resources: LearningResource[],
  careerTrack: CareerTrack,
  interviewType: InterviewType
): number => {
  let addedCount = 0;
  
  for (const resource of resources) {
    if (addLearningResource(resource, careerTrack, interviewType)) {
      addedCount++;
    }
  }
  
  return addedCount;
};

/**
 * Example function to show how to add a resource
 */
export const addExampleResource = () => {
  const newResource: LearningResource = {
    title: "Framework for Market Sizing Questions",
    type: "article",
    description: "Learn a step-by-step approach to solving market sizing questions in consulting interviews",
    url: "https://example.com/market-sizing",
    difficulty: "intermediate",
    duration: "15 min read"
  };
  
  return addLearningResource(newResource, 'consulting', 'case');
};
