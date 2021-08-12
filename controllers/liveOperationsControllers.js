const LiveOperation = require('../models/liveOperations')
const Cabinet = require('../models/cabinets')
const Client = require('../models/clients')
const OperationAction = require('../models/operationActions')
const OperationInspection = require('../models/operationInspections')
const FridgesType = require('../models/fridgesTypes')
const OperationSparePart = require('../models/operationSpareParts')
const Supplier = require('../models/suppliers')
const City = require('../models/cities')
const Neighbourhood = require('../models/neighbourhoods')

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
  let conditionsSubmitted={}
  let cabinetIdDb=""
  if(req.query.searchEntry){
    await Cabinet.find({sn:req.query.searchEntry.split(",")}, function(err, dbData) {
        if (dbData.length) {
          cabinetIdDb=dbData.map(e=>String(e._id))
        }
    });
    
    conditionsSubmitted = req.query.searchEntry
      ? {
          $or: [
            { sn: cabinetIdDb },
            { operation_number: req.query.searchEntry.split(",") },
            { job_number: req.query.searchEntry.split(",") },
          ],
        }
      : {};
  }else{
  
    if(req.query.fridgeTypeId){
      let cabinetsConditions={}
      cabinetsConditions.type=req.query.fridgeTypeId
      await Cabinet.find(cabinetsConditions, function(err, dbData) {
          if (dbData.length) {
            conditionsSubmitted.sn=dbData.map(e=>String(e._id))
          }
      });
    }

    if(req.query.clientId) conditionsSubmitted.client_id=req.query.clientId
    if(req.query.operationType) conditionsSubmitted.operation_type=req.query.operationType
    if(req.query.status) conditionsSubmitted.status=req.query.status
  
    if(req.query.fromDate || req.query.toDate){
      let datesConditions={}
      if(req.query.fromDate) datesConditions.$gte=new Date(req.query.fromDate)
      if(req.query.toDate) datesConditions.$lt=new Date(req.query.toDate)
      conditionsSubmitted.createdAt=datesConditions
    }

    if(req.query.exceededPreventive=='true'){
      conditionsSubmitted.promise_date={$gte:new Date()}
    }
  }
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    const count= await LiveOperation.estimatedDocumentCount(conditionsSubmitted, (err, count) => count);

  let liveOperation = await LiveOperation.find(conditionsSubmitted, null, {sort: { 'updatedAt' : -1 }, skip, limit}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({count,data});
  });
}


exports.liveOperationsListToExport = async (req,res) => {
  let sns = await Cabinet.find({}, 'sn', (err, data) => data);
  let clients = await Client.find({}, 'name', (err, data) => data);
  let suppliers = await Supplier.find({}, 'name', (err, data) => data);
  let cities = await City.find({}, 'name', (err, data) => data);
  let neighbourhoods = await Neighbourhood.find({}, 'name', (err, data) => data);
  const count= await LiveOperation.estimatedDocumentCount({}, (err, count) => count);

  let liveOperation = await LiveOperation.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    
    return res.json({count,data: data.map(e=>{
      return ({
        job_number:e.job_number,
        operation_number:e.operation_number,
        operation_type:e.operation_type,
        brand:e.brand,
        city:cities.filter(eSub=>eSub._id==e.execution_address.city_id).length?cities.filter(eSub=>eSub._id==e.execution_address.city_id)[0].name:"",
        neighbourhood:neighbourhoods.filter(eSub=>eSub._id==e.execution_address.neighbourhood_id).length?neighbourhoods.filter(eSub=>eSub._id==e.execution_address.neighbourhood_id)[0].name:"",

        shop_name:e.execution_address.shop_name,
        mobile:e.execution_address.mobile,
        status:e.status,
        allocation_rule:e.allocation_rule.name,
        price_rule:e.price_rule.name,
        last_status_user:e.last_status_user,
        last_status_update:e.last_status_update,
        supplier:suppliers.filter(eSub=>eSub._id==e.supplier_id).length?suppliers.filter(eSub=>eSub._id==e.supplier_id)[0].name:"",
        sn:sns.filter(eSub=>eSub._id==e.sn).length?sns.filter(eSub=>eSub._id==e.sn)[0].sn:"",
        client:clients.filter(eSub=>eSub._id==e.client_id).length?clients.filter(eSub=>eSub._id==e.client_id)[0].name:"",
      })
    }
    )})
  });
  
}


//liveOperationsTabsCount
exports.liveOperationsTabsCount = async (req,res) => {
  const total= await LiveOperation.estimatedDocumentCount((err, count) => count);
  let liveOperation = await LiveOperation.find({},'status', function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    var result = data.reduce( (acc, o) => (acc[o.status] = (acc[o.status] || 0) + 1, acc), {} );

    return res.json({total,data:result});
  });
}

exports.liveOperationDetails = async (req,res) => {
  let liveOperation = await LiveOperation.findById(req.params.id, function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (liveOperation===null) {
      return res.json({ error: "Live Operation not available in the database" });
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
exports.liveOperationDetailsByOperationNumber = async (req,res) => {
  let liveOperation = await LiveOperation.find({ operation_number: req.param('operationNumber')}, function(err, liveOperation) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(liveOperation);
  });
}

exports.liveOperationUpdate = async (req,res) => {
  let liveOperation = await LiveOperation.findByIdAndUpdate(req.params.id, req.body[0], function(err, liveOperation) {
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
      preventiveList:cabinetDb.preventive,
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