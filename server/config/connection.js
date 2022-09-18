const mongoose = require('mongoose');

// added the MONGODB_URI Config Var to Heroku.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // options usecreateindex, usefindandmodify are not supported in new Mongoose
  // useCreateIndex: true,
  // useFindAndModify: false,  
});

module.exports = mongoose.connection;
