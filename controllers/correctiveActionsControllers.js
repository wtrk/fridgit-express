const CorrectiveAction = require('../models/correctiveActions')

exports.correctiveActionAdd = async (req,res) => {
  console.log("req","ppp",req.body)
  let newCorrectiveAction = await CorrectiveAction.insertMany(req.body, function(err, correctiveActions) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.correctiveActionsList = async (req,res) => {
  let correctiveActions = await CorrectiveAction.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, correctiveActions) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(correctiveActions.length===0) {
          return res.status(400).json({error: 'No correctiveActions in the database'})
      }
      return res.json(correctiveActions);
    
  });
}

exports.correctiveActionDetails = async (req,res) => {
  let correctiveAction = await CorrectiveAction.find({ '_id': { $in: req.param('id').split(",") } }, function(err, correctiveAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (correctiveAction===null) {
      return res.status(400)
        .json({ error: "CorrectiveAction not available in the database" });
    }
    return res.json(correctiveAction);
  });
}

exports.correctiveActionUpdate = async (req,res) => {
  let correctiveAction = await CorrectiveAction.findByIdAndUpdate(req.param('id'), req.body[0], function(err, correctiveAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (correctiveAction===null) {
      return res
        .status(400)
        .json({ error: "CorrectiveAction not available in the database" });
    }
    return res.json(correctiveAction);
  });
  
}

exports.correctiveActionDelete = async (req,res) => {
  let correctiveAction = await CorrectiveAction.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, correctiveAction) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (correctiveAction.n === 0) {
          return res
            .status(400)
            .json({ error: "CorrectiveActions not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
