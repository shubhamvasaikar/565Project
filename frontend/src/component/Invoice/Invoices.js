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
        <div style={{ padding: 15 }} className='row'>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "ID",
                accessor: "invoice_id"
              },
              {
                Header: "Date",
                accessor: "date"
              },
              {
                Header: "Client Name",
                accessor: "client_name",
              },
              {
                Header: "Client Email",
                accessor: "client_email",
              },
              {
                Header: "Total Amount",
                accessor: "date",
              },
              {
                Header: "",
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
