import './App.css';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Scene from './components/experience/ToggleAside';


function App() {

  return (
    <>
      {/* <h1 className='text-3xl font-bold text-amber-600'>Hello world!</h1> */}
      {/* <Button>Click me!</Button> */}

      
      {/* <CinematicLoader onComplete={() => console.log('Loader complete! Show main content here.')} /> */}
      {/* <Loader onComplete={() => console.log('Loader complete! Show main content here.')} /> */}
      {/* <TechLoader
        onComplete={() =>
          console.log('Loader complete! Show main content here.')
        }
      /> */}
      {/* <Portfolio /> */}

      {/* <Cockpit><Starfield/></Cockpit> */}

      <main className="flex flex-col container mx-auto p-10 max-w-4xl lg:pr-10 lg:pl-0 lg:max-w-6xl">
        <Hero/>
        <Stats/>
        {/* <Scene/> */}
      </main>
    </>
  );
}

export default App;
