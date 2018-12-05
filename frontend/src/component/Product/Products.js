import React from "react";
import { Link } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:8000/products')
      .then(res => {
        console.log("res");
        this.setState({ data: res.data });
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
          axios.post('http://localhost:8000/updateProducts', data[cellInfo.index]);
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
        <div className='row'>
          <div className="col s8">
            <h2>Products</h2>
          </div>
        </div>
        <div className='row'>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "ID",
                accessor: "product_id"
              },
              {
                Header: "Product Name",
                accessor: "product_name",
                Cell: this.renderEditable
              },
              {
                Header: "Rate",
                accessor: "price_per_unit",
                Cell: this.renderEditable
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
        <div className="row">
          <div>
            <Link to='/addProduct' className="btn waves-effect waves-light">Add a new client</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
