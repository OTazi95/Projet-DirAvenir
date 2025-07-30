import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/destination/chine" element={<Chine />} />
          <Route path="/destination/roumanie" element={<Roumanie />} />
          <Route path="/destination/chypre" element={<Chypre />} />
          <Route path="/partner/final" element={<PartnerFinal />} />
          <Route path="/partner/cyprus" element={<PartnerCyprus />} />
          <Route path="/partner/bau" element={<PartnerBAU />} />
          <Route path="/about" element={<AboutUs />} />        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
