import axios from 'axios';

export default (async function submit(values) {
  //console.log(values);
  
  axios.post('http://localhost:8000/addClient', values)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
  
});
