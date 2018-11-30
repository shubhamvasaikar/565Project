import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import showResults from "./showResults";
import AddClientForm from "./AddClientForm";


const AddClient = () => {
    return (  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Add Clients</h2>
      <AddClientForm onSubmit={showResults} />
    </div>
  </Provider>
    );
}

export default AddClient;