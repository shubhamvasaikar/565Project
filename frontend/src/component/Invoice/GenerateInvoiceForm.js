import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';
import ClientAC from './ClientAC';
import $ from 'jquery';
import ProductAC from './ProductAC';

class GenerateInvoiceForm extends React.Component {
  state = {
    products: [{details:"", quantity:"", cost:""}],
    productData: [],
    clientData: [],
    clientACvalue: "",
    productACvalue: "",
    date: new Date().toLocaleDateString(),
    total: 0
  }
  componentDidMount() {
    $("#date").attr('value', this.state.date);

    axios.get('http://localhost:8000/clients')
      .then(res => {
        this.setState({ clientData: res.data });
      });
    
    axios.get('http://localhost:8000/products')
    .then(res => {
      this.setState({ productData: res.data });
      });
  }
  handleSubmit = (e) => {
    axios.post('http://localhost:8000/generateInvoice', this.state)
      // .then(res => {
      //   console.log(res);
      // })
  }
  addProduct = (e) => { 
    e.preventDefault()
    const total = this.state.products.reduce((acc, product) => {
      return acc + parseFloat(product.cost)
    }, 0);
    $("#total").attr('value', total);
    this.setState((prevState) => ({
        products: [...prevState.products, {details:"", quantity:0, cost:0}],
        total: total
      })
    );
  }
  handleChange = (e) => {
    if (["details", "quantity", "cost"].includes(e.target.className) ) {
      let products = [...this.state.products]
      products[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ products }, () => console.log(this.state.products))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
  render() {
    let products = this.state.products
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className='row'>
          <div className='col s8'>
            <label>Client Name</label>
            <div>
            <Autocomplete
              value={this.state.clientACvalue}
              inputProps={{ id: 'client_name', name: 'client_name' }}
              wrapperStyle={{ position: 'relative', display: 'block' }}
              items={this.state.clientData}
              getItemValue={(item) => item.client_id + ' - ' + item.client_name}
              onChange={(event, value) => {
                  this.setState({ clientACvalue: value })
                }
              }
              onSelect={value => {
                  console.log(value)
                  this.setState({ clientACvalue: value })
                }
              }
              renderItem={(item, isHighlighted) => (
                <div
                  className={{ background: isHighlighted ? 'lightgray' : 'white' }}
                  key={item.client_id}
                >{item.client_id + ' - ' + item.client_name}</div>
              )}
            />
            </div>
          </div>
          <div className='col s4'>
            <label>Date</label>
            <div>
              <Field
                id="date"
                name="date"
                component="input"
                type="text"
                disabled
              />
            </div>
          </div>
        </div>
        {
          products.map((val, idx) => {
            let productID = `product-${idx}`, quantityID = `quantity-${idx}`, cost = `cost-${idx}`
            return (
            <div className="row" key={idx}>
              <div className='col s5'>
              <label>Product Name</label>
                <Autocomplete
                  value={products[idx].details}
                  inputProps={{id: productID, name: productID }}
                  wrapperStyle={{ position: 'relative', display: 'block' }}
                  items={this.state.productData}
                  getItemValue={(item) => item.product_id + ' - ' + item.product_name + ' - ' + item.price_per_unit}
                  onChange={(event, value) => {
                    var productState = [...this.state.products]
                    productState[idx].details = value
                    this.setState({ products: productState })
                  }
                  }
                  onSelect={value => {
                    var productState = [...this.state.products]
                    productState[idx].details = value
                    this.setState({ products: productState })
                    //products[idx].details = value;
                  }
                  }
                  renderItem={(item, isHighlighted) => (
                    <div
                      className={{ background: isHighlighted ? 'lightgray' : 'white' }}
                      key={item.product_id}
                    >{item.product_id + ' - ' + item.product_name}</div>
                  )}
                />
              </div>
              <div className="col s3">
              <label>Quantity</label>
                <Field
                  id={quantityID}
                  name={quantityID}
                  component="input"
                  type="number"
                  onChange={(event, value) => {
                    const ppu = parseFloat($("#"+productID).attr('value').split(" - ")[2])
                    const quan = parseFloat(value)
                    if (ppu && quan) {
                      $('#'+cost).attr('value', (ppu * quan) + "");
                    }
                    var productState = [...this.state.products]
                    productState[idx].quantity = value
                    productState[idx].cost = (ppu * value) + ""
                    this.setState({ products: productState })
                  }}
                  value={products[idx].quantity}
                />
              </div>
              <div className="col s3">
              <label>Cost</label>
                <Field
                  id={cost} 
                  name={cost}
                  component="input"
                  type="text"
                  disabled
                />
              </div>
              <div className="col s1">
                <button onClick={this.addProduct} className="btn-floating btn-large waves-effect waves-light red">
                  <i className="material-icons">+</i>
                </button>
              </div>
              </div>
            )
            })
          }
        <div className='row'>
          <div className="col s3 offset-s8">
            <label>Total</label>
            <Field
              id="total"
              name="total"
              component="input"
              type="text"
              disabled
            />
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