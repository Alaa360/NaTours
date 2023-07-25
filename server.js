const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('Connected to DB...'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`I'm Listening to everything on port ${port}.....`);
});
