import axios from 'axios'

// Function to send an XMLHttpRequest to the backend.
export default (async function showResults(values) {

  axios.post('http://localhost:8000/addProduct', values)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  
  window.location.replace('/products');
});
