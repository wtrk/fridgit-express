const Financial = require('../models/financials')

exports.financialAdd = async (req,res) => {
  let newFinancial = await Financial.insertMany(req.body, function(err, financials) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}
exports.financialsList = async (req,res) => {
  let financials = await Financial.find({}, null, {sort: { 'priority' : 1,'updatedAt' : -1 }}, function(err, financials) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      if(financials.length===0) {
          return res.status(400).json({error: 'No price rules in the database'})
      }
      return res.json(financials);
    
  });
}
exports.financialDetails = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let financial = await Financial.findById(req.param('id'), function(err, financial) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (financial===null) {
      return res.status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(financial);
  });
}
exports.financialDetailsByJobNumber = async (req,res) => {
  const jobNumber=req.param('jobNumber')
  let financial = await Financial.find({job_number:jobNumber}, function(err, financial) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (financial===null) {
      return res.status(400)
        .json({ error: "Financial not available in the database" });
    }
    return res.json(financial);
  });
}
exports.financialDetailsByOperationNumber = async (req,res) => {
  const operationNumber=req.param('operationNumber')
  let financial = await Financial.find({operation_number:operationNumber}, function(err, financial) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (financial===null) {
      return res.status(400)
        .json({ error: "Financial not available in the database" });
    }
    return res.json(financial);
  });
}
exports.financialDetailsBySn = async (req,res) => {
  const sn=req.param('sn')
  let financial = await Financial.find({sn:sn}, function(err, financial) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (financial===null) {
      return res.status(400)
        .json({ error: "Financial not available in the database" });
    }
    return res.json(financial);
  });
}
exports.financialUpdate = async (req,res) => {
  let financial = await Financial.findByIdAndUpdate(req.param('id'), req.body[0], function(err, financial) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (financial===null) {
      return res
        .status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(financial);
  });
}
exports.financialUpdateByOperationNumber = async (req,res) => {
  const operationNumber=req.param('operationNumber')
  let financial = await Financial.findOneAndUpdate({operation_number:operationNumber}, req.body[0], function(err, financial) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (financial===null) {
      return res
        .status(400)
        .json({ error: "Price rule not available in the database" });
    }
    return res.json(financial);
  });
}
exports.financialDelete = async (req,res) => {
  let financial = await Financial.deleteMany(
    {},//{_id: {$in: req.params.ids.split(",")}},
    function(err, financial) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (financial.n === 0) {
          return res
            .status(400)
            .json({ error: "Price rules not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}

