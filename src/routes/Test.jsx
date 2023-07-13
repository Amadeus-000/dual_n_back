import logo from '../logo.svg';
import '../App.css';
import MenuAppBar from '../components/MenuAppBar';
import { useState } from 'react';
import axios from 'axios';

function Test() {
  const [helloWorld, setHelloWorld] = useState("");
  axios.get("https://us-central1-test1-7f2c4.cloudfunctions.net/helloWorld")
  .then((res) => {
    setHelloWorld(res.data);
  })
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload....
        </p>
        <p>{helloWorld}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Test;
