import axios from 'axios'

export default (async function showResults(values) {

  axios.post('http://localhost:8000/addProduct', values)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  
});
