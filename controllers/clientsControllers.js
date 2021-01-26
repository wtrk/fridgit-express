const Client = require('../models/clients')

exports.clientAdd = async (req,res) => {
  let newClient = await Client.insertMany(req.body, function(err, clients) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.clientsList = async (req,res) => {
  let clients = await Client.find({}, function(err, clients) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(clients.length===0) {
          return res.status(400).json({error: 'No clients in the database'})
      }
      return res.json(clients);
    
  });
}

exports.clientDetails = async (req,res) => {
  let client = await Client.findById(req.param('id'), function(err, client) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (client===null) {
      return res.status(400)
        .json({ error: "Client not available in the database" });
    }
    return res.json(client);
  });
}

exports.clientUpdate = async (req,res) => {
  let client = await Client.findByIdAndUpdate(req.param('id'), req.body[0], function(err, client) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (client===null) {
      return res
        .status(400)
        .json({ error: "Client not available in the database" });
    }
    return res.json(client);
  });
  
}

exports.clientDelete = async (req,res) => {
  let client = await Client.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
    }, function(err, client) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (client===null) {
          return res
            .status(400)
            .json({ error: "Clients not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
