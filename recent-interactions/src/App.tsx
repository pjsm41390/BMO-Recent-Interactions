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
                "<h2 class='is-size-5'>" + response?.data?.records[i]?.T1C_AEM__AEM_Event_Name__c +"</h2>" +
                "<h3>" + "Category: " +response?.data?.records[i]?.Category__c +"</h3>" +
                "<h3>" + "Meeting Type: " + response?.data?.records[i]?.T1C_AEM__Type__c +"</h3>" +
                "<h3>" + "Booking Type: " + response?.data?.records[i]?.T1C_AEM__Booking_Type__c +"</h3>" +
              "<hr/>" +
              '</td></tr>'
          }
    })();
  }

  // @ts-ignore: Unreachable code error
  fin.me.interop.addContextHandler(handleIncomingContext);
  
  return (
   <div className="container"><br/>
    <h1 className='is-fullwidth is-size-4 has-text-centered'>Events</h1>
      <table className="is-flex is-justify-content-center table has-text-centered is-full-width" id="tracklist" />      
    </div>
  );
}

export default App;

