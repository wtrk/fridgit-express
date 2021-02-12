const Neighbourhood = require('../models/neighbourhoods')
const NeighbourhoodAlias = require('../models/neighbourhoodAlias')

exports.neighbourhoodAdd = async (req,res) => {
  let newNeighbourhood = await Neighbourhood.insertMany(req.body, function(err, neighbourhoods) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.neighbourhoodsList = async (req,res) => {
  let neighbourhoods = await Neighbourhood.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, neighbourhoods) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(neighbourhoods);
    
  });
}

exports.neighbourhoodDetails = async (req,res) => {
  let neighbourhood = await Neighbourhood.findById(req.param('id'), function(err, neighbourhood) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (neighbourhood===null) {
      return res.status(400)
        .json({ error: "Neighbourhood not available in the database" });
    }
    return res.json(neighbourhood);
  });
}

exports.neighbourhoodUpdate = async (req,res) => {
  let neighbourhood = await Neighbourhood.findByIdAndUpdate(req.param('id'), req.body[0], function(err, neighbourhood) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (neighbourhood===null) {
      return res
        .status(400)
        .json({ error: "Neighbourhood not available in the database" });
    }
    return res.json(neighbourhood);
  });
  
}

exports.neighbourhoodDelete = async (req,res) => {
  let neighbourhood = await Neighbourhood.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, neighbourhood) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (neighbourhood.n === 0) {
          return res
            .status(400)
            .json({ error: "Neighbourhoods not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}

exports.neighbourhoodAliasList = async (req,res) => {
  const neighbourhoodId=req.params.neighbourhoodId
  let neighbourhoodAlias = await Neighbourhood.findById(neighbourhoodId,'alias', function(err, neighbourhoodAlias) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.json(neighbourhoodAlias);
    
  });
}

exports.neighbourhoodAliasDelete = async (req,res) => {
  const neighbourhoodId = req.params.neighbourhoodId;
  const neighbourhoodAliasId = req.params.neighbourhoodAliasId;
  
  let neighbourhoodAlias = await Neighbourhood.findByIdAndUpdate(
    neighbourhoodId,
    {
      $pull: {
        alias: {
          id: {
            $in: neighbourhoodAliasId.split(","),
          },
        },
      },
    },
    function (err, neighbourhoodAlias) {
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
      return res.json({ message: "Successfully deleted" });
    }
  );
}
