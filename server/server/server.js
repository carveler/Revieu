require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const meRouter = require('./routes/meRouter');
const reviewRouter = require('./routes/reviewRouter');
const env = require('./config/config');

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Review Api');
});

//middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(
  cors({
    // origin: env.frontendOrigin || 'http://localhost:19000',
    // credentials: true,
  })
);
app.use('/statics', express.static('statics'));
//Routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);
app.use('/me', meRouter);

const strConn = env.db;

mongoose
  .connect(strConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to central DB success'))
  .catch((err) => console.log('[ERROR] DB connection failed', err));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
