const Cabinet = require('../models/cabinets')
const City = require('../models/cities')
const Neighbourhood = require('../models/neighbourhoods')
const FridgesType = require('../models/fridgesTypes')
const Client = require('../models/clients')
const Warehouse = require('../models/warehouses')
const Store = require('../models/stores')


exports.cabinetAdd = async (req,res) => {
  let sn = await Cabinet.find({}, 'sn')
  sn=sn.map(e=>e.sn)
  let notValidData=[]
  let validData=[]
  req.body.forEach(e => {
    if(sn.includes(JSON.stringify(e.sn))){
      notValidData.push(e)
    }else{
      validData.push(e)
    }
  });
  let newCabinet = await Cabinet.insertMany(validData, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({message:"Successfully added",validData,notValidData});
  })
}


exports.cabinetsListToExport = async (req,res) => {
  let types = await FridgesType.find({}, 'name', (err, data) => data);
  let clients = await Client.find({}, 'name', (err, data) => data);
  let warehouses = await Warehouse.find({}, (err, data) => data);
  let stores = await Store.find({}, (err, data) => data);
  let neighbourhoods = await Neighbourhood.find({}, 'name', (err, data) => data);
  let cities = await City.find({}, 'name', (err, data) => data);

  const count= await Cabinet.estimatedDocumentCount({}, (err, count) => count);

  let cabinet = await Cabinet.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    
    return res.json({count,data: data.map(e=>{
      let city_id=""
      let neighbourhood_id=""
      let mobile=""
      if(e.location=="warehouse"){
        city_id=warehouses.filter(eSub=>eSub._id==e.location_id).length?warehouses.filter(eSub=>eSub._id==e.location_id)[0].location.city_id:""
        neighbourhood_id=warehouses.filter(eSub=>eSub._id==e.location_id).length?warehouses.filter(eSub=>eSub._id==e.location_id)[0].location.neighbourhood_id:""
        mobile=warehouses.filter(eSub=>eSub._id==e.location_id).length?warehouses.filter(eSub=>eSub._id==e.location_id)[0].location.mobile:""
      }else if(e.location=="stores"){
        city_id=stores.filter(eSub=>eSub._id==e.location_id).length?stores.filter(eSub=>eSub._id==e.location_id)[0].location.city_id:""
        neighbourhood_id=stores.filter(eSub=>eSub._id==e.location_id).length?stores.filter(eSub=>eSub._id==e.location_id)[0].location.neighbourhood_id:""
        mobile=stores.filter(eSub=>eSub._id==e.location_id).length?stores.filter(eSub=>eSub._id==e.location_id)[0].location.mobile:""
      }
      return ({
        sn:e.sn,
        sn2:e.sn2,
        type:types.filter(eSub=>eSub._id==e.type).length?types.filter(eSub=>eSub._id==e.type)[0].name:"",
        client:clients.filter(eSub=>eSub._id==e.client).length?clients.filter(eSub=>eSub._id==e.client)[0].name:"",
        mobile:mobile,
        city:cities.filter(eSub=>eSub._id==city_id).length?cities.filter(eSub=>eSub._id==city_id)[0].name:"",
        neighbourhood:neighbourhoods.filter(eSub=>eSub._id==neighbourhood_id).length?neighbourhoods.filter(eSub=>eSub._id==neighbourhood_id)[0].name:"",
        brand:e.brand,
        status:e.status,
        prev_status:e.prev_status,
        is_new:e.is_new,
        booked:e.booked
      })
    }
    )})
  });
  
}
exports.cabinetsList = async (req,res) => {
  let conditionsSubmitted={}
  if(req.query.searchEntry){
    conditionsSubmitted = req.query.searchEntry? {sn:req.query.searchEntry.split(",")}:{};
  }else{
    if(req.query.clientId) conditionsSubmitted.client=req.query.clientId
    if(req.query.fridgeTypeId) conditionsSubmitted.type=req.query.fridgeTypeId
    if(req.query.prevStatus) conditionsSubmitted.prev_status=req.query.prevStatus
    if(req.query.status) conditionsSubmitted.status=req.query.status
  
    if(req.query.fromDate || req.query.toDate){
      let datesConditions={}
      if(req.query.fromDate) datesConditions.$gte=new Date(req.query.fromDate)
      if(req.query.toDate) datesConditions.$lt=new Date(req.query.toDate)
      conditionsSubmitted.createdAt=datesConditions
    }
    
    if(req.query.operationType){
      if(req.query.operationType === "Retrieval"){
        conditionsSubmitted.location="store"
      }else if(req.query.operationType === "External Receipt"){
        conditionsSubmitted.location="NA"
      }else if(req.query.operationType === "Deployment"){
        conditionsSubmitted.location="warehouse"
      }else if(req.query.operationType === "Corrective Maintenance" || req.query.operationType === "Preventive Maintenance"){
        conditionsSubmitted.location={$ne:"NA"}
      }else if(req.query.operationType === "Testing"){
        conditionsSubmitted.status="Needs test"
        conditionsSubmitted.location={$ne:"NA"}
      }
    }
  }
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    const count= await Cabinet.estimatedDocumentCount(conditionsSubmitted, (err, count) => count);

  let cabinet = await Cabinet.find(conditionsSubmitted, null, {sort: { 'updatedAt' : -1 }, skip, limit}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({count,data});
  });
  
}

