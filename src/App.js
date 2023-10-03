import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes';
import Navbar from './components/Navbar';
import Hero from './components/HeroSection/index';
import Skills from './components/Skills/index';
import { BrowserRouter as Router } from 'react-router-dom';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education2 from './components/Education/index';
import Footer from './components/Footer';
import ProjectDetails from './components/ProjectDetails';
import { useState,useEffect } from 'react';
import Contact from './components/Contact';
import { MdDarkMode } from 'react-icons/md';
import {HiOutlineLightBulb} from 'react-icons/hi'
const Body = styled.div `background-color: ${({ theme }) => theme.bg}; width: 100%; overflow-x: hidden; height:100%`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);`

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [darkMode, setDarkMode] = useState(true);

   // Toggle dark mode
   const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Router>
     <Navbar/>
     <Body>
     <Hero />
     <Wrapper>
      <Skills />
      <Experience />
     </Wrapper>
     <Projects openModal={openModal} setOpenModal={setOpenModal}/>
     <Wrapper>
      <Education2 />
      <Contact />
     </Wrapper>
     <Footer  />
     {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
          <button onClick={toggleDarkMode}
          style={{
          backgroundColor: darkMode ? '#191919' : '#F9F0F0',
          padding: '12px 20px', 
          borderRadius: '45px', 
          display: 'flex', 
          alignItems: 'center',
          color:'white' ,
          position: 'relative', 
     top: '10%', 
    left: '50%', 
     transform: 'translate(-50%, -50%)', 
    zIndex: 999,
        }}>
        {darkMode ? <HiOutlineLightBulb /> : <MdDarkMode style={{color:'black'}} />}
      </button>
     </Body>
     </Router>
    </ThemeProvider>
  );
}

export default App;
