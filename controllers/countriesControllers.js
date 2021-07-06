const Country = require('../models/countries')

exports.countryAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let newCountry = await Country.insertMany(req.body, function(err, countries) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.countriesList = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let countries = await Country.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, countries) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(countries.length===0) {
          return res.status(400).json({error: 'No countries in the database'})
      }
      return res.json(countries);
    
  });
}

exports.countryDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let country = await Country.findById(req.params.id, function(err, country) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (country===null) {
      return res.status(400)
        .json({ error: "Country not available in the database" });
    }
    return res.json(country);
  });
}

exports.countryUpdate = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let country = await Country.findByIdAndUpdate(req.params.id, req.body[0], function(err, country) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (country===null) {
      return res
        .status(400)
        .json({ error: "Country not available in the database" });
    }
    return res.json(country);
  });
  
}

exports.countryDelete = async (req,res) => {
  let country = await Country.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, country) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (country.n === 0) {
          return res
            .status(400)
            .json({ error: "Countries not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