exports.cabinetsListFilter = async (req,res) => {
  console.log(req.param('op'))
  let conditionsSubmitted={}
  if(req.param('clientId')!=0) conditionsSubmitted.client=req.param('clientId')
  if(req.param('fridgeTypeId')!=0) conditionsSubmitted.type=req.param('fridgeTypeId')
  if(req.param('prevStatus')!=0) conditionsSubmitted.prev_status=req.param('prevStatus')
  if(req.param('status')!=0) conditionsSubmitted.status=req.param('status')

  if(req.param('fromDate')!=0 || req.param('toDate')!=0){
    let datesConditions={}
    if(req.param('fromDate')!=0) datesConditions.$gte=new Date(req.param('fromDate'))
    if(req.param('toDate')!=0) datesConditions.$lt=new Date(req.param('toDate'))
    conditionsSubmitted.createdAt=datesConditions
  }
  
  if(req.param('op')){
    if(req.param('op') === "Retrieval"){
      conditionsSubmitted.location="store"
    }else if(req.param('op') === "External Receipt"){
      conditionsSubmitted.location="NA"
    }else if(req.param('op') === "Deployment"){
      conditionsSubmitted.location="warehouse"
    }else if(req.param('op') === "Corrective Maintenance" || req.param('op') === "Preventive Maintenance"){
      conditionsSubmitted.location!="NA"
    }else if(req.param('op') === "Testing"){
      conditionsSubmitted.status="Needs test"
      conditionsSubmitted.location !="NA"
    }
  }
  let cabinet = await Cabinet.find(conditionsSubmitted, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res.status(400)
        .json({ error: "Cabinet not available in the database"});
    }
    return res.json(dbData);
  });
}

exports.cabinetDetails = async (req,res) => {
  let cabinet = await Cabinet.findById(req.param('id'), function(err, cabinet) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cabinet===null) {
      return res.status(400)
        .json({ error: "Cabinet not available in the database" });
    }
    return res.json(cabinet);
  });
}

exports.cabinetDetailsBySn = async (req,res) => {
  const snId=req.param('sn')
  let cabinet = await Cabinet.find({sn:snId}, function(err, cabinet) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cabinet===null) {
      return res.status(400)
        .json({ error: "Cabinet not available in the database" });
    }
    return res.json(cabinet);
  });
}

exports.cabinetUpdateBySn = async (req,res) => {
  let cabinet = await Cabinet.findOneAndUpdate({ sn: req.param('sn')}, req.body[0], function(err, cabinet) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cabinet===null) {
      return res
        .status(400)
        .json({ error: "Cabinet not available in the database" });
    }
    return res.json(cabinet);
  });
}
exports.cabinetUpdate = async (req,res) => {
  let cabinet = await Cabinet.findByIdAndUpdate(req.param('id'), req.body[0], function(err, cabinet) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (cabinet===null) {
      return res
        .status(400)
        .json({ error: "Cabinet not available in the database" });
    }
    return res.json(cabinet);
  });
}

exports.cabinetDelete = async (req,res) => {
  let cabinet = await Cabinet.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, cabinet) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (cabinet.n === 0) {
          return res
            .status(400)
            .json({ error: "Cabinets not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}
