import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Form to add a new product into the database.
// Very similar to the Clients component.
// handleSubmit is written in the showResults.js file.
const AddProductForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name</label>
        <div className="row">
          <Field
            name="product_name"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div>
        <label>Price per unit</label>
        <div className="row">
          <Field
            name="price_per_unit"
            component="input"
            type="number"
          />
        </div>
      </div>
      <div>
        <button className="btn waves-effect waves-light" type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button className="btn waves-effect waves-light" type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(AddProductForm);
