const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const path = './scores.json';
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.err('File not read');
    }
    data = JSON.parse(data);
    console.log(data);
    res.json(data);
  });
});
app.post('/', (req, res) => {
  console.log(req.body);
  fs.writeFile(path, JSON.stringify(req.body), function(err) {
    if (err) {
      res.status(404).send('Error');
    }
    res.send('Data saved');
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));