// @ts-ignore
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect, RestApiError } from "@openfin/salesforce";

function App() {
  const [Contacts, setContacts] = useState();
  // @ts-ignore: Unreachable code error
  function handleIncomingContext(contextInfo) {
    const { type, id } = contextInfo;
    switch (type) {
      case "ClientID":
        console.log(contextInfo);
        handleContext(contextInfo);
        break;

      default:
        break;
    }
  }

  // @ts-ignore: Unreachable code error
  function handleContext(contextInfo) {
    (async () => {
      const { type, id } = contextInfo;
        let salesforceUrl = "https://bmo--devmvp.my.salesforce.com/";

        let consumerKey =
    "3MVG9PG9sFc71i9kqDhbn3Umurb1KYUbi8wANw8tbpo4fTpvgXsZfWYRzAD98eELqa5Bl3DcEGlc0eLK_RsuY";
          let salesforce = await connect(salesforceUrl, consumerKey, true);

          const apiEndpoint =
            `/services/data/vXX.X/query/?q=SELECT+FIELDS(ALL)+from+T1C_AEM__Aem_Event__c+where+T1C_AEM__Single_Client__c+=+'${id.value}'+LIMIT+200`;

          const httpMethod = "GET"; // Defaults to GET
          const data = {}; // Optional, for POST and PATCH requests
          const headers = {}; // Optional

          const response = await salesforce.executeApiRequest<any>(
            apiEndpoint,
            httpMethod,
            data,
            headers
          );
          var tracklistTable = document.getElementById("tracklist");
          // @ts-ignore: Unreachable code error
          tracklistTable.innerHTML = "";
          for (let i = 0; i < response.data.records.length; i++) {
              // @ts-ignore: Unreachable code error
            tracklistTable.innerHTML += '<tr><td>' +
                "<h2 className='title is-size-1'>" + response.data.records[i].Full_Name__c +"</h2>" +
                "<label className='title is-size-1'>" + response.data.records[i].Title +"</label>" +
                "<br/>" +
                "<label className='title is-size-1'>" + response.data.records[i].Phone +"</label>" +
                "<br/>" +
                "<label className='title is-size-1'>" + response.data.records[i].Main_Street__c +"</label>" +
                 "<br/>" +
                "<label className='title is-size-1'>" + response.data.records[i].Main_City__c + ", " +"</label>"  +
                "<label className='title is-size-1'>" + response.data.records[i].Main_Country__c +"</label>"  +
              "<hr/>" +
              '</td></tr>'
          }
    })();
  }

  // @ts-ignore: Unreachable code error
  fin.me.interop.addContextHandler(handleIncomingContext);
  
  return (
   <div className="App">
    <h1 className='title is-size-1'>Top Contacts</h1>
      <table id="tracklist" />      
    </div>
  );
}

export default App;

