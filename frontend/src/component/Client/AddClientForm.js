import React from 'react';
import { Field, reduxForm } from 'redux-form';

const AddClientForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name</label>
        <div className="row">
          <Field
            name="client_name"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <label>Email</label>
        <div>
          <Field
            name="client_email"
            component="input"
            type="email"
          />
        </div>
      </div>
      <div className="row">
        <label>Address</label>
        <div>
          <Field
            className="materialize-textarea"
            name="client_address"
            component="textarea"
          />
        </div>
      </div>
      <div className="row">
        <button className="btn waves-effect waves-light" type="submit" disabled={pristine || submitting}>Submit</button>
        <button className="btn waves-effect waves-light" type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(AddClientForm);
