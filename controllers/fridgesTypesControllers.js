const FridgesType = require('../models/fridgesTypes')

exports.fridgesTypeAdd = async (req,res) => {
  
  let newFridgesType = await FridgesType.insertMany(req.body, function(err, fridgesTypes) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

      return res.json({message:"Successfully added",id:fridgesTypes[0]._id});
  })
}

exports.fridgesTypesList = async (req,res) => {

  let fridgesTypes = await FridgesType.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, fridgesTypes) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(fridgesTypes.length===0) {
          return res.status(400).json({error: 'No fridges Types in the database'})
      }
      return res.json(fridgesTypes);
    
  });
}

exports.fridgesTypeDetails = async (req,res) => {
  let fridgesType = await FridgesType.findById(req.param('id'), function(err, fridgesType) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (fridgesType===null) {
      return res.status(400)
        .json({ error: "Fridges Type not available in the database" });
    }
    return res.json(fridgesType);
  });
}

exports.fridgesTypeUpdate = async (req,res) => {
  let fridgesType = await FridgesType.findByIdAndUpdate(req.param('id'), req.body[0], function(err, fridgesType) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (fridgesType===null) {
      return res
        .status(400)
        .json({ error: "Fridges Type not available in the database" });
    }
    return res.json(fridgesType);
  });
  
}

exports.fridgesTypeDelete = async (req,res) => {
  let fridgesType = await FridgesType.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, fridgesType) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (fridgesType.n === 0) {
          return res
            .status(400)
            .json({ error: "FridgesTypes not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
