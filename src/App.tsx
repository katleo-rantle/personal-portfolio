import './App.css';
import Portfolio from './components/dash/Portfolio';
import Sidebar from './components/Sidebar';
import { Button } from './components/ui/button';

function App() {

  return (
    <>
      <h1 className='text-3xl font-bold text-amber-600'>Hello world!</h1>
      <Button>Click me!</Button>

      <Sidebar />
      {/* <CinematicLoader onComplete={() => console.log('Loader complete! Show main content here.')} /> */}
      {/* <Loader onComplete={() => console.log('Loader complete! Show main content here.')} /> */}
      {/* <TechLoader
        onComplete={() =>
          console.log('Loader complete! Show main content here.')
        }
      /> */}
      {/* <Portfolio /> */}

      {/* <Cockpit><Starfield/></Cockpit> */}
    </>
  );
}

export default App;
