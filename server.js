const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/myplan-admin'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/myplan-admin/index.html'));
});
app.listen(process.env.PORT || 4200);