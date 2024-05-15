const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const videodownload = require('./routes/videoRoutes.js');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:52262', 
    credentials: true, 
}));

app.use(cors());
app.use(bodyParser.json());

// Add routes here

app.use('/api/video', videodownload);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
