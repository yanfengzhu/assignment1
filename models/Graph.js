var mongoose = require('mongoose');

var GraphSchema = new mongoose.Schema({
  Country: String,
  numberOfdeaths: Number,
}, 
{
  collection: 'Maryland_Death_Collection'
});

mongoose.model('Graph', GraphSchema);