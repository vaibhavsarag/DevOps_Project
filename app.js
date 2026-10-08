const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Redeveloped the CICD pipeline');

});

app.listen(3000, () => {
  console.log('Server running');
});
