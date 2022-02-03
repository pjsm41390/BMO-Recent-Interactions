import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { connect,RestApiError } from '@openfin/salesforce';

let salesforce;

function App() {
  let salesforceUrl = "https://bmo--devmvp.my.salesforce.com/";
  let consumerKey =
    "3MVG9PG9sFc71i9kqDhbn3Umurb1KYUbi8wANw8tbpo4fTpvgXsZfWYRzAD98eELqa5Bl3DcEGlc0eLK_RsuY";

  (async () => {
    // Connect to salesforce org at the provided url using the provided consumer key
    salesforce = await connect(salesforceUrl, consumerKey, true);
    
    const apiEndpoint = '/services/data/vXX.X/...'; // Relative REST API endpoint
    const httpMethod = 'GET'; // Defaults to GET
    const data = {}; // Optional, for POST and PATCH requests
    const headers = {}; // Optional

    try {
      const response = await salesforce.executeApiRequest<any>(apiEndpoint, httpMethod, data, headers);
      const responseData = response.data;
    } catch (err) {
      if (err instanceof RestApiError) {
        const status = err.restApiResponseStatus; // HTTP response status (e.g. 4xx/5xx)
        const errorCode = err.restApiErrorCode; // Salesforce REST API error code (if provided)
        const description = err.restApiErrorDescription; // Salesforce REST API error description (if provided)
      }
    }
  })();
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
