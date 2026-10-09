const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Redeveloped the CICD pipeline for Webhooks and Webhooks are working absoulutely fine. Now testing through VScode, Testing updated webhook again with VS Code');

});

app.listen(3000, () => {
  console.log('Server running');
});
