const Invoice = require('../models/invoices')
const Financial = require('../models/financials')
const Client = require('../models/clients')

exports.invoiceAdd = async (req,res) => {
  const client= await Client.find({}, (err, clientData) => clientData);

  await Invoice.insertMany(req.body, function(err, dataDb) {
    let companyId=client.find(e=>String(e._id)===dataDb[0].client_id)?client.find(e=>String(e._id)===dataDb[0].client_id).company_id:0
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    Financial.updateMany({_id: {$in: req.body[0].finance_ids}}, {$set: {invoice_id: dataDb[0]._id}}).then(ret => {
      return res.json({message:"Successfully added",data:dataDb,companyId});
    });
  })
}

exports.invoicesList = async (req,res) => {
  let invoices = await Invoice.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, invoices) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
   return res.json(invoices);
    
  });
}

exports.invoiceDetails = async (req,res) => {
  const finance= await Financial.find({invoice_id: req.params.id}, (err, financeData) => financeData);
  const client= await Client.find({}, (err, clientData) => clientData);

  


  let invoice = await Invoice.findById(req.params.id, function(err, data) {
    let companyId=client.find(e=>String(e._id)===data.client_id)?client.find(e=>String(e._id)===data.client_id).company_id:0
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (data===null) {
      return res.status(400)
        .json({ error: "Invoice not available in the database" });
    }

    return res.json({data,companyId,finance});
  });
}

exports.invoiceUpdate = async (req,res) => {
  await Invoice.findByIdAndUpdate(req.params.id, req.body[0], function(err, invoice) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (invoice===null) {
      return res
        .status(400)
        .json({ error: "Invoice not available in the database" });
    }
    Financial.updateMany({_id: {$in: req.body[0].finance_ids}}, {$set: {invoice_id: req.body[0]._id}}).then(ret => {
      return res.json(invoice);
    });
  });

  
}

exports.invoiceDelete = async (req,res) => {
  let invoice = await Invoice.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, invoice) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (invoice.n === 0) {
          return res
            .status(400)
            .json({ error: "Invoices not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
