const Neighbourhood = require('../models/neighbourhoods')

exports.neighbourhoodAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  let neighbourhoods = await Neighbourhood.find({}, function(err, neighbourhoods) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(neighbourhoods.length===0) {
          return res.status(400).json({error: 'No neighbourhoods in the database'})
      }
      return res.json(neighbourhoods);
    
  });
}

exports.neighbourhoodDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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
