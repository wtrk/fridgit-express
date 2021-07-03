const OperationAction = require('../models/operationActions')

exports.operationActionAdd = async (req,res) => {
  let newOperationAction = await OperationAction.insertMany(req.body, function(err, operationActions) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.operationActionsList = async (req,res) => {
  let operationActions = await OperationAction.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, operationActions) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json(operationActions);
    
  });
}

exports.operationActionDetails = async (req,res) => {
  let operationAction = await OperationAction.find({ '_id': { $in: req.param('id').split(",") } },function(err, operationAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationAction===null) {
      return res.status(400)
        .json({ error: "OperationAction not available in the database" });
    }
    return res.json(operationAction);
  });
}

exports.operationActionUpdate = async (req,res) => {
  let operationAction = await OperationAction.findByIdAndUpdate(req.param('id'), req.body[0], function(err, operationAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationAction===null) {
      return res
        .status(400)
        .json({ error: "OperationAction not available in the database" });
    }
    return res.json(operationAction);
  });
  
}

exports.operationActionbyOperationId = async (req,res) => {
  let operationAction = await OperationAction.find({operation_id: req.param('operationId')}, function(err, operationAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(operationAction);
  });
}

exports.operationActionDelete = async (req,res) => {
  let operationAction = await OperationAction.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, operationAction) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (operationAction.n === 0) {
          return res
            .status(400)
            .json({ error: "OperationActions not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
