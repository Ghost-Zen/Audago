import express from 'express';

const app = express();
app.use(express.static('./client/build'));

const PORT = process.env.PORT || 4732;

app.listen(PORT, function () {
  console.log(`App starting on port: ${PORT}`);
});