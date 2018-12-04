import React from "react";
import axios from 'axios';
import ReactTable from 'react-table'

class InvoiceDetails extends React.Component {
  state = {
    id: this.props.match.params.id,
    data: [{}]
  }
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
        <div className="row">
          <div className="col s4">
            <p>Invoice ID: {data[0].invoice_id}</p>
          </div>
          <div className="col s4 offset-s4">
            <p>Invoice Date: {data[0].date}</p>
          </div>
        </div>
        <div className="row">
          <div className="col s4">
            <p>Client Name: {data[0].client_name}</p>
          </div>
          <div className="col s4">
            <p>Client Address: {data[0].client_address}</p>
          </div>
          <div className="col s4">
            <p>Client E-mail: {data[0].client_email}</p>
          </div>
        </div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Product ID",
                accessor: "product_id"
              },
              {
                Header: "Product Name",
                accessor: "product_name"
              },
              {
                Header: "Price per unit",
                accessor: "price_per_unit",
              },
              {
                Header: "Quantity",
                accessor: "quantity",
              },
              {
                Header: "Cost",
                accessor: "cost",
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
      </div>
    )
  }
}

export default InvoiceDetails;