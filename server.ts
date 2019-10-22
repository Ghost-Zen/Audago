import express from 'express';
import AppRoutes from './server/routes/routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client/build'));

// import Accounts, { Iaccounts } from './server/services/models/Accounts';

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/audago_db';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }); // establishing the connection
mongoose.connection
  .once('open', async () => {
<<<<<<< HEAD
    console.log('Connection established');    
=======
    console.log('Connection established');
    const appRouting = new AppRoutes(app)
    appRouting.router();
>>>>>>> 6137988c1c75c1c387a761506a48f5e87e291fd0
  })
  .on('error', (error) => {
    console.log('Warning : ' + error);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`App starting on port: ${PORT}`);
});