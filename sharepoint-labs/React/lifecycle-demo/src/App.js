import logo from './logo.svg';
import './App.css';
import MountingExample from './components/MountingExample';
import UpdatingExample from './components/UpdatingExample';
import UnMountingExample from './components/UnMountingExample';

function App() {
  return (
    <div className="App">
     <MountingExample />
     <UpdatingExample />
     <UnMountingExample />
    </div>
  );
}

export default App;
