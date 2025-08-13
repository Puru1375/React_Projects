
import './App.css';
import {Home} from './pages/Home';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className='App-title'>Online Clipboard</h1>
          <h1 className='App-subtitle'>Welcome to Online Clipboard</h1>
        </header>
        <main>
          <Home />
        </main>
        <footer className="App-footer">
          <p>&copy; 2025 Online Clipboard</p>
        </footer>
      </div>
    </>
  );
}

export default App;
