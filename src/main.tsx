import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Sidebar from './components/Sidebar.tsx';
import FloatingMenu from './components/FloatingMenu.tsx';
import Profile from './components/Profile.tsx';
import { Scene } from 'three';
import ToggleAside from './components/experience/ToggleAside.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-h-screen  md:flex md:justify-center md:items-start md:gap-10'>
      <Sidebar />
      <FloatingMenu/>
      {/* <Profile/> */}
      <ToggleAside/>
      <App />
    </div>
  </StrictMode>,
);
