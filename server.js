const express = require('express')

let app = express();
app.use(express.static('./client/build'));

let PORT = process.env.PORT || 4732;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});