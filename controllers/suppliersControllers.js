const Supplier = require('../models/suppliers')

exports.supplierAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  let suppliers = await Supplier.find({}, function(err, suppliers) {
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  let supplier = await Supplier.findByIdAndUpdate (req.param('id'), req.body, function(err, supplier) {
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  let supplier = await Supplier.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, supplier) {
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
