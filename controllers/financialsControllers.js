const Financial = require('../models/financials')
const Cabinet = require('../models/cabinets')
const LiveOperation = require('../models/liveOperations')
const City = require('../models/cities')
const Neighbourhood = require('../models/neighbourhoods')
const Client = require('../models/clients')
const moment = require('moment');

exports.financialAdd = async (req,res) => {
  let newFinancial = await Financial.insertMany(req.body, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.financialsList = async (req,res) => {
  let conditionsSubmitted={}
  let sn1=[]
  let sn2=[]
    
  if(req.query.searchEntry){
    conditionsSubmitted = req.query.searchEntry
      ? {
          $or: [
            { sn: req.query.searchEntry.split(",") },
            { operation_number: req.query.searchEntry.split(",") },
            { job_number: req.query.searchEntry.split(",") },
          ],
        }
      : {};
  }else{
    if(req.query.clientId || req.query.fridgeTypeId){
      let cabinetsConditions={}
      if(req.query.clientId) cabinetsConditions.client=req.query.clientId
      if(req.query.fridgeTypeId) cabinetsConditions.type=req.query.fridgeTypeId
      await Cabinet.find(cabinetsConditions, function(err, dbData) {
          if (dbData.length) {
            sn1=dbData.map(e=>String(e._id))
          }else{
            return []
          }
      });
    }
    
    if(req.query.fridgeTypeId || req.query.status){
      let liveOperationConditions={}
      if(req.query.fridgeTypeId) liveOperationConditions.operation_type=req.query.fridgeTypeId
      if(req.query.status) liveOperationConditions.status=req.query.status

      await LiveOperation.find(liveOperationConditions, function(err, dbData) {
        if (dbData.length) {
          sn2=dbData.map(e=>String(e._id))
        }else{
          return []
        }
      });
    }
    if(sn1.length && sn2.length){
      conditionsSubmitted.sn=sn1.filter(e => sn2.includes(e));
    }else if(sn1.length){
      conditionsSubmitted.sn=sn1
    }else if(sn2.length){
      conditionsSubmitted.sn=sn2
    }
    
      if(req.query.fromDate || req.query.toDate){
        let datesConditions={}
        if(req.query.fromDate) datesConditions.$gte=new Date(req.query.fromDate)
        if(req.query.toDate) datesConditions.$lt=new Date(req.query.toDate)
        conditionsSubmitted.createdAt=datesConditions
      }

  }
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
// return console.log("conditionsSubmitted",conditionsSubmitted)
    const count= await Financial.estimatedDocumentCount(conditionsSubmitted, (err, count) => count);

      
  let financial = await Financial.find(conditionsSubmitted, null, {sort: { 'updatedAt' : -1 }, skip, limit}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({count,data});
  });
}


exports.financialsListForInvoice = async (req,res) => {
  let conditionsSubmitted={}
  let companyId=""

    if(req.query.clientId){
      await Cabinet.find({client:req.query.clientId}, '_id', function(err, dbData) {
          if (dbData.length) {
            conditionsSubmitted.sn = { "$in" : dbData.map(e=>String(e._id))}
          }else{
            conditionsSubmitted.sn = 0
          }
      });
      await Client.findById(req.query.clientId, function(err, client) {
        if (client===null) {
          companyId=0
        }else{
          companyId=client.company_id
        }
      })
    }
    
    if(req.query.fromDate || req.query.toDate){
      let datesConditions={}
      if(req.query.fromDate) datesConditions.$gte=new Date(req.query.fromDate)
      if(req.query.toDate) datesConditions.$lt=new Date(req.query.toDate)
      conditionsSubmitted.createdAt=datesConditions
    }
    conditionsSubmitted.invoice_id = { "$in": [ null, "" ] }
    conditionsSubmitted.user_id = req.query.userId
    
    const count= await Financial.estimatedDocumentCount(conditionsSubmitted, (err, count) => count);

      
  let financial = await Financial.find(conditionsSubmitted, null, {sort: { 'updatedAt' : -1 }}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({count,companyId,data});
  });
}



exports.financialsListToExport = async (req,res) => {
  let sns = await Cabinet.find({}, 'sn', (err, data) => data);
  let cities = await City.find({}, 'name', (err, data) => data);
  let neighbourhoods = await Neighbourhood.find({}, 'name', (err, data) => data);

  const count= await Financial.estimatedDocumentCount({}, (err, count) => count);

  let financial = await Financial.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    
    return res.json({count,data: data.map(e=>{
      return ({
        job_number:e.job_number,
        operation_number:e.operation_number,
        sn:sns.filter(eSub=>eSub._id==e.sn).length?sns.filter(eSub=>eSub._id==e.sn)[0].sn:"",
        city:cities.filter(eSub=>eSub._id==e.location.city_id).length?cities.filter(eSub=>eSub._id==e.location.city_id)[0].name:"",
        neighbourhood:neighbourhoods.filter(eSub=>eSub._id==e.location.neighbourhood_id).length?neighbourhoods.filter(eSub=>eSub._id==e.location.neighbourhood_id)[0].name:"",
        shop_name:e.location.shop_name,
        mobile:e.location.mobile,
        handling_in:e.handling_in,
        storage:e.storage,
        in_house_preventive_maintenance:e.in_house_preventive_maintenance,
        corrective_service_in_house:e.corrective_service_in_house,
        cabinet_testing_fees:e.cabinet_testing_fees,
        branding_fees:e.branding_fees,
        drop:e.drop,
        transportation_fees:e.transportation_fees,
        preventive_maintenance:e.preventive_maintenance,
        exchange_corrective_reaction:e.exchange_corrective_reaction,
        corrective_reaction:e.corrective_reaction,
        total:e.total,
      })
    }
    )})
  });
  
}


