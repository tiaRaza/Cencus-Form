import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Form from './component/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo1.png" alt="Dio Ang Logo"/>
        <h1 className='display-3'> Anglican Diocese of Mauritius</h1>
        <h2 className='display-6'>Census Form</h2>
      </header>
      <Form />
    </div>
  );
}

export default App;
