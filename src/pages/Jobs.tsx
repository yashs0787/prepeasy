
import { useJobs } from "@/hooks/useJobs";
import { JobsLayout } from "@/components/jobs/JobsLayout";

export default function Jobs() {
  const { 
    jobs, 
    isLoading, 
    error, 
    query, 
    setQuery, 
    filters, 
    setFilters,
    selectedJobId,
    setSelectedJobId,
    toggleSaveJob,
    selectedJob
  } = useJobs({
    initialFilters: {
      categories: []
    }
  });

  return (
    <JobsLayout
      jobs={jobs}
      isLoading={isLoading}
      error={error}
      query={query}
      setQuery={setQuery}
      filters={filters}
      setFilters={setFilters}
      selectedJobId={selectedJobId}
      setSelectedJobId={setSelectedJobId}
      toggleSaveJob={toggleSaveJob}
      selectedJob={selectedJob}
    />
  );
}
