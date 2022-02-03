import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from '@openfin/salesforce';


function App() {
  
const salesforceOrgUrl = 'https://devorg.my.salesforce.com';
const consumerKey = 'ThisIsNotARealKeyJjdw1J9LLJbP_pqwoJYyuisjQhr_LLurNDv7AgQvDTZwCoZuDZrXcPCmBv4o.8ds.5gF';
const isSandbox = false;

const salesforce = await connect(salesforceOrgUrl, consumerKey, isSandbox);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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

export default App;
