import './App.css';
import Sidebar from './components/Sidebar';
import { Button } from './components/ui/button';

function App() {

  return (
    <>
      <h1 className='text-3xl font-bold text-amber-600'>Hello world!</h1>
      <Button>Click me!</Button>
      <Sidebar />
    </>
  );
}

export default App;
