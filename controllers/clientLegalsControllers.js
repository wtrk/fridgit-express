const ClientLegal = require('../models/clientLegals')

exports.clientLegalAdd = async (req,res) => {
  let newClientLegal = await ClientLegal.insertMany(req.body, function(err, clientLegals) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.clientLegalsList = async (req,res) => {
  let clientLegals = await ClientLegal.find({}, function(err, clientLegals) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(clientLegals.length===0) {
          return res.status(400).json({error: 'No client Legals in the database'})
      }
      return res.json(clientLegals);
    
  });
}

exports.clientLegalDetails = async (req,res) => {
  let clientLegal = await ClientLegal.findById(req.param('id'), function(err, clientLegal) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (clientLegal===null) {
      return res.status(400)
        .json({ error: "Client Legal not available in the database" });
    }
    return res.json(clientLegal);
  });
}

exports.clientLegalUpdate = async (req,res) => {
  let clientLegal = await ClientLegal.findByIdAndUpdate(req.param('id'), req.body[0], function(err, clientLegal) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (clientLegal===null) {
      return res
        .status(400)
        .json({ error: "Client Legal not available in the database" });
    }
    return res.json(clientLegal);
  });
  
}

exports.clientLegalDelete = async (req,res) => {
  let clientLegal = await ClientLegal.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, clientLegal) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (clientLegal.n === 0) {
          return res
            .status(400)
            .json({ error: "Client Legal not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
