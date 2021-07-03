const CorrectiveInspection = require('../models/correctiveInspections')

exports.correctiveInspectionAdd = async (req,res) => {
  console.log("req","ppp",req.body)
  let newCorrectiveInspection = await CorrectiveInspection.insertMany(req.body, function(err, correctiveInspections) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.correctiveInspectionsList = async (req,res) => {
  let correctiveInspections = await CorrectiveInspection.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, correctiveInspections) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(correctiveInspections.length===0) {
          return res.status(400).json({error: 'No correctiveInspections in the database'})
      }
      return res.json(correctiveInspections);
    
  });
}

exports.correctiveInspectionDetails = async (req,res) => {
  let correctiveInspection = await CorrectiveInspection.find({ '_id': { $in: req.param('id').split(",") } }, function(err, correctiveInspection) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (correctiveInspection===null) {
      return res.status(400)
        .json({ error: "CorrectiveInspection not available in the database" });
    }
    return res.json(correctiveInspection);
  });
}

exports.correctiveInspectionUpdate = async (req,res) => {
  let correctiveInspection = await CorrectiveInspection.findByIdAndUpdate(req.param('id'), req.body[0], function(err, correctiveInspection) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (correctiveInspection===null) {
      return res
        .status(400)
        .json({ error: "CorrectiveInspection not available in the database" });
    }
    return res.json(correctiveInspection);
  });
}

exports.correctiveInspectionDelete = async (req,res) => {
  let correctiveInspection = await CorrectiveInspection.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, correctiveInspection) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (correctiveInspection.n === 0) {
          return res
            .status(400)
            .json({ error: "CorrectiveInspections not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
