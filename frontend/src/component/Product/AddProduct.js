import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import showResults from "./showResults";
import AddProductForm from "./AddProductForm";


const AddProduct = () => {
    return (  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Add Products</h2>
      <AddProductForm onSubmit={showResults} />
      {/*<Values form="simple" />*/}
    </div>
  </Provider>
    );
}

export default AddProduct;