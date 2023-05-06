const axios = require('axios');

const api = "http://localhost:3001/api/user/getUser";


axios.get(api, { params: { email: 'liyakat1234@gmail.com'}}).then( (resp) => {
    console.log(resp.data);
})