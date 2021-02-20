const LiveOperation = require('../models/liveOperations')

exports.liveOperationAdd = async (req,res) => {
  let newLiveOperation = await LiveOperation.insertMany(req.body, function(err, liveOperations) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.liveOperationsList = async (req,res) => {
  let liveOperations = await LiveOperation.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, liveOperations) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json(liveOperations);
  });
}

exports.liveOperationDetails = async (req,res) => {
  let liveOperation = await LiveOperation.findById(req.param('id'), function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (liveOperation===null) {
      return res.status(400)
        .json({ error: "Live Operation not available in the database" });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationDetailsByJobNumber = async (req,res) => {
  let liveOperation = await LiveOperation.find({ job_number: req.param('jobNumber')}, function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (liveOperation===null) {
      return res.status(400)
        .json({ error: "no Live Operation with the specific Job Number" });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationUpdate = async (req,res) => {
  let liveOperation = await LiveOperation.findByIdAndUpdate(req.param('id'), req.body[0], function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (liveOperation===null) {
      return res
        .status(400)
        .json({ error: "Live Operation not available in the database" });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationDelete = async (req,res) => {
  let liveOperation = await LiveOperation.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, liveOperation) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (liveOperation.n === 0) {
          return res
            .status(400)
            .json({ error: "Live Operations not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
