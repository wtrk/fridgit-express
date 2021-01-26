const CityAlias = require('../models/cityAlias')

exports.cityAliasAdd = async (req,res) => {
  let newCityAlias = await CityAlias.insertMany(req.body, function(err, cityAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.cityAliasList = async (req,res) => {
  let cityAlias = await CityAlias.find({}, function(err, cityAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(cityAlias.length===0) {
          return res.status(400).json({error: 'No City Alias in the database'})
      }
      return res.json(cityAlias);
    
  });
}

exports.cityAliasDetails = async (req,res) => {
  let cityAlias = await CityAlias.findById(req.param('id'), function(err, cityAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cityAlias===null) {
      return res.status(400)
        .json({ error: "City Alias not available in the database" });
    }
    return res.json(cityAlias);
  });
}

exports.cityAliasUpdate = async (req,res) => {
  let cityAlias = await CityAlias.findByIdAndUpdate(req.param('id'), req.body[0], function(err, cityAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cityAlias===null) {
      return res
        .status(400)
        .json({ error: "City Alias not available in the database" });
    }
    return res.json(cityAlias);
  });
  
}

exports.cityAliasDelete = async (req,res) => {
  let cityAlias = await CityAlias.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, cityAlias) {
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
        return res.json({message:"Successfully deleted"})
      })
}
