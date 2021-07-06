const SparePart = require('../models/spareParts')

exports.sparePartAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log("req","ppp",req.body)
  let newSparePart = await SparePart.insertMany(req.body, function(err, spareParts) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.sparePartsList = async (req,res) => {
  let spareParts = await SparePart.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, spareParts) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json(spareParts);
    
  });
}

exports.sparePartDetails = async (req,res) => {
  let sparePart = await SparePart.find({ '_id': { $in: req.params.id.split(",") } }, function(err, sparePart) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (sparePart===null) {
      return res.status(400)
        .json({ error: "SparePart not available in the database" });
    }
    return res.json(sparePart);
  });
}

exports.sparePartUpdate = async (req,res) => {
  let sparePart = await SparePart.findByIdAndUpdate(req.params.id, req.body[0], function(err, sparePart) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (sparePart===null) {
      return res
        .status(400)
        .json({ error: "SparePart not available in the database" });
    }
    return res.json(sparePart);
  });
  
}

exports.sparePartDelete = async (req,res) => {
  let sparePart = await SparePart.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, sparePart) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (sparePart.n === 0) {
          return res
            .status(400)
            .json({ error: "SpareParts not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
