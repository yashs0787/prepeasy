import { NavLink } from "react-router-dom";

const linkClasses =
  "text-sm font-medium transition-colors hover:text-foreground/80";

export function NavLinks() {
  return (
    <div className="flex gap-6">
      <NavLink to="/jobs" className={linkClasses}>
        Find Jobs
      </NavLink>
      <NavLink to="/resume-builder" className={linkClasses}>
        Resume Builder
      </NavLink>
      <NavLink to="/jarvis" className={linkClasses}>
        <div className="flex items-center gap-1">
          Jarvis
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium ml-1">AI</span>
        </div>
      </NavLink>
    </div>
  );
}
