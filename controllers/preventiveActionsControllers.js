const PreventiveAction = require('../models/preventiveActions')

exports.preventiveActionAdd = async (req,res) => {
  console.log("req","ppp",req.body)
  let newPreventiveAction = await PreventiveAction.insertMany(req.body, function(err, preventiveActions) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.preventiveActionsList = async (req,res) => {
  let preventiveActions = await PreventiveAction.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, preventiveActions) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(preventiveActions.length===0) {
          return res.status(400).json({error: 'No preventive Actions in the database'})
      }
      return res.json(preventiveActions);
    
  });
}

exports.preventiveActionDetails = async (req,res) => {
  let preventiveAction = await PreventiveAction.find({ '_id': { $in: req.param('id').split(",") } }, function(err, preventiveAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (preventiveAction===null) {
      return res.status(400)
        .json({ error: "Preventive Action not available in the database" });
    }
    return res.json(preventiveAction);
  });
}

exports.preventiveActionUpdate = async (req,res) => {
  let preventiveAction = await PreventiveAction.findByIdAndUpdate(req.param('id'), req.body[0], function(err, preventiveAction) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (preventiveAction===null) {
      return res
        .status(400)
        .json({ error: "Preventive Action not available in the database" });
    }
    return res.json(preventiveAction);
  });
  
}

exports.preventiveActionDelete = async (req,res) => {
  let preventiveAction = await PreventiveAction.deleteMany(
    //{},
    {_id: {$in: req.params.ids.split(",")}},
    function(err, preventiveAction) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (preventiveAction.n === 0) {
          return res
            .status(400)
            .json({ error: "Preventive Actions not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
