if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      routes = require('./routes'),
      axios = require('axios'),
      errorHandler = require('./middlewares/errorHandler'),
      PORT = process.env.PORT || 3000,
      MONGO_CONNECTION = process.env.MONGO_CONNECTION,
      app = express()

mongoose.connect(MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if(err) console.log('Database connection failed')
  else console.log('Database connection success')
});

// Middleware
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))

// Route
app.use('/', routes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});