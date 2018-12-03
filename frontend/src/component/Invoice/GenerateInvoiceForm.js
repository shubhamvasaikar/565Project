import React from 'react';
import { Field, reduxForm } from 'redux-form';
import ClientAC from './ClientAC';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';

class GenerateInvoiceForm extends React.Component {
  client_id = React.createRef();
  render() {
    return (
      <form>
        <div className='row'>
          <div className='col s4'>
            <label>Client ID</label>
            <div>
              <Field
                name="client_id"
                component="input"
                type="text"
                ref={this.client_id}
              />
            </div>
          </div>
          <div className='col s4'>
            <label>Client Name</label>
            <div>
              <ClientAC />
            </div>
          </div>
          <div className='col s4'>
            <label>Address</label>
            <div>
              <Field
                name="client_address"
                component="input"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <button className="btn waves-effect waves-light" type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'invoice', // a unique identifier for this form
})(GenerateInvoiceForm);