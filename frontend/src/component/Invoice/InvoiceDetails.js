import React from "react";
import axios from 'axios';
import ReactTable from 'react-table'

// Class to display all the details of an invoice.
// The url for this page looks like /invoiceDetails/<invoice_id>.
// This invoice id is accessible in props.params and is sent to
// the server as a JSON object to retrieve the details.
class InvoiceDetails extends React.Component {
  state = {
    id: this.props.match.params.id,
    data: [{}]
  }
  // Retrieve invoice details for specified id.
  componentDidMount() {
    console.log(this.state.id);
    axios.post('http://localhost:8000/invoiceDetails', 
      {id: this.state.id}
    )
      .then(res => {
        this.setState({ data: res.data });
        console.log(this.state);
      });
  }
  render() {
    let data = this.state.data
    return (
      <div style={{ padding: 15 }}>
        {/* 
          All details accessed via data[0] are the same for
          all returned rows. Hence, display it only once.
        */}
        <div className="row">
          <div className="col s4">
            <h5>Invoice ID: {data[0].invoice_id}</h5>
          </div>
          <div className="col s4 offset-s4 right-align">
            <h5>Invoice Date: {data[0].date}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s4">
            <h5>Client Name: {data[0].client_name}</h5>
          </div>
          <div className="col s6 offset-s2 right-align">
            <h5>Client E-mail: {data[0].client_email}</h5>
          </div>
        </div>
        <div className="row">
          <div className="center-align">
            <p>Client Address: {data[0].client_address}</p>
          </div>
        </div>
          {/* 
            Display all products of an invoice in a ReactTable.
          */}
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Product ID",
                accessor: "product_id",
                style: { textAlign: "center" },
                maxWidth: 100
              },
              {
                Header: "Product Name",
                accessor: "product_name",
                style: { textAlign: "center" }
              },
              {
                Header: "Price per unit",
                accessor: "price_per_unit",
                style: { textAlign: "center" }
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                style: { textAlign: "center" }
              },
              {
                Header: "Cost",
                accessor: "cost",
                style: { textAlign: "center" }
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            showPagination={false}
            minRows={0}
          />
          <div className="row">
            <div className="col s10 offset-s10">
              <h5>Total: {data[0].total}</h5>
            </div>
          </div>
      </div>
    )
  }
}

export default InvoiceDetails;