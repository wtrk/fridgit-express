const Invoice = require('../models/invoices')

exports.invoiceAdd = async (req,res) => {
  let newInvoice = await Invoice.insertMany(req.body, function(err, invoices) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
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
  let invoice = await Invoice.findById(req.params.id, function(err, invoice) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (invoice===null) {
      return res.status(400)
        .json({ error: "Invoice not available in the database" });
    }
    return res.json(invoice);
  });
}

exports.invoiceUpdate = async (req,res) => {
  let invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body[0], function(err, invoice) {
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
    return res.json(invoice);
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
