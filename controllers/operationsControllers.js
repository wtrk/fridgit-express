const Operation = require('../models/operations')


exports.operationAdd = async (req,res) => {
  let newOperation = await Operation.insertMany(req.body, function(err, operations) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.operationsList = async (req,response) => {
  let operations = await Operation.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, operations) {
    if (err) {
      return response.status(400).json({
        error: err,
      });
    }
      if(operations.length===0) {
          return response.status(400).json({error: 'No user types in the database'})
      }
      return response.json(operations);
    
  });
}
exports.operationDelete = async (req,res) => {
  let operation = await Operation.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, operation) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (operation.n === 0) {
          return res
            .status(400)
            .json({ error: "Operations not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}