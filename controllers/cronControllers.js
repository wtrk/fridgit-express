const Cabinet = require('../models/cabinets')
const Warehouses = require('../models/warehouses')
const PriceRule = require('../models/priceRules')
const Financial = require('../models/financials')
const moment = require('moment');

exports.cron = async (req,res) => {
    let sn = await Cabinet.find()
    let warehouse = await Warehouses.find()
    let financialArray = [];
/////////////////////////START INSERT STORAGE every 24 hous/////////////////////////////
    const cabinetsInWarehouse=sn.filter(e=>e.location==="warehouse")
    const detailsForPriceRules=cabinetsInWarehouse.length?cabinetsInWarehouse.map(e=>{
        const warehouseDetails=warehouse.find(eSub=>eSub._id==e.location_id)
        return {
            sn:e._id,
            client_id:e.client,
            tier_id:warehouseDetails?warehouseDetails.tier_id:null,
            city_id:warehouseDetails?warehouseDetails.location.city_id:null,
            neighbourhood_id:warehouseDetails?warehouseDetails.location.neighbourhood_id:null,
            mobile:warehouseDetails?warehouseDetails.location.mobile:null,
            shop_name:warehouseDetails?warehouseDetails.name:null,
        }
        
    }):[];
    var bar = new Promise((resolve, reject) => {
    detailsForPriceRules.forEach( async (e, i, array)=>{
        let priceRule = await PriceRule.findOne({
            $and: [
                {$or : [{citiesIn:{ $eq: []}}, {citiesIn: {$elemMatch: { _id: e.city_id } }}]},
                {$or : [{tiersIn:{ $eq: []}}, {tiersIn: {$elemMatch: { _id: e.tier_id } }}]},
                {$or : [{neighbourhoodsIn:{ $eq: []}}, {neighbourhoodsIn: {$elemMatch: { _id: e.neighbourhood_id } }}]},
                {$or : [{clients:{ $eq: []}}, {clients: {$elemMatch: { _id: e.client_id } }}]}
            ]
        }).sort({priority: 1})

        financialArray.push({
            location: {
                "city_id": e.city_id,
                "neighbourhood_id": e.neighbourhood_id,
                "shop_name": e.shop_name,
                "mobile": e.mobile
            },
            sn: e.sn,
            storage: priceRule.storage,
        })
        if (i === array.length -1) resolve();
    })
    })
    bar.then(() => {
        Financial.insertMany(financialArray, function(err, dbData) {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
          })
    });


/////////////////////////START UPDATE CABINETS prev_status to due every 24 hous/////////////////////////////
    let ids=sn.map(e=>{
        if(moment(e.last_prev_date).unix()-moment().unix()<0){
            return e._id
        }
        return
    }).filter(e=>e)
    await Cabinet.where({"_id" : { $in : ids}}).update({$set: {prev_status: 'Due'}});

    return res.json("Cron function success");
}