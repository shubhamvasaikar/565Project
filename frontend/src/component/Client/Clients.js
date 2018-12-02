import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";

class Client extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  componentDidMount () { 
    axios.get('http://localhost:8000/clients')
        .then(res => {
            console.log("res");
            this.setState({data: res.data});
        });
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          console.log("onBlur")
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          console.log(data[cellInfo.index]);
          axios.post('http://localhost:8000/updateClients', data[cellInfo.index]);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
                Header: "Client ID",
                accessor: "client_id",
                Cell: this.renderEditable
            },
            {
              Header: "Client Name",
              accessor: "client_name",
              Cell: this.renderEditable
            },
            {
              Header: "Client Email",
              accessor: "client_email",
              Cell: this.renderEditable
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default Client;
