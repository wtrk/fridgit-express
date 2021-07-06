const Client = require('../models/clients')


exports.clientsRenameCompanyToName = async (req,res) => {
  Client.updateMany({}, { $rename: { company: 'name' } }, { multi: true }, function(err, blocks) {
    if(err) { throw err; }
    console.log('done!');
});
  
}
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  let clients = await Client.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, clients) {
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
  let client = await Client.findById(req.params.id, function(err, client) {
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
  let client = await Client.findByIdAndUpdate(req.params.id, req.body, function(err, client) {
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
exports.clientUpdateImg = async (req,res) => {
  if (req.files !== null) {
    const file = req.files.file;

    file.mv(`../frontend/public/img/clients/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      let client = Client.findByIdAndUpdate(req.params.id, {"photo":file.name}, function(err, client) {
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
        return res.json({"message":"Success"});
      });
    });
  }
  
}

exports.clientDelete = async (req,res) => {
  let client = await Client.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, client) {
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

exports.clientLegalAdd = async (req,res) => {
  try{
    let newClientLegal =  await Client.findOne({_id: req.params.clientId});
    newClientLegal.legals.push(req.body);
    newClientLegal.save();
    return res.status(200).json("Successfully added");
  }catch (error){
      return res.status(400).json({
        error,
      });
  }
}

exports.clientLegalDelete = async (req,res) => {
  const clientId = req.params.clientId;
  const clientLegalId = req.params.clientLegalId;
  
  let clientLegal = await Client.findByIdAndUpdate(
    clientId,
    {
      $pull: {
        legals: {
          _id: {
            $in: clientLegalId.split(","),
          },
        },
      },
    },
    function (err, clientLegal) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (clientLegal.n === 0) {
        return res
          .status(400)
          .json({ error: "client Legal not available in the database" });
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}
exports.clientContactAdd = async (req,res) => {
  try{
    let newClientContact =  await Client.findOne({_id: req.params.clientId});
    newClientContact.contacts.push(req.body);
    newClientContact.save();
    return res.status(200).json("Successfully added");
  }catch (error){
      return res.status(400).json({
        error,
      });
  }
}
exports.clientContactDelete = async (req,res) => {
  const clientId = req.params.clientId;
  const clientContactId = req.params.clientContactId;
  
  let clientContact = await Client.findByIdAndUpdate(
    clientId,
    {
      $pull: {
        contacts: {
          _id: {
            $in: clientContactId.split(","),
          },
        },
      },
    },
    function (err, clientContact) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (clientContact.n === 0) {
        return res
          .status(400)
          .json({ error: "client Contact not available in the database" });
      }
      return res.json({ message: "Successfully deleted" });
    }
  );
}