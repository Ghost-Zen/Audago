import express from 'express';
import AppRoutes from './server/routes/routes';
import bodyParser from 'body-parser';
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client/build'));


const appRouting = new AppRoutes(app)
appRouting.router()


const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`App starting on port: ${PORT}`);
});