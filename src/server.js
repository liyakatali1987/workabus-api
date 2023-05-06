const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const api = require("./api");

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

const port = process.env.PORT || 3001

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, () => {
    console.log('listening on http://localhost:3001');
})


