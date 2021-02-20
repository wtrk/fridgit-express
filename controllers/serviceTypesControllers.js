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
  let serviceTypes = await ServiceType.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, serviceTypes) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(serviceTypes.length===0) {
          return res.status(400).json({error: 'No service types in the database'})
      }
      return res.json(serviceTypes);
    
  });
}

exports.serviceTypeDetails = async (req,res) => {
  let serviceType = await ServiceType.findById(req.param('id'), function(err, serviceType) {
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
  let serviceType = await ServiceType.findByIdAndUpdate(req.param('id'), req.body[0], function(err, serviceType) {
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
