
/**
 * Helper functions for generating random data for jobs
 */

export function getRandomCategory() {
  const categories = [
    "Full-time", "Part-time", "Freelance/Contract", "Remote", "Hybrid",
    "Internships (Paid)", "Internships (Unpaid)", "Internships (Virtual)"
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

export function getRandomExperienceLevel() {
  const levels = ["Entry-Level", "Mid-Level", "Senior-Level", "Executive/C-Level"];
  return levels[Math.floor(Math.random() * levels.length)];
}

export function getRandomIndustry() {
  const industries = [
    "Software & IT", "Finance & Accounting", "Marketing & Sales", 
    "Operations & Logistics", "HR & Talent Acquisition", "Consulting & Strategy", 
    "Creative & Design", "Legal & Compliance", "Healthcare & Biotech", 
    "Data Science & Analytics", "Education & Research"
  ];
  return industries[Math.floor(Math.random() * industries.length)];
}

export function getRandomName() {
  const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Jamie", "Sam", "Riley"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

export function getRandomLinkedInUsername() {
  const usernames = ["alex-tech", "jordan-dev", "taylor-engineer", "morgan-coder", "casey-pm", "jamie-hr", "sam-design", "riley-data"];
  return usernames[Math.floor(Math.random() * usernames.length)];
}

export function getRandomTwitterUsername() {
  const usernames = ["alextech", "jordandev", "tayloreng", "morgancoder", "caseypm", "jamiehr", "samdesign", "rileydata"];
  return usernames[Math.floor(Math.random() * usernames.length)];
}

export function getRandomEmail() {
  const domains = ["company.com", "tech.co", "startup.io", "enterprise.net", "hrteam.org"];
  const names = ["hiring", "recruiting", "jobs", "careers", "hr", "talent"];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
}

export function getRandomResponsibilities() {
  const responsibilities = [
    "Lead development of new features for our flagship product",
    "Collaborate with cross-functional teams to define product requirements",
    "Optimize application performance and scalability",
    "Implement robust testing strategies to ensure product quality",
    "Mentor junior developers and provide technical guidance",
    "Design and implement APIs for internal and external consumption",
    "Participate in code reviews and ensure code quality standards",
    "Research and propose new technologies to improve our stack"
  ];
  
  // Return 3-5 random responsibilities
  const count = Math.floor(Math.random() * 3) + 3;
  const shuffled = [...responsibilities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
