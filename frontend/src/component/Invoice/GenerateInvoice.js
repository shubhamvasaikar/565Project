import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import GenerateInvoiceForm from './GenerateInvoiceForm'

// Component that displays from to generate a new invoice.
const GenerateInvoice = () => {
  return ( <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Generate New Invoice</h2>
      <GenerateInvoiceForm />
    </div>
    </Provider>
  );
}

  export default GenerateInvoice;