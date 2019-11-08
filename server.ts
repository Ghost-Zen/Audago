import express from 'express';
import AppRoutes from './server/routes/routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client/build'));

// import Accounts, { Iaccounts } from './server/services/models/Accounts';

const url = process.env.MONGODB_URI || 'mongodb://heroku_4gfkhww0:sp8n4tfopvferquvd7kj2n9heo@ds023373.mlab.com:23373/heroku_4gfkhww0';

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