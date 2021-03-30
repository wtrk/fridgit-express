const LiveOperation = require('../models/liveOperations')
const Cabinet = require('../models/cabinets')
const OperationAction = require('../models/operationActions')
const OperationInspection = require('../models/operationInspections')
const FridgesType = require('../models/fridgesTypes')
const OperationSparePart = require('../models/operationSpareParts')

exports.liveOperationAdd = async (req,res) => {
  let newLiveOperation = await LiveOperation.insertMany(req.body, function(err, liveOperations) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.liveOperationsList = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let liveOperations = await LiveOperation.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, liveOperations) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json(liveOperations);
  });
}

exports.liveOperationDetails = async (req,res) => {
  let liveOperation = await LiveOperation.findById(req.param('id'), function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (liveOperation===null) {
      return res.status(400)
        .json({ error: "Live Operation not available in the database" });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationDetailsByJobNumber = async (req,res) => {
  let liveOperation = await LiveOperation.find({ job_number: req.param('jobNumber')}, function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationDetailsBySn = async (req,res) => {
  let liveOperation = await LiveOperation.find({ sn: req.param('sn')}, function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationUpdate = async (req,res) => {
  let liveOperation = await LiveOperation.findByIdAndUpdate(req.param('id'), req.body[0], function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (liveOperation===null) {
      return res
        .status(400)
        .json({ error: "Live Operation not available in the database" });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationDelete = async (req,res) => {
  let liveOperation = await LiveOperation.deleteMany(
    //{},
    {_id: {$in: req.params.ids.split(",")}},
    function(err, liveOperation) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (liveOperation.n === 0) {
          return res
            .status(400)
            .json({ error: "Live Operations not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}


exports.correctiveReport = async (req,res) => {
  let operationNumber=req.param('operationNumber')
  let liveOperation = await LiveOperation.find({ operation_number: operationNumber}, function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return liveOperation
  });
  let cabinetDb = await Cabinet.findById(liveOperation[0].sn, function(err, cabinets) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return cabinets
  });
  
  let fridgeType = await FridgesType.findById(cabinetDb.type, function(err, fridgesType) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return fridgesType
  });
  
  
  let inspectionsList = await OperationInspection.find({ operation_id: operationNumber}, function(err, response) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return response
  });

  let operationActions = await OperationAction.find({ operation_id: operationNumber}, function(err, response) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return response
  });

  let operationSparePart = await OperationSparePart.find({operation_id: operationNumber}, function(err, response) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return response;
  });
  console.log("fridge_type",cabinetDb)
  if(liveOperation[0].operation_type==="Preventive Maintenance"){
    return res.json({
      job_number:liveOperation.length?liveOperation[0].job_number:"",
      operation_number:liveOperation.length?liveOperation[0].operation_number:"",
      fridge_type:fridgeType?fridgeType.name:"",
      fridge_sn:cabinetDb.sn,
      fridge_sn2:cabinetDb.sn2,
      branding:liveOperation.length?liveOperation[0].brand:"",
      location:cabinetDb.location,
      location_id:cabinetDb.location_id,
      corrective_date:liveOperation.length?liveOperation[0].createdAt:"",
      arrival_date:inspectionsList.length?inspectionsList[0].createdAt:"",
      inspectionsList:{
        cleanliness:inspectionsList.length?inspectionsList[0].cleanliness:"",
        temperature:inspectionsList.length?inspectionsList[0].temperature:"",
        stateOfGoods:inspectionsList.length?inspectionsList[0].stateOfGoods:"",
        branding:inspectionsList.length?inspectionsList[0].branding:"",
        inspections:inspectionsList.length?inspectionsList[0].inspections:""
      },
      preventiveList:fridgeType?fridgeType.preventive:"",
      operationActions:operationActions,
      operationSparePart:operationSparePart
    });
  }else{
    return res.json({
      job_number:liveOperation.length?liveOperation[0].job_number:"",
      operation_number:liveOperation.length?liveOperation[0].operation_number:"",
      fridge_type:fridgeType?fridgeType.name:"",
      fridge_sn:cabinetDb.sn,
      fridge_sn2:cabinetDb.sn2,
      branding:liveOperation.length?liveOperation[0].brand:"",
      location:cabinetDb.location,
      location_id:cabinetDb.location_id,
      corrective_date:liveOperation.length?liveOperation[0].createdAt:"",
      arrival_date:inspectionsList.length?inspectionsList[0].createdAt:"",
      inspectionsList:{
        cleanliness:inspectionsList.length?inspectionsList[0].cleanliness:"",
        temperature:inspectionsList.length?inspectionsList[0].temperature:"",
        stateOfGoods:inspectionsList.length?inspectionsList[0].stateOfGoods:"",
        branding:inspectionsList.length?inspectionsList[0].branding:"",
        inspections:inspectionsList.length?inspectionsList[0].inspections:""
      },
      operationActions:operationActions,
      operationSparePart:operationSparePart
    });
  }
}