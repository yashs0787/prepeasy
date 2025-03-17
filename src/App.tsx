import { Toaster } from 'sonner';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobCategories from "./pages/JobCategories";
import ResumeBuilder from "./pages/ResumeBuilder";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import JarvisPage from './pages/JarvisPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job-categories" element={<JobCategories />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jarvis" element={<JarvisPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
