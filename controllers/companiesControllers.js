const Company = require('../models/companies')

exports.companyAdd = async (req,res) => {
  let newCompany = await Company.insertMany(req.body, function(err, companies) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json("Successfully added");
  })
}

exports.companiesList = async (req,res) => {
  let companies = await Company.find({}, null, {sort: { 'updatedAt' : -1 }}, function(err, companies) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
      return res.json(companies);
    
  });
}

exports.companyDetails = async (req,res) => {
  let company = await Company.findById(req.params.id, function(err, company) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (company===null) {
      return res.status(400)
        .json({ error: "Company not available in the database" });
    }
    return res.json(company);
  });
}

exports.companyUpdate = async (req,res) => {
  let company = await Company.findByIdAndUpdate(req.params.id, req.body[0], function(err, company) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (company===null) {
      return res
        .status(400)
        .json({ error: "Company not available in the database" });
    }
    return res.json(company);
  });
  
}
exports.companyDelete = async (req,res) => {
  let company = await Company.deleteMany(
    {_id: {$in: req.params.ids.split(",")}},
    function(err, company) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (company.n === 0) {
          return res
            .status(400)
            .json({ error: "Companies not available in the database" });
        }
        return res.json({message:"Successfully deleted"})
      })
}

exports.companyUpdateImg = async (req,res) => {
  if (req.files !== null) {
    const file = req.files.file;
  
    file.mv(`../frontend/public/img/companies/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      let companies = Company.findByIdAndUpdate(req.params.id, {"logo":file.name}, function(err, companies) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        if (companies===null) {
          return res
            .status(400)
            .json({ error: "Company not available in the database" });
        }
        return res.json({"message":"Success"});
      });
    });
  }
  
}