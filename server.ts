import express from 'express';
import AppRoutes from './server/routes/routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client/build'));

// import Accounts, { Iaccounts } from './server/models/Accounts';

const url = 'mongodb://localhost:27017/audago_db';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }); // establishing the connection
mongoose.connection
  .once('open', async () => {
    console.log('Connection established');
    // const account: Iaccounts = new Accounts({
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   username: 'johndoe123',
    //   password: '12345',
    //   email: 'johndoe@gmail.com',
    //   image: '',
    //   active: false,
    //   timestamp: {
    //     created: 'date',
    //     lastSeen: 'date'
    //   },
    //   playlists: ['house', 'chill', 'rap']
    // });
    // await account.save();
    // console.log("done!");
    
  })
  .on('error', (error) => {
    console.log('Warning : ' + error);
  });

const appRouting = new AppRoutes(app)
appRouting.router()


const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`App starting on port: ${PORT}`);
});