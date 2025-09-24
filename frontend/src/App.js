import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Faq from './pages/faq';
import Programs from './pages/Programs';
import Orientation from './components/Orientation';
import OrientationTest from './components/OrientationTest/OrientationTest';
import ProgramDetail from './pages/ProgramDetail';
import ApplicationForm from "./pages/ApplicationForm";
import StudentWelcomeDashboard from './components/WelcomeEtudiant';
import AdminWelcomeDashboard from './components/WelcomeAdmin';
import TermsOfService from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Results from './components/OrientationTest/Results';
import GoogleAuthCallback from './components/GoogleAuthCallback';

// Composant pour forcer le défilement vers le haut
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animation wrapper pour transition fluide
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// Routes avec animation
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="google-auth-callback" element={<PageTransition><GoogleAuthCallback /></PageTransition>} />
            <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><Faq /></PageTransition>} />
            <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
            <Route path="/orientation" element={<PageTransition><Orientation /></PageTransition>} />
            <Route path="/orientation/test" element={<PageTransition><OrientationTest /></PageTransition>} />
            <Route path="/program-detail/:programId" element={<PageTransition><ProgramDetail /></PageTransition>} />
            <Route path="/application/:programId" element={<PageTransition><ApplicationForm /></PageTransition>} />
            <Route path="/welcome-admin" element={<PageTransition><AdminWelcomeDashboard /></PageTransition>} />
            <Route path="/welcome-etudiant" element={<PageTransition><StudentWelcomeDashboard /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/results" element={<PageTransition><Results /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

// App principal
function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;