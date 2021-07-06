const ServiceType = require('../models/serviceTypes')

exports.serviceTypeAdd = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let newServiceType = await ServiceType.insertMany(req.body, function(err, serviceTypes) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.serviceTypesList = async (req,res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const searchEntry = req.query.searchEntry? {name:req.query.searchEntry.split(",")}:{};

  const count= await ServiceType.estimatedDocumentCount((err, count) => count);
  
  let serviceTypes = await ServiceType.find(searchEntry, null, {sort: { 'updatedAt' : -1 }, skip, limit}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json({count,data});
    
  });
}

exports.serviceTypeDetails = async (req,res) => {
  let serviceType = await ServiceType.findById(req.params.id, function(err, serviceType) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (serviceType===null) {
      return res.status(400)
        .json({ error: "Service type not available in the database" });
    }
    return res.json(serviceType);
  });
}

exports.serviceTypeUpdate = async (req,res) => {
  let serviceType = await ServiceType.findByIdAndUpdate(req.params.id, req.body[0], function(err, serviceType) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (serviceType===null) {
      return res
        .status(400)
        .json({ error: "Service type not available in the database" });
    }
    return res.json(serviceType);
  });
  
}

exports.serviceTypeDelete = async (req,res) => {
  let serviceType = await ServiceType.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, serviceType) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (serviceType.n === 0) {
          return res
            .status(400)
            .json({ error: "Service types not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
