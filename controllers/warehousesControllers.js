const Warehouse = require('../models/warehouses')

exports.warehouseAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log("req","ppp",req.body)
  let newWarehouse = await Warehouse.insertMany(req.body, function(err, warehouses) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.warehousesList = async (req,res) => {
  let warehouses = await Warehouse.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, warehouses) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(warehouses.length===0) {
          return res.status(400).json({error: 'No warehouses in the database'})
      }
      return res.json(warehouses);
    
  });
}

exports.warehouseDetails = async (req,res) => {
  let warehouse = await Warehouse.findById(req.param('id'), function(err, warehouse) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (warehouse===null) {
      return res.status(400)
        .json({ error: "Warehouse not available in the database" });
    }
    return res.json(warehouse);
  });
}

exports.warehouseUpdate = async (req,res) => {
  let warehouse = await Warehouse.findByIdAndUpdate(req.param('id'), req.body[0], function(err, warehouse) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (warehouse===null) {
      return res
        .status(400)
        .json({ error: "Warehouse not available in the database" });
    }
    return res.json(warehouse);
  });
  
}

exports.warehouseDelete = async (req,res) => {
  let warehouse = await Warehouse.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, warehouse) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (warehouse.n === 0) {
          return res
            .status(400)
            .json({ error: "Warehouses not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
