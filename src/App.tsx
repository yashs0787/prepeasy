
import { Toaster } from 'sonner';
import {
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
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Export the useAuth hook from contexts/AuthContext
export { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-categories" element={<JobCategories />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/jarvis" element={
            <ProtectedRoute>
              <JarvisPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
