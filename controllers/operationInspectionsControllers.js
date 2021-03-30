const OperationInspection = require('../models/operationInspections')

exports.operationInspectionAdd = async (req,res) => {
  let newOperationInspection = await OperationInspection.insertMany(req.body, function(err, operationInspections) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.operationInspectionsList = async (req,res) => {
  let operationInspections = await OperationInspection.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, operationInspections) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
      if(operationInspections.length===0) {
          return res.status(400).json({error: 'No operationInspections in the database'})
      }
      return res.json(operationInspections);
    
  });
}

exports.operationInspectionDetails = async (req,res) => {
  let operationInspection = await OperationInspection.find({ '_id': { $in: req.param('id').split(",") } }, function(err, operationInspection) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationInspection===null) {
      return res.status(400)
        .json({ error: "OperationInspection not available in the database" });
    }
    return res.json(operationInspection);
  });
}

exports.operationInspectionbyOperationId = async (req,res) => {
  let operationInspection = await OperationInspection.find({operation_id: req.param('operationId')}, function(err, operationInspection) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(operationInspection);
  });
}
exports.operationInspectionUpdate = async (req,res) => {
  let operationInspection = await OperationInspection.findByIdAndUpdate(req.param('id'), req.body[0], function(err, operationInspection) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationInspection===null) {
      return res
        .status(400)
        .json({ error: "OperationInspection not available in the database" });
    }
    return res.json(operationInspection);
  });
  
}

exports.operationInspectionDelete = async (req,res) => {
  let operationInspection = await OperationInspection.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, operationInspection) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (operationInspection.n === 0) {
          return res
            .status(400)
            .json({ error: "OperationInspections not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
