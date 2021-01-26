const ClientContact = require('../models/clientContacts')

exports.clientContactAdd = async (req,res) => {
  let newClientContact = await ClientContact.insertMany(req.body, function(err, clientContacts) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.clientContactsList = async (req,res) => {
  let clientContacts = await ClientContact.find({}, function(err, clientContacts) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(clientContacts.length===0) {
          return res.status(400).json({error: 'No client Contacts in the database'})
      }
      return res.json(clientContacts);
    
  });
}

exports.clientContactDetails = async (req,res) => {
  let clientContact = await ClientContact.findById(req.param('id'), function(err, clientContact) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (clientContact===null) {
      return res.status(400)
        .json({ error: "Client Contact not available in the database" });
    }
    return res.json(clientContact);
  });
}

exports.clientContactUpdate = async (req,res) => {
  let clientContact = await ClientContact.findByIdAndUpdate(req.param('id'), req.body[0], function(err, clientContact) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (clientContact===null) {
      return res
        .status(400)
        .json({ error: "Client Contact not available in the database" });
    }
    return res.json(clientContact);
  });
  
}

exports.clientContactDelete = async (req,res) => {
  let clientContact = await ClientContact.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, clientContact) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (clientContact.n === 0) {
          return res
            .status(400)
            .json({ error: "Client Contact not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
