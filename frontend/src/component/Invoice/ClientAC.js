import React from 'react'
import Autocomplete from 'react-autocomplete'
import axios from 'axios'

class ClientAC extends React.Component {
  state = { value: '' }
  componentDidMount() {
    axios.get('http://localhost:8000/clients')
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      });
  }
  render() {
    return (
        <Autocomplete
          value={this.state.value}
          inputProps={{ name: 'client_name' }}
          wrapperStyle={{ position: 'relative', display: 'block' }}
          items={this.state.data}
          getItemValue={(item) => item.client_name}
          onChange={(event, value) => {
              console.log(event);
              this.setState({ value })
            }
          }
          onSelect={value => {
              console.log(value)
              this.setState({ value })
            }
          }
          // renderMenu={children => (
          //   <div className="menu">
          //     {children}
          //   </div>
          // )}
          renderItem={(item, isHighlighted) => (
            <div
              className={{ background: isHighlighted ? 'lightgray' : 'white' }}
              key={item.client_id}
            >{item.client_name}</div>
          )}
        />
    )
  }
}

export default ClientAC