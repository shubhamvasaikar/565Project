import React from 'react';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';
import { Field } from 'redux-form';
import $ from 'jquery';

class ProductAC extends React.Component {
  state = { value: '' }
  componentDidMount() {
    axios.get('http://localhost:8000/products')
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      });
  }
  calculateCost() {
    const ppu = parseFloat($("#product").attr('value').split(" - ")[2]);
    const quantity = parseFloat($('#quantity').val());
    if (ppu && quantity) {
      $('#amount').attr('value', ppu * quantity);
    }
  }
  render() {
    return (
      <div>
        <div className='col s5'>
        <label>Product Name</label>
          <Autocomplete
            value={this.state.value}
            inputProps={{id: 'product', name: 'product_name' }}
            wrapperStyle={{ position: 'relative', display: 'block' }}
            items={this.state.data}
            getItemValue={(item) => item.product_id + ' - ' + item.product_name + ' - ' + item.price_per_unit}
            onChange={(event, value) => {
              this.setState({ value })
            }
            }
            onSelect={value => {
              console.log(value)
              this.setState({ value })
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
            id='quantity' 
            name="quantity"
            component="input"
            type="number"
            onChange={() => this.calculateCost()}
          />
        </div>
        <div className="col s3">
        <label>Amount</label>
          <Field
            id='amount' 
            name="amount"
            component="input"
            type="text"
            disabled
          />
        </div>
      </div>
    )
  }
}

export default ProductAC