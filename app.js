const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('everyting is running fine on 6th August');

});

app.listen(3000, () => {
  console.log('Server running');
});
