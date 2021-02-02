const Store = require('../models/stores')

exports.storeAdd = async (req,res) => {
  let newStore = await Store.insertMany(req.body, function(err, stores) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.storesList = async (req,res) => {
  let stores = await Store.find({}, function(err, stores) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(stores.length===0) {
          return res.status(400).json({error: 'No stores in the database'})
      }
      return res.json(stores);
    
  });
}

exports.storeDetails = async (req,res) => {
  let store = await Store.findById(req.param('id'), function(err, store) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (store===null) {
      return res.status(400)
        .json({ error: "Store not available in the database" });
    }
    return res.json(store);
  });
}

exports.storeUpdate = async (req,res) => {
  let store = await Store.findByIdAndUpdate(req.param('id'), req.body[0], function(err, store) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (store===null) {
      return res
        .status(400)
        .json({ error: "Store not available in the database" });
    }
    return res.json(store);
  });
  
}

exports.storeDelete = async (req,res) => {
  let store = await Store.deleteMany(
    {
      _id: {
        $in: req.params.ids.split(",")

      }
      }, function(err, store) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (store.n === 0) {
          return res
            .status(400)
            .json({ error: "Stores not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
