const Tier = require('../models/tiers')

exports.tierAdd = async (req,res) => {
  
  let newTier = await Tier.insertMany(req.body, function(err, tiers) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

      return res.json({message:"Successfully added",id:tiers[0]._id});
  })
}

exports.tiersList = async (req,res) => {

  let tiers = await Tier.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, tiers) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(tiers.length===0) {
          return res.status(400).json({error: 'No tiers in the database'})
      }
      return res.json(tiers);
    
  });
}

exports.tierDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let tier = await Tier.findById(req.params.id, function(err, tier) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (tier===null) {
      return res.status(400)
        .json({ error: "Tier not available in the database" });
    }
    return res.json(tier);
  });
}

exports.tierUpdate = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let tier = await Tier.findByIdAndUpdate(req.params.id, req.body[0], function(err, tier) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (tier===null) {
      return res
        .status(400)
        .json({ error: "Tier not available in the database" });
    }
    return res.json(tier);
  });
  
}

exports.tierDelete = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let tier = await Tier.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, tier) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (tier.n === 0) {
          return res
            .status(400)
            .json({ error: "Tiers not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}

exports.tierCityList = async (req,res) => {
  const tierId=req.params.tierId
  let tierCities = await Tier.findById(tierId,'cities', function(err, tierCities) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(!tierCities || tierCities.length===0) {
          return res.status(400).json({error: 'No City added to the specified tier'})
      }
      return res.json(tierCities);
    
  });
}

exports.tierCityAdd = async (req,res) => {
  try{
    let newTierCity =  await Tier.findOne({_id: req.params.tierId});
    newTierCity.cities.push(req.body);
    newTierCity.save();
    return res.status(200).json("Successfully added");
  }catch (error){
      return res.status(400).json({
        error,
      });
  }
}


exports.tierCityDelete = async (req,res) => {
  const tierId = req.params.tierId;
  const tierCitiesName = req.params.tierCitiesName;
  
  let tierCities = await City.findByIdAndUpdate(
    tierId,
    {
      $pull: {
        cities: {
          name: {
            $in: tierCitiesName.split(","),
          },
        },
      },
    },
    function (err, tierCities) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (tierCities.n === 0) {
        return res
          .status(400)
          .json({ error: "City Alias not available in the database" });
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}