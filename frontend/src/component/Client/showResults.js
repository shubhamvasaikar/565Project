import axios from 'axios';

// Called from the AddClientForm
// component. Call the API to insert
// a new client.
export default (async function submit(values) {
  //console.log(values);
  
  axios.post('http://localhost:8000/addClient', values)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });

  // Redirect to the /clients page after submitting.
  window.location.replace('/clients');
  
});
