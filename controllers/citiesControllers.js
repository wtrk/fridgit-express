const City = require('../models/cities')
const Neighbourhood = require('../models/neighbourhoods')

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  let cities = await City.find({}, "_id name code country", {sort: { 'name' : 1 }},  function(err, cities) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
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
    {_id: {$in: req.params.ids.split(",")}},
    function(err, city) {
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

exports.cityAliasList = async (req,res) => {
  const cityId=req.params.cityId
  let cityAlias = await City.findById(cityId,'alias', function(err, cityAlias) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.json(cityAlias);
    
  });
}

exports.cityAliasDelete = async (req,res) => {
  const cityId = req.params.cityId;
  const cityAliasName = req.params.cityAliasName;
  
  let cityAlias = await City.findByIdAndUpdate(
    cityId,
    {
      $pull: {
        alias: {
          name: {
            $in: cityAliasName.split(","),
          },
        },
      },
    },
    function (err, cityAlias) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (cityAlias.n === 0) {
        return res
          .status(400)
          .json({ error: "City Alias not available in the database" });
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}

exports.cityNeighbourhoodDetails = async (req,res) => {
  
  let city = await City.findById(req.param('cityId'), function(err, city) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return city
  });
  
  let neighbourhood = await Neighbourhood.findById(req.param('neighbourhoodId'), function(err, neighbourhood) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return neighbourhood
  });
  
  return res.json({ city: city.name,neighbourhood: neighbourhood.name });
}
