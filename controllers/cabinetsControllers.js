const Cabinet = require('../models/cabinets')

exports.cabinetAdd = async (req,res) => {
  let newCabinet = await Cabinet.insertMany(req.body, function(err, cabinets) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.cabinetsList = async (req,res) => {
  let cabinets = await Cabinet.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, cabinets) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(cabinets.length===0) {
          return res.status(400).json({error: 'No cabinets in the database'})
      }
      return res.json(cabinets);
  });
}

exports.cabinetDetails = async (req,res) => {
  let cabinet = await Cabinet.findById(req.param('id'), function(err, cabinet) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cabinet===null) {
      return res.status(400)
        .json({ error: "Cabinet not available in the database" });
    }
    return res.json(cabinet);
  });
}

exports.cabinetUpdate = async (req,res) => {
  let cabinet = await Cabinet.findByIdAndUpdate(req.param('id'), req.body[0], function(err, cabinet) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cabinet===null) {
      return res
        .status(400)
        .json({ error: "Cabinet not available in the database" });
    }
    return res.json(cabinet);
  });
}

exports.cabinetDelete = async (req,res) => {
  let cabinet = await Cabinet.deleteMany(
    {}, function(err, cabinet) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (cabinet.n === 0) {
          return res
            .status(400)
            .json({ error: "Cabinets not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
