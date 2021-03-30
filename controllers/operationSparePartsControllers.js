const OperationSparePart = require('../models/operationSpareParts')

exports.operationSparePartAdd = async (req,res) => {
  let newOperationSparePart = await OperationSparePart.insertMany(req.body, function(err, operationSpareParts) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.operationSparePartsList = async (req,res) => {
  let operationSpareParts = await OperationSparePart.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, operationSpareParts) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json(operationSpareParts);
    
  });
}

exports.operationSparePartDetails = async (req,res) => {
  let operationSparePart = await OperationSparePart.findById(req.param('id'), function(err, operationSparePart) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationSparePart===null) {
      return res.status(400)
        .json({ error: "OperationSparePart not available in the database" });
    }
    return res.json(operationSparePart);
  });
}


exports.operationSparePartbyOperationId = async (req,res) => {
  let operationSparePart = await OperationSparePart.find({operation_id: req.param('operationId')}, function(err, operationSparePart) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(operationSparePart);
  });
}

exports.operationSparePartUpdate = async (req,res) => {
  console.log("id",req.param('id'))
  let operationSparePart = await OperationSparePart.findByIdAndUpdate(req.param('id'), req.body[0], function(err, operationSparePart) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (operationSparePart===null) {
      return res
        .status(400)
        .json({ error: "OperationSparePart not available in the database" });
    }
  });
  return res.json(operationSparePart);
  
}

exports.operationSparePartDelete = async (req,res) => {
  let operationSparePart = await OperationSparePart.deleteMany(
    {},
    //{_id: {$in: req.params.ids.split(",")}},
    function(err, operationSparePart) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (operationSparePart.n === 0) {
          return res
            .status(400)
            .json({ error: "OperationSpareParts not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
