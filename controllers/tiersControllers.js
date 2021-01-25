const Tier = require('../models/tiers')

exports.tierAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let newTier = await Tier.insertMany(req.body, function(err, tiers) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.tiersList = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let tiers = await Tier.find({}, function(err, tiers) {
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
  let tier = await Tier.findById(req.param('id'), function(err, tier) {
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
  let tier = await Tier.findByIdAndUpdate(req.param('id'), req.body[0], function(err, tier) {
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
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, tier) {
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
