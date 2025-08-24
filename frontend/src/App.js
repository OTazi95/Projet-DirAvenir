import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Chine from './pages/Chine';
import Roumanie from './pages/Roumanie';
import Chypre from './pages/Chypre';
import PartnerFinal from './pages/PartnerFinal';
import PartnerCyprus from './pages/PartnerCyprus';
import PartnerBAU from './pages/PartnerBAU';
import AboutUs from './pages/AboutUs';
import Faq from './pages/faq';
import Programs from './pages/Programs';
import Orientation from './components/Orientation';
import OrientationTest from './components/OrientationTest';
import ProgramDetail from './pages/ProgramDetail'; 
import ApplicationForm from "./pages/ApplicationForm";



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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/destination/chine" element={<PageTransition><Chine /></PageTransition>} />
          <Route path="/destination/roumanie" element={<PageTransition><Roumanie /></PageTransition>} />
          <Route path="/destination/chypre" element={<PageTransition><Chypre /></PageTransition>} />
          <Route path="/partner/final" element={<PageTransition><PartnerFinal /></PageTransition>} />
          <Route path="/partner/cyprus" element={<PageTransition><PartnerCyprus /></PageTransition>} />
          <Route path="/partner/bau" element={<PageTransition><PartnerBAU /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><Faq /></PageTransition>} />
          <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
          <Route path="/orientation" element={<PageTransition><Orientation /></PageTransition>} />
          <Route path="/orientation/test" element={<PageTransition><OrientationTest /></PageTransition>} />
          <Route path="/program-detail/:programId" element={<PageTransition><ProgramDetail /></PageTransition>} />
          <Route path="/application/:programId" element={<PageTransition><ApplicationForm /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
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
