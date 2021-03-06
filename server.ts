import express from 'express';
import AppRoutes from './server/routes/routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config()
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client/build'));

const url = process.env.MONGODB_URI;

mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }); // establishing the connection
mongoose.connection
  .once('open', async () => {
    console.log('Connection established');
    const appRouting = new AppRoutes(app)
    appRouting.router()
  })
  .on('error', (error) => {
    console.log('Warning : ' + error);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`App starting on port: ${PORT}`);
});