exports.financialDetails = async (req,res) => {
  let financial = await Financial.findById(req.params.id, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res.status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(dbData);
  });
}
exports.financialUpdate = async (req,res) => {
  let financial = await Financial.findByIdAndUpdate(req.params.id, req.body[0], function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res
        .status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(dbData);
  });
}
exports.financialUpdateByOperationNumber = async (req,res) => {
  const operationNumber=req.param('operationNumber')
  let financial = await Financial.findOneAndUpdate({operation_number:operationNumber}, req.body[0], function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res
        .status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(dbData);
  });
}
exports.financialDelete = async (req,res) => {
  let financial = await Financial.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, dbData) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (dbData.n === 0) {
          return res
            .status(400)
            .json({ error: "Price rules not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}


exports.financialDetailsByJobNumber = async (req,res) => {
  const jobNumber=req.param('jobNumber')
  let financial = await Financial.find({job_number:jobNumber}, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res.status(400)
        .json({ error: "Financial not available in the database" });
    }
    return res.json(dbData);
  });
}
exports.financialDetailsByOperationNumber = async (req,res) => {
  const operationNumber=req.param('operationNumber')
  let financial = await Financial.find({operation_number:operationNumber}, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res.status(400)
        .json({ error: "Financial not available in the database" });
    }
    return res.json(dbData);
  });
}
exports.financialDetailsBySn = async (req,res) => {
  const sn=req.param('sn')
  let financial = await Financial.find({sn:sn}, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (dbData===null) {
      return res.status(400)
        .json({ error: "Financial not available in the database" });
    }
    return res.json(dbData);
  });
}
exports.financialsListDaily = async (req,res) => {
  let financials = await Financial.find({}, null, {sort: { 'createdAt' : 1}}, function(err, dbData) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(dbData.length===0) {
          return res.json({error: 'No price rules in the database'})
      }
      let resData = []
      for (let i = 0; i < dbData.length; i++) {
        const dateFormated=moment(dbData[i].createdAt).format("MM-DD-YYYY")
        if(resData.length && resData.filter(e => moment(e[0].createdAt).format("MM-DD-YYYY") === dateFormated).length){
          const index = resData.findIndex(e => moment(e[0].createdAt).format("MM-DD-YYYY") === dateFormated)
          resData[index].push(dbData[i])
        }else{
          resData.push([dbData[i]])
        }
      }
      console.log("resData",resData)
      
      let calculatedData = resData.map(e=>{
        return e.reduce((a,b)=>({
          handling_in: a.handling_in + b.handling_in,
          storage: a.storage + b.storage,
          in_house_preventive_maintenance: a.in_house_preventive_maintenance + b.in_house_preventive_maintenance,
          corrective_service_in_house: a.corrective_service_in_house + b.corrective_service_in_house,
          cabinet_testing_fees: a.cabinet_testing_fees + b.cabinet_testing_fees,
          branding_fees: a.branding_fees + b.branding_fees,
          transportation_fees: a.transportation_fees + b.transportation_fees,
          drop: a.drop + b.drop,
          preventive_maintenance: a.preventive_maintenance + b.preventive_maintenance,
          exchange_corrective_reaction: a.exchange_corrective_reaction + b.exchange_corrective_reaction,
          corrective_reaction: a.corrective_reaction + b.corrective_reaction,
          total: Math.trunc(a.total + b.total),
          createdAt:a.createdAt
        }))
      })

      calculatedData.push(calculatedData.reduce((a,b)=>({
        handling_in: a.handling_in + b.handling_in,
        storage: a.storage + b.storage,
        in_house_preventive_maintenance: a.in_house_preventive_maintenance + b.in_house_preventive_maintenance,
        corrective_service_in_house: a.corrective_service_in_house + b.corrective_service_in_house,
        cabinet_testing_fees: a.cabinet_testing_fees + b.cabinet_testing_fees,
        branding_fees: a.branding_fees + b.branding_fees,
        transportation_fees: a.transportation_fees + b.transportation_fees,
        drop: a.drop + b.drop,
        preventive_maintenance: a.preventive_maintenance + b.preventive_maintenance,
        exchange_corrective_reaction: a.exchange_corrective_reaction + b.exchange_corrective_reaction,
        corrective_reaction: a.corrective_reaction + b.corrective_reaction,
        total: a.total + b.total,
        createdAt:"Total"
      })))

      return res.json(calculatedData);
    
  });
}