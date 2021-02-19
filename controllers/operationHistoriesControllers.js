const OperationHistory = require('../models/operationHistories')

exports.operationHistoryAdd = async (req,res) => {
  
  let newOperationHistory = await OperationHistory.insertMany(req.body, function(err, operationHistories) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.operationHistoriesList = async (req,res) => {
  
  let operationHistories = await OperationHistory.find({}, null, {sort: { 'createdAt' : -1 }}, function(err, operationHistories) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(operationHistories.length===0) {
          return res.status(400).json({error: 'No operation histories in the database'})
      }
      return res.json(operationHistories);
    
  });
}

exports.operationHistoryDetails = async (req,res) => {
  
  let operationHistory = await OperationHistory.findById(req.param('id'), function(err, operationHistory) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationHistory===null) {
      return res.status(400)
        .json({ error: "Operation History not available in the database" });
    }
    return res.json(operationHistory);
  });
}

exports.operationHistoryUpdate = async (req,res) => {
  
  let operationHistory = await OperationHistory.findByIdAndUpdate(req.param('id'), req.body[0], function(err, operationHistory) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationHistory===null) {
      return res
        .status(400)
        .json({ error: "Operation History not available in the database" });
    }
    return res.json(operationHistory);
  });
  
}

exports.operationHistoryDelete = async (req,res) => {
  
  let operationHistory = await OperationHistory.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, operationHistory) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (operationHistory.n === 0) {
          return res
            .status(400)
            .json({ error: "OperationHistories not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
