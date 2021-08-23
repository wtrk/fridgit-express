const Cabinet = require('../models/cabinets')
const moment = require('moment');

exports.cron = async (req,res) => {
    let sn = await Cabinet.find()
    let ids=sn.map(e=>{
        if(moment(e.last_prev_date).unix()-moment().unix()<0){
            return e._id
        }
        return
    }).filter(e=>e)

    await Cabinet.where({"_id" : { $in : ids}}).update({$set: {prev_status: 'Due'}});

    return res.json("Cron function success");
}