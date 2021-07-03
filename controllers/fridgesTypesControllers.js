const FridgesType = require('../models/fridgesTypes')
const Cabinet = require('../models/cabinets')

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
exports.fridgesTypeDetailsBySn = async (req,res) => {
  
  let cabinet = await Cabinet.findById(req.param('snId'));
  if(cabinet.type){
    let fridgesType = await FridgesType.findById(cabinet.type, function(err, fridgesType) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (fridgesType===null) {
        return res.status(400).json({ error: "Not Available" });
      }
      return res.json(fridgesType);
    });
  }else{
    return res.status(400).json({ error: "Not Available" });
  }
}

exports.fridgesTypeUpdate = async (req,res) => {
  console.log(req.body[0])
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

exports.fridgesTypeUpdateImg = async (req,res) => {
  if (req.files !== null) {
    const file = req.files.file;
  
    file.mv(`../frontend/public/img/types/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      let fridgesType = FridgesType.findByIdAndUpdate(req.param('id'), {"photo":file.name}, function(err, fridgesType) {
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
        return res.json({"message":"Success"});
      });
    });
  }
  
}

exports.fridgesTypeDelete = async (req,res) => {
  let fridgesType = await FridgesType.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
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
