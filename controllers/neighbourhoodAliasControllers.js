const NeighbourhoodAlias = require('../models/neighbourhoodAlias')

exports.neighbourhoodAliasAdd = async (req,res) => {
  let newNeighbourhoodAlias = await NeighbourhoodAlias.insertMany(req.body, function(err, neighbourhoodAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.neighbourhoodAliasList = async (req,res) => {
  let neighbourhoodAlias = await NeighbourhoodAlias.find({}, function(err, neighbourhoodAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(neighbourhoodAlias.length===0) {
          return res.status(400).json({error: 'No Neighbourhood Alias in the database'})
      }
      return res.json(neighbourhoodAlias);
    
  });
}

exports.neighbourhoodAliasDetails = async (req,res) => {
  let neighbourhoodAlias = await NeighbourhoodAlias.findById(req.param('id'), function(err, neighbourhoodAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (neighbourhoodAlias===null) {
      return res.status(400)
        .json({ error: "Neighbourhood Alias not available in the database" });
    }
    return res.json(neighbourhoodAlias);
  });
}

exports.neighbourhoodAliasUpdate = async (req,res) => {
  let neighbourhoodAlias = await NeighbourhoodAlias.findByIdAndUpdate(req.param('id'), req.body[0], function(err, neighbourhoodAlias) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (neighbourhoodAlias===null) {
      return res
        .status(400)
        .json({ error: "Neighbourhood Alias not available in the database" });
    }
    return res.json(neighbourhoodAlias);
  });
  
}

exports.neighbourhoodAliasDelete = async (req,res) => {
  let neighbourhoodAlias = await NeighbourhoodAlias.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, neighbourhoodAlias) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (neighbourhoodAlias.n === 0) {
          return res
            .status(400)
            .json({ error: "Neighbourhood Alias not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
