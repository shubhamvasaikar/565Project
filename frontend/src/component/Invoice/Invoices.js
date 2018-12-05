import React from "react";
import { Link } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";

class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:8000/invoices')
      .then(res => {
        this.setState({ data: res.data });
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <div className='row'>
          <div className="col s8">
            <h2>Invoices</h2>
          </div>
        </div>
        <div className='row'>
          <ReactTable
            data={data}
            filterable
            columns={[
              {
                Header: "ID",
                accessor: "invoice_id",
                style: { textAlign: "center" },
                maxWidth: 100
              },
              {
                Header: "Date",
                accessor: "date",
                style: { textAlign: "center" }
              },
              {
                Header: "Client Name",
                accessor: "client_name",
                style: { textAlign: "center" }
              },
              {
                Header: "Client Email",
                accessor: "client_email",
                style: { textAlign: "center" }
              },
              {
                Header: "Total Amount",
                accessor: "total",
                style: { textAlign: "center" }
              },
              {
                Header: "",
                style: { textAlign: "center" },
                Cell: row => (
                  <Link 
                    to={`/invoiceDetails/${data[row.index].invoice_id}`} 
                    className="btn-small waves-effect waves-light"
                  >
                    View Details
                  </Link>
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }
}

export default Invoice;
