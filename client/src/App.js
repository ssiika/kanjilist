import './App.css';

fetch('/users')
.then(response => response.text())
.then(data => console.log({data}));

function App() {
  return (
    <div className="App">
      <h1>Working</h1>
    </div>
  );
}

export default App;
