const Supplier = require('../models/suppliers')

exports.supplierAdd = async (req,res) => {
  let newSupplier = await Supplier.insertMany(req.body, function(err, suppliers) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.suppliersList = async (req,res) => {
  let suppliers = await Supplier.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, suppliers) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(suppliers.length===0) {
          return res.status(400).json({error: 'No suppliers in the database'})
      }
      return res.json(suppliers);
    
  });
}

exports.supplierDetails = async (req,res) => {
  let supplier = await Supplier.findById(req.param('id'), function(err, supplier) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (supplier===null) {
      return res.status(400)
        .json({ error: "Supplier not available in the database" });
    }
    return res.json(supplier);
  });
}

exports.supplierUpdate = async (req,res) => {
  let supplier = await Supplier.findByIdAndUpdate(req.param('id'), req.body[0], function(err, supplier) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (supplier===null) {
      return res
        .status(400)
        .json({ error: "Supplier not available in the database" });
    }
    return res.json(supplier);
  });
  
}

exports.supplierDelete = async (req,res) => {
  let supplier = await Supplier.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, supplier) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (supplier.n === 0) {
          return res
            .status(400)
            .json({ error: "Suppliers not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
