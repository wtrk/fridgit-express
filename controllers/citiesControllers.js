const City = require('../models/cities')

exports.cityAdd = async (req,res) => {
  let newCity = await City.insertMany(req.body, function(err, cities) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.citiesList = async (req,res) => {
  let cities = await City.find({}, function(err, cities) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(cities.length===0) {
          return res.status(400).json({error: 'No cities in the database'})
      }
      return res.json(cities);
    
  });
}

exports.cityDetails = async (req,res) => {
  let city = await City.findById(req.param('id'), function(err, city) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (city===null) {
      return res.status(400)
        .json({ error: "City not available in the database" });
    }
    return res.json(city);
  });
}

exports.cityUpdate = async (req,res) => {
  let city = await City.findByIdAndUpdate(req.param('id'), req.body[0], function(err, city) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (city===null) {
      return res
        .status(400)
        .json({ error: "City not available in the database" });
    }
    return res.json(city);
  });
  
}

exports.cityDelete = async (req,res) => {
  let city = await City.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, city) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (city.n === 0) {
          return res
            .status(400)
            .json({ error: "Cities not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
